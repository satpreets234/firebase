const express = require('express');
const router=express.Router();
const userController=require('../controller/userController');
const employees=require('../models/userModel');
const universalFunction=require('../functions/universalFunction');
const upload=require('../services/uploading');

router.post('/signup',upload.single('file'),universalFunction.checkExistingUser,userController.signup);
router.post('/signin',userController.signin);
router.get('/requiredata',userController.requiredata);
router.get('/userData',userController.userInfo);
router.get('/newTask',userController.newTask);
router.get('/allTasks',universalFunction.verifyToken,userController.allTasks);
router.get('/stream',userController.streamer);
router.post('/upload',userController.fileupload);

module.exports=router;