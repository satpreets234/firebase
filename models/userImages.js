const {Model,DataTypes}=require('sequelize');
const sequelize=require('../config/config');
const bcrypt = require('bcrypt');
const user=require('./userModel');

class userImages extends Model{};

userImages.init({
    "imagePath":{type:DataTypes.STRING},
    "userId":{type:DataTypes.INTEGER}
},{sequelize,timestamps:false});


userImages.sync({}).then((data)=>{
    console.log("table synced successfully");
}).catch((err)=>{
    console.log(err);
})

module.exports=userImages;