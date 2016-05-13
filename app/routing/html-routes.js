var path=require('path');

module.exports=function(app){
	app.get('/home',function(req,res){
		res.sendFile(path.join(__dirname+'/../public/index.html'))
	});
	app.get('/deeds',function(req,res){
		res.sendFile(path.join(__dirname+'/../public/deeds.html'))
	});
	app.get('/profile',function(req,res){
		res.sendFile(path.join(__dirname+ '/../public/profile.html'))
	})
	app.use(function(req,res){
		res.sendFile(path.join(__dirname+'/../public/index.html'))
	});
	
}