const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const socket = require('socket.io')
const http = require('http')
const port = process.env.PORT || 8080

// User Controller
const user = require('./controllers/user')
// Msg Controller
const msg = require('./controllers/msg')
// DB
const Routes = require("./routes")
const db = require("./models/index")
const formResult = require('./helpers/formResult')
const app = express()

// Socket.io
const httpServer = http.createServer(app)
const io = socket(httpServer,{
    cors:{ origin: '*'}
})

io.on('connect', (socket)=>{
    console.log('Client terhubung dengan id: '+socket.id);
    socket.on('initialUser', async (data)=>{
      data.socketId= socket.id
        const status = user.userInitAndStatus(data)
        await status.then((result)=>{
          if(result !== undefined){
            // socket.join(`${sock.id}`)
            socket.emit('online', `online with ${socket.id}`)
          }
        })
    })
    socket.on('personalChat', async(data)=>{
      delete data.mysSocket
      const message = msg.creatMsg(data)
      message.then((res)=>{return res})
      const dest = user.findStatus(data)
      await dest.then((res)=>{ 
        const found = res.dataValues
        delete found.password
        data.socketId = found.socketId
        io.to(`${found.socketId}`).emit('listen',data)
        // io.emit('listen', data)
      })
    })
    socket.on('Disconnect',async data =>{
      data.socketId= null
      const status = user.userInitAndStatus(data)
      await status.then((result)=>{
        if(result !== undefined){
          console.log('user terputus', data);
        }
      })
    })
})




app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/avatar", express.static('./uploads'));
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())


db.sequelize.sync().then(
    () => console.log(`[DATABASES] Connected`),
    (err) => console.log(`[DATABASES] Failed To Connect (${err})`)
  );


  app.use("/v1", Routes);


app.use("*", (req, res) => {
    if (req.params["0"].match("/v1")) {
      res.status(405).json({
        status: false,
        message: "Welcome ^_^, your methode not allowed..",
        data: null,
      });
    }
  });


httpServer.listen(port, ()=>{
  console.log('server is running on port ' + port);
})