var express	=	require("express");
var multer	=	require('multer');
var path=require('path');
var app	=	express();
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now()+"_"+file.originalname);
    console.log(new Date().toLocaleString()+file.originalname+"::"+file.filename+"::"+file.fieldname+path.extname(file.originalname));
  }
});
//var user=document.getElementById("username").nodeName;
//console.log(user);
//upload.array('uploadedImages', 10)
//var uploadFiles = multer({ storage: storage }).array("multi-files", 10);
//var upload = multer({ storage : storage}).single('userPhoto');
var upload = multer({ storage : storage}).array('userPhoto',10);

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});