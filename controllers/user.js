const db = require('../models')
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt')
const formResult = require('../helpers/formResult');
const paginate = require('../helpers/pagination.js')
const jwt = require('jsonwebtoken')
const sendMail = require('../middleware/mailer');
const { getTokenVerify, decodeToken, getToken, decodeByHeader } = require('../helpers/jwthelper');
const { Op } = require("sequelize");

const User = db.user

exports.register = async (req, res) => {
    if (req.body.email) {
        User.findOne({ where: { email: req.body.email } }).then(async (found) => {
            if (found) {
                return formResult(res, 401, false, " Email Sudah ada!", null)
            } else {
                req.body.userId = uuidv4();
                req.body.password = await bcrypt.hash(req.body.password, 10).then((result) => {
                    req.body.password = result; return req.body.password
                })
                    .then(() => {
                        const token = getTokenVerify(req.body)
                        console.log('masuk email', req.body.email);
                        sendMail(req.body.email, token)
                        console.log('email terkirim');
                        formResult(res, 201, true, "Success Register, Please Verify Your Email!", null);
                    })
                    .catch((err) => {
                        console.log(err);
                        formResult(res, 401, true, err, null);
                    })
            }
        }).catch((err) => { formResult(res, 401, false, err, null) })
    } else {
        console.log('gagal');
        return formResult(res, 401, false, " Email Sudah ada!", null)
    }
}

exports.getProfil = (req, res) => {
    const auth = req.headers.authorization
    const token = auth.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        const userId = decoded.userId
        User.findOne({ where: { userId }, order: ["userId"] })
            .then((result) => {
                formResult(res, 200, true, "Success Get Profile", result);
            })
            .catch(() => {
                formResult(res, 401, false, 'Data not found', null)
            })
    })
}

exports.verify = (req, res) => {
    const decode = decodeToken(req.params)
    const email = decode.email
    User.findOne({ where: { email }, order: ["email"] })
    .then((found)=>{
        if(found.email !== undefined){
            formResult(res, 401, false, 'Token Expired!', null)
            return;
        }
        if(decode == 'TokenExpiredError: jwt expired'){
            formResult(res, 401, false, 'Token Expired!', null)
            console.log('masuk expired');
            return;
        }
    }
    ).catch(async()=>{
        console.log('masuk creat!');
        User.create(decode)
            .then((result) => {
                formResult(res, 201, true, 'success', result)
            })
            .catch((err) => {
                formResult(res, 401, false, 'Token Expired!', err)
            })
    })
}

exports.login = async (req, res) => {
    const email = req.body.email;
    const checkEmail = await User.findOne({ where: { email }, order: ["email"] })
        .then((result) => result.dataValues)
        .catch((err) => {return formResult(res, 401, false, 'Your Email not register!',err )})
    if (checkEmail) {
        const password = bcrypt.compareSync(req.body.password, checkEmail.password)
        if (password) {
            delete checkEmail.password;
            const token = getToken(checkEmail)
            formResult(res, 201, true, 'Login Success!', { checkEmail, token })
        } else {
            formResult(res, 401, "Password wrong!", null)
        }
    } else {
        formResult(res, false, 401, 'Email not registered!', null)
    }
}
// exports.forgot = async(req, res)=>{
//     try {
//         const {email} = req.body
//         const process = await findOne({where: {email: email}})
//         console.log('berhasil melewati await');
//         console.log(process);
//         if(process.length == 0){
//           return formResult(res, false, 401, 'Email not registered!', null)
//         }
//         console.log('menuju pembuatan jwt token');
//         const user = process[0]
//         jwt.sign({id: user.userid, email: user.email}, privateKey, { expiresIn: '1h' }, function (err, token) {
//           console.log('berhasil membuat token');
//           user.token = sendForgotMail(token, user.userid, email)
//           console.log('berhasil mengirim Email');
//           formResult(res, false, 201, 'sent forgot!', null)
//         })
//         return formResult(res, false, 401, 'Email not registered!', null)
//       } catch (err) {
//         return formResult(res, false, 501, 'error', err)
//       }
// }

exports.getAll = async (req, res) => {
    const decode = decodeByHeader(req)
    const userId = decode.userId
    if (req.query.search !== undefined) {
        let { search } = req.query
        User.findAll({ where: { userName: { [Op.like]: `%${search}%` } } })
            .then((result) => { return formResult(res, 200, true, 'success', result) })
            .catch((err) => { return formResult(res, 401, false, err, null) })
    } else {
        const { page, perPage } = req.query
        const { limit, offset } = paginate(page, perPage);
        User.findAndCountAll({
            where: { [Op.not]: { userId } },
            limit: limit,
            offset: offset
        })
            .then((result) => {
                formResult(res, 200, true, 'getAll!', result)
            })
            .catch((err) => {
                formResult(res, 401, 'failed get all', err)
            })
    }
}

exports.getById = (req, res) => {
    const userId = req.params.id
    User.findOne({ where: { userId: userId } })
        .then((result) => {
            formResult(res, 201, true, 'Get by id Success', result)
        })
        .catch((err) => {
            formResult(res, 501, false, err, null)
        })
}


exports.avatar = (req, res) => {
    console.log(req.file);
    const avatar = `${process.env.HOST}/avatar/${req.file.filename}`
    User.update({ avatar: avatar }, { where: { userId: req.params.id } })
        .then((result) => {
            return formResult(res, 201, true, "Success Update", result)
        })
        .catch((err) => {
            return formResult(res, 501, false, err, null)
        })
}

exports.profile = (req, res) => {
    const userId = req.params.id
    User.update(req.body, { where: { userId }, order: ["userId"] })
        .then((result) => {
            return formResult(res, 201, true, "success", result)
        })
        .catch((err) => {
            return formResult(res, 401, false, " failed", err)
        })
}

exports.delete = (req, res) => {
    const userId = req.params.id
    User.update({ where: { userId: userId } })
        .then((found) => {

        })
        .catch((err) => {
            console.log(err);
        })
}



exports.change = (req, res) => {
    User.findOne({ where: { userId: req.params.id } })
        .then(async (found) => {
            if (req.body.for === "password") {
                console.log(req.body.current);
                console.log(found.password);
                const password = bcrypt.compareSync(req.body.current, found.password)
                if (!password) {
                    return formResult(res, 401, false, "Your current password is incorrect!", null)
                } else {
                    req.body.new = await bcrypt.hash(req.body.new, 10).then((result) => {
                        req.body.new = result; return req.body.new
                    })
                    User.update({ password: req.body.new }, { where: { userId: req.params.id } })
                        .then(() => {
                            return formResult(res, 201, true, " Success change password!", null)
                        })
                        .catch((err) => { return formResult(res, 501, false, 'fail to change password', err) })
                }
            } else {
                return formResult(res, 401, false, "Your current password is incorrect!", null)
            }
        })
        .catch((err) => { return formResult(res, 401, false, 'User not found!', err) })
}
exports.changeUserName=(req, res)=>{
    if(req.body.phone !== undefined){
        User.update(req.body,{where:{userId: req.params.id}})
    .then((result)=>{
        formResult(res, 200, true, 'success!', result)
    })
    .catch((err)=>{
        formResult(res, 401, false,err, null)
    })
    }else{
        User.update(req.body,{where:{userId: req.params.id}})
        .then((result)=>{
            formResult(res, 200, true, 'success!', result)
        })
        .catch((err)=>{
            formResult(res, 401, false,err, null)
        })
    }
}

exports.userInitAndStatus= (req)=>{
    console.log('masuk controller');
    const { socketId, status, userId} = req
    console.log(socketId);
   return User.update({socketId: socketId, status: status}, {where: {userId}})
    
}
exports.findStatus= async(req)=>{
    const{ destId } = req
   return User.findOne({where: {userId: destId}})
}