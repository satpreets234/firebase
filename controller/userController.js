const employees=require('../models/userModel');
const {Op} = require('sequelize');
const universalFunction=require('../functions/universalFunction');
const images=require('../models/userImages');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const task=require('../models/userTask');
const {devLogger}=require('../logger/index');
const fs = require('fs');
const busboy = require('busboy');
const path = require('path');

module.exports.signup=async(req,res)=>{
    try{
    const newEmployee=await employees.create(req.body);
   const userImage=await images.create({imagePath:req.file.path,userId:newEmployee.id}); 
    res.send({newEmployee:newEmployee,userImage:userImage
    });
    }catch(err){
        res.send(err);
    }
}

module.exports.signin=async(req,res)=>{
    try{
        const employeeExist=await employees.findOne({where:{email:req.body.email}});
        let password=await bcrypt.compare(req.body.password,employeeExist.password);
        if(password){
            const jsonToken=jwt.sign({id:employeeExist.id,email:employeeExist.email},'secretKeySatpreetBachhal',{expiresIn:'1d'});
            const employeeDetails=await employees.findAll({where:{id:employeeExist.id},include:images});
            const imagedetails=await images.findAll({where:{userId:employeeExist.id},include:employees})
            res.send({employeeDetails:employeeDetails,jsonToken:jsonToken});
        }else{
           logger.info('invalid details');
           res.send('invalid details')
        }
    }catch(err){
        res.send(err);
    }
}

module.exports.requiredata=async(req,res)=>{
    try {
        const requiredData=await employees.findAll({ where:{age:{[Op.notIn]:[23,24]}},attributes:{exclude:['password','id']}})
        if(requiredData){
            res.send(requiredData)};
    } catch (error) {
        logger.error('no required data');
    }
}

module.exports.userInfo=async(req,res)=>{
    try {
        const employeeExist=await employees.findOne({where:{email:req.body.email}});
        res.send(employeeExist.aboutUser);
    } catch (error) {
        res.send(error);
    }
}

module.exports.newTask=async(req,res)=>{
    try {
        // let userId=req.userDetails.id;
        // devLogger.info(req.body)
       console.log(req.body);
        const taskNew=await task.create({userId:req.body.userId,title:req.body.title,description:req.body.description,lastDate:req.body.lastDate});
      res.send(taskNew);
    } catch (error) {
        res.send(error);
    }
}

module.exports.allTasks=async(req,res)=>{
    try {
        const allPendingTasks=await task.findAll({where:{userId:req.userDetails.id,completed:false},include:{attributes:{exclude:['password'
    ,'aboutUser']},model:employees}});
        res.send(allPendingTasks);
    } catch (error) {
        
    }
}

module.exports.streamer=async(req,res)=>{
    try {
        const rstream=fs.createReadStream('in.txt',{highWaterMark:1600});
        const wstream=fs.createWriteStream('out.txt');
        rstream.pipe(wstream);
        var body=[];
        let bytesRead=0;
        rstream.on('data',(chunks)=>{
            body.push(chunks);
            // wstream.write(chunks);
            console.log(chunks.toString())
            bytesRead+=chunks.length;
        });
        rstream.on('end',()=>{
            res.send(body.toString())
            console.log('data readed successfully');
        })
        rstream.on('error',(error)=>{
            res.send(error);
        })   
    } catch (error) {
        res.send(error);
    }
}

module.exports.fileupload=async(req,res)=>{
 
        req.pipe(req.busboy); // Pipe it trough busboy
     
        req.busboy.on('file', (fieldname, file, filename) => {
            console.log(`${filename}`);
     
            // Create a write stream of the new file
            const fstream = fs.createWriteStream(path.join('../uploads', filename))
            file.pipe(fstream);
 
        // On finish of the upload
        fstream.on('close', () => {
            console.log(`Upload of '${filename}' finished`);
            res.redirect('back');
        });
})}




