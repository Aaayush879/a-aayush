const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Login = require('./model/Login');
const port = process.env.PORT || 5000;

const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const Image = require('./model/Image');

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://ayush:ayush@cluster0.sggba.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
})
.then(()=>{
    console.log('connected to db');
})
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('hi');
})
app.use(cors());
app.post("/register",async(req,res)=>{
  const email=req.body.email;
  const register =  await new Login({
      name:req.body.name,
      email:email,
      password:req.body.password,
      
  });
  const insertR = await register.save();
  res.send(insertR);
      
  console.log(insertR);
  
}) 

app.get('/images',async(req,res)=>{
  Image.find()
  .then((document)=>{
      res.send(document);
  })
})
app.post("/signin",async(req,res)=>{
    const email = req.body.email;
    const user = await Login.findOne({email:email});
    if(user){
        if(user.password==req.body.password){
            console.log("user verified");
            res.send(`welcome ${user.name} !`);
        }
        else{
            res.send("wrong password!")
        }
    }
    else{
        console.log("User not found");
        res.send("User not found");
    }
})
cloudinary.config({
    cloud_name:'dxsxgt40t',
    api_key:'739331922381182',
    api_secret:'4x-7kLi9k1jeHlMacu1HBO2vdc4'
  });
  
const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10 // 10MB
  }
});

app.post('/upload', upload.single('image'), (req, res) => {
    cloudinary.uploader.upload(req.file.path, async(err, result) => {
      if (err) {
        return res.status(400).json({ message: 'Error uploading file' });
      }
      const imagee =await new Image({
        image:result.secure_url
      })
      const insertR = await imagee.save();
      console.log(insertR);
      res.json({
        url: result.secure_url,
        public_id: result.public_id
      });
    });
});
  
app.listen(port,(req,res)=>{
    console.log(`running on${port}`);
})