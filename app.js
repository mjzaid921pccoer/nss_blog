var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path    = require('path');
var session = require('express-session');
var multer	=	require('multer');

//make connection to db
/*
mongoose.connect('mongodb://localhost:27017/sampleblog',{useNewUrlParser:true})
.then(()=>console.log('connect to db'))
.catch((error)=>console.log('error in connection',error));
//--->
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://nsspccoer_admin:ADMINnsspccoer@cluster0-shard-00-00.6ygbe.mongodb.net:27017,cluster0-shard-00-01.6ygbe.mongodb.net:27017,cluster0-shard-00-02.6ygbe.mongodb.net:27017/main?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("nss").collection("pccoer");
  // perform actions on the collection object
//  client.close();
});

mongoose.connect('mongodb://nsspccoer_admin:ADMINnsspccoer@cluster0-shard-00-00.6ygbe.mongodb.net:27017,cluster0-shard-00-01.6ygbe.mongodb.net:27017,cluster0-shard-00-02.6ygbe.mongodb.net:27017/main?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true',{useNewUrlParser:true})
.then(()=>console.log('connect to mongodb-atlas'))
.catch((error)=>console.log('error in connection',error));
*/

const uri="mongodb+srv://nsspccoer:nsspccoer123456789@cluster0.6ygbe.mongodb.net/nss?retryWrites=true&w=majority";
const uri0="mongodb+srv://nsspccoer_admin:ADMINnsspccoer@cluster0.6ygbe.mongodb.net/nss?retryWrites=true&w=majority";
const uri1="mongodb+srv://nsspccoer_admin:ADMINnsspccoer@cluster0.6ygbe.mongodb.net/nss?retryWrites=true&w=majority";
//mongoose.connect('mongodb://127.0.0.1:27017/Todo',{useNewUrlParser: true});
mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true });
const connectionObj=mongoose.connection;
connectionObj.once('open',function(){
    console.log("connected with MongoDB success");
});

//init app
var app = express();

//set the template engine
app.set('view engine','ejs');

//set public folder path
app.use(express.static(path.join(__dirname,'/public')));

//fetch the data from request
app.use(bodyParser.urlencoded({extended:false}));

//session
app.use(session({
    secret:'this_IS_MYsecretkey1234',
    resave:false,
    saveUninitialized:false
}));

//locals variable
app.use((req,res,next)=>{
    res.locals.auth = req.session.uid;
    next();
});

//default page load
app.get('/',(req,res)=>{
    res.redirect('/blog/home');
});

app.use('/user',require('./routes/users'));
app.use('/blog',require('./routes/blogs'));

//multiple Image Upload Public
var storage	=	multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './PublicUploads');
    },
    filename: function (req, file, callback) {
      callback(null, Date.now()+"_"+file.originalname);
      console.log(new Date().toLocaleString()+file.originalname+"::"+file.filename+"::"+file.fieldname+path.extname(file.originalname));
    }
  });
  var upload = multer({ storage : storage}).array('userPhoto',10);
  app.post('/photos',function(req,res){
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}else{
        //res.end("File is uploaded");
        //alert("Files Uploaded");
        console.log("Files Uploaded");
        }                  
    });
    res.redirect('blog/home');  
});
//server port
var port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server running at:'+port));
