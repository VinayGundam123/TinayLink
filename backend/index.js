const express=require("express");
const app=express();
const dotenv=require("dotenv");
dotenv.config();
const router=require("./routes/link.js");
const cors=require('cors');
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());
app.get("/healthz",(req,res)=>{
    res.json({
        "ok":true,
        "version":"1.0"
    });
})
app.use(router);

app.use('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'dist','index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
