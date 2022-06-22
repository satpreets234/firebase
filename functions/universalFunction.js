const employee=require('../models/userModel');
const jwt=require('jsonwebtoken');
const path = require('path');
const { devLogger } = require('../logger/index');

module.exports.checkExistingUser=async(req,res,next)=>{
    // console.log(req.file)
    const emailExist=await employee.findOne({where:{email:req.body.email}});
    const phoneNumberExist=await employee.findOne({where:{phoneNumber:req.body.phoneNumber}});
    devLogger.log('info',req.body);
    if(!emailExist && !phoneNumberExist){
        next();
    }else{
        res.send('Duplicate invalid details');
}
}

module.exports.verifyToken=async(req,res,next)=>{
    const bearerToken=await req.header('Authorization');
    const jsonToken=bearerToken.split(' ')[1];
    // console.log(jsonToken);
    if(jsonToken){
        try {
            const verifyToken= jwt.verify(jsonToken,'secretKeySatpreetBachhal');
            if(verifyToken){
                const userDetails=await employee.findOne({where:{id:verifyToken.id}});
                req.userDetails=userDetails;
                next();
            }
        } catch (error) {
            res.send(error+' login first');
        }
    }else{
        res.send('Unauthorized access');
    };

}


