var mysql=require('mysql')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/',function(request,response){
      
     response.sendFile(__dirname+"/Public/signup.html")
})

app.listen(2100);

var config={
    host:"localhost",
    user:"root",
    password:"",
    database:"project"
}

var dbctrl=mysql.createConnection(config);

dbctrl.connect(function(err)
{
    if(err)
       console.log(err);
    else 
       console.log("Database connected successfully!!!");
})


app.get("/ajaxemail",function(req,resp)
{
     
    console.log("connected sucessfully");
    var usrnm=req.query.username;
    var pswd=req.query.pwd;
    var nme=req.query.type;
    var gen=req.query.gen;
    var ph=req.query.phhno;
    var ary=[usrnm,pswd,nme,gen,ph];

    dbctrl.query("insert into signup values(?,?,?,?,?)",ary,function(err)
    {
        if(err)
        {
        //   console.log(err);
          resp.send(err);
        }
        else 
         {
            resp.send("Record inserted successfully!!");
         }

    })

})



app.get("/ajaxlogin",function(req,resp)
{
     
    console.log("log in sucessfully");
    var lnme=req.query.lusrname;
    var psswd=req.query.pwsd;
    
   
    dbctrl.query("select * from signup where username=? and password=?",[lnme,psswd],function(err,result)
    {
        if(err)
        {
          console.log(err);
        }
        else 
         {
            console.log("sending");
            resp.send(result);
         }

    })

})

app.get("/profile",function(req,resp)
{
    resp.sendFile(__dirname+"/homepage.html");
})


app.get("/ajaxsetting",function(req,resp)
{
    var em=req.query.emailidd;
    var oldpswd=req.query.oldpwd;
    var newpswd=req.query.newpwd;
    var ary1=[newpswd,em,oldpswd];
    
   
    dbctrl.query("update signup set password =? where username=? and password=?", ary1, function (err)
    {
        if (err) {
            resp.send(err);
            }
        else {
            resp.send("Password Successfully updated!!");
            }

    });

          
 });


 app.get("/admin",function(req,resp)
{
    var fullpath=__dirname+"/admin-panel.html";
    resp.sendFile(fullpath);
}) 

app.get("/jsonfetchall",function(req,resp)
{
            var em=req.query.email;
            dbctrl.query("select * from signup ",[em],function(err,result)
            {
                if(err)
                {
                    resp.send(err.toString());
                }
                else 
                {
                   
                    resp.send(result);
                }
            })
})