const db = require('../models')
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt')
const formResult = require('../helpers/formResult');
const msg = require('../models/msg');
const paginate = require('../helpers/pagination.js')
const {decodeByHeader} = require('../helpers/jwthelper')
const { Op } = require("sequelize");
const Msg = db.msg
const User =db.user


exports.getMsg= async (req, res)=>{
    const data = await decodeByHeader(req)
    console.log('query ',req.query);
    const {page, perPage, mode} = req.query
    console.log('sort', mode);
    const { limit, offset, sort} =await paginate(page, perPage, mode);
    console.log(sort);
    Msg.findAndCountAll({
        where: {
           userId: data.userId
        },
        offset: offset,
        limit: limit,
        order: [ ['createdAt',sort] ]
     })
     .then(result => {
       return formResult(res, 200, true, 'Success get data', result)
     }).catch((err)=>{ return formResult(res, 501, false, err, null)})
}

exports.creatMsg =(data)=>{
    const date = new Date()
    data.time = `${date.getHours()}.${date.getMinutes()}`
    console.log(data);
   return Msg.create(data)
   
}

exports.getMsgByDate=(req, res)=>{
    const userId = req.params.id
    console.log(userId);
    let curr = new Date();
    let first = curr.getDate() - curr.getDay();
  let last = first - 6;
  let firstday = new Date(`${curr.getFullYear()}-${curr.getMonth() + 1}-${first} 07:00:00`);
  let lastday = new Date(`${curr.getFullYear()}-${curr.getMonth() + 1}-${last} 07:00:00`);
  Msg.findAll({
    where: { 
        [Op.or]: [{ userId: userId }],
        createdAt: { [Op.between]: [lastday, curr] },
    },
})
  .then((result)=>{
      return formResult(res, 200, true, 'success', result)})
  .catch((err)=>{
        return formResult(res, 401, true, err, null)
     })
}

exports.getByDest=(req, res)=>{
    const decode = decodeByHeader(req) 
    const userId = decode.userId
    const destId = req.params.destId
    Msg.findAll({where: {
        [Op.or]: [{userId, destId}, {userId: destId, destId: userId}]}})
    .then((result)=>{
        return formResult(res, 200, true, "Success get msg!", result)
    })
    .catch((err)=>{
        return formResult(res, 200, true, err, null)
    })
}

exports.deleteByDest=(req, res)=>{
    const userId = req.params.userId
    console.log(req);
    Msg.destroy({where: {userId,}})
    .then((result)=>{
        return formResult(res, 200, true, "Success get msg!", result)
    })
    .catch((err)=>{
        return formResult(res, 200, true, err, null)
    })
}