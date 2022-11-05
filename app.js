const express = require('express');
const app = express()
const multer  = require('multer')
//const upload = multer({ dest: 'uploads/' })//destino donde se van a guardar las imagenes
const upload = multer({ storage: multer.memoryStorage() })//con esto hacemos que multer no guarde las imagenes, sino que lo almacene en una memoria temporal

const sharp = require('sharp');
const fs = require('fs')//esto es para proveer funcionalidades para interactuar con archivos, ya es propio de node.js



app.use(express.json())//con esto lo que hago es poder procesar información de tipo JSON



app.get('/', function (req, res) {
  res.send('Holi boli')
})

//de la pagina de npm multer, me dice como llamar a la imagen, solo debo seguir la sintaxis

//app.post('/profile', upload.single('avatar'), function (req, res, next) {
  //// req.file is the `avatar` file
  //// req.body will hold the text fields, if there were any
//})

//app.post('/imagen', upload.single('imagen'),function (req, res) {
app.post('/imagen', upload.single('imagen'),async function (req, res) {
  //const body = req.body
  const imagen = req.file

  //sharp(imagen.buffer)
  //.resize(300, 300)
  //.rotate(45)

  const imagenprocesada = sharp(imagen.buffer)//esta linea fue casi por las puras xq se puede trababajar defrente con el sharp
  const resizeimage = imagenprocesada.resize(100,100,{
    fit: 'contain',
    background: "#FFF"
    
  })//esto una de las funciones de sharp, en este caso es cambiar el tamaño de la imagen
  const resizeimagebuffer = await resizeimage.toBuffer()//como el pendejo renderizo la imagen esta ahora se muestra como sharp, ahora la debe pasar a tipo buffer de nuevo// el await es para esperar el resultado del cambio a buffer, pero se debe configurar como asincrono la función sobre la cual se esta ejecutando. (async function (req, res) )
  fs.writeFileSync('nuevaruta/prueba.png',resizeimagebuffer)

  console.log(resizeimagebuffer)
  //res.send('metodo post 2da edición')
  res.send({lalora: resizeimagebuffer})

})

const PORT = process.env.PORT || 3000//esta mierda es para que heroku pueda darnos un puto puerto de mierda
app.listen(PORT, function(){
  Console.log("Servidor con puerto", PORT)
})