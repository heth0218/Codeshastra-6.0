var nodemailer=require('nodemailer');
var express=require('express');
var bodyParser=require('body-parser');
var app=express();

app.use(bodyParser.json());
app.listen(3000,()=>{
    console.log('listening to port 3000');
})
app.use(express.static('public'));


app.post('/',(req,res)=>{
    const data=req.body;
    console.log(data);
    const to=data.to;
    const from=data.from;
    const subject=data.subject;
    const body=data.body;
    var transporter=nodemailer.createTransport({
        service:'gmail',
        port:400,
        auth:{
            user:`${from}`,
            pass:'Hethgala123'
    
        },
    });
    var mailOptions={
        from:`${from}`,
        to:`${to}`,
        subject:`${subject}`,
        text:`${body}`
    };
    transporter.sendMail(mailOptions,(err,info)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('email sent:'+info.response);
    }
    })
    res.send({messgae:'hello'});
})