const express=require("express")
const app=express()
var nodemailer=require('nodemailer');
var bodyParser=require('body-parser');

const fetch =require('node-fetch')

app.listen(3000,()=>{
    console.log("connected successfully")
})

app.use(express.static('public'))
app.use(express.json({limit:'10mb'}))
app.post('/api',async (req,res)=>{
    const data=req.body;
    data.forEach(async(element) => {
        const resp=await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${element.placeid}&fields=name,formatted_phone_number&key=AIzaSyAd9DTY3VRIMhH4iUeTQp7QjogV_FBc5mY`);
        const json1=await resp.json();
        console.log(json1);
        
        const nishit={
            status:"success",
            data:json1
        };
        res.json(nishit)
        console.log(nishit);
    });
    
    
   

})
app.get('/weather/:latlon/:text',async (req,res)=>{
    const hello=req.params.latlon.split(',');
    const lat=hello[0];
    const long=hello[1];
    const text=req.params.text
    console.log(text)
    
    
    const api_url=await fetch(`https://api.darksky.net/forecast/3bc0db978e12a1a19d71a2df505bf448/${lat},${long}`)
    const response=await api_url.json()
    
    const weather_url=await fetch(`https://api.openaq.org/v1/latest?coordinates=${lat},${long}`)
    const resp=await weather_url.json()
    
    console.log(lat,long)
    const places=await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=90000&keyword=${text}&key=AIzaSyAmJ435MjXiZFd1xfgN7_UjYJlWzz3ViPg`)
    const ress=await places.json()
    console.log(ress)
    


    const data={
        weather:response,
        air:resp,
        places:ress
    }
    
    res.json(data);

    
})

app.post('/',(req,res)=>{
    const data=req.body;
    console.log(data);
    const to=data.to;
    const from=data.from;
    const subject=data.subject;
    const body=data.body;
    var transporter=nodemailer.createTransport({
        service:'gmail',
        port:500,
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
