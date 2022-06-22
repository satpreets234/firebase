const multer = require('multer');
const express = require('express');
const path=require('path');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../uploads'))
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'pks'+file.originalname)
    }
});
const upload=multer({storage:storage});
module.exports=upload;