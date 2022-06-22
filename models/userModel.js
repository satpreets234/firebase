const {Model,DataTypes}=require('sequelize');
const sequelize=require('../config/config');
const bcrypt = require('bcrypt');
const users=require('./userModel');
const userImages = require('./userImages');
const tasks = require('./userTask');

class user extends Model{};

user.init({
    name:{type:DataTypes.STRING,allowNull:false,validate:{isIn:['satpreet','manpreet','parpreet']}},
    companyName:{type:DataTypes.STRING,allowNull:false},
    age:{type:DataTypes.INTEGER,allowNull:false,validate:{max:130,min:18}},
    phoneNumber:{type:DataTypes.BIGINT,allowNull:false,validate:{len:10}},
    email:{type:DataTypes.STRING,allowNull:false,
    validate:{isEmail:true}},
    password:{type:DataTypes.STRING,allowNull:false,set(value){
        const hashedPassword=bcrypt.hashSync(value,10);
        this.setDataValue('password',hashedPassword);
    }},aboutUser:{type:DataTypes.VIRTUAL,get(){
        const data=`Name of user is ${this.name} and he works in ${this.companyName}  & his age is ${this.age}.For contacting him you can call him 
        on ${this.phoneNumber} or email on ${this.email}`
        return data;
    }}
},{
//     hooks:{
//     beforeCreate:async(userdata,options)=>{
//         userdata.password=await bcrypt.hash(userdata.password,10);
//         console.log(userdata);
//     },beforeValidate:async(userdata,options)=>{
//         userdata.name=userdata.name.toUpperCase();
//         userdata.companyName=userdata.companyName.toUpperCase();
//     }
// }
sequelize,tableName:'employees',timestamps:false
});

user.hasMany(userImages,{foreignKey:"userId"});
userImages.belongsTo(user,{foreignKey:'userId'});

user.hasMany(tasks,{foreignKey:'userId'});
tasks.belongsTo(user,{foreignKey:'userId'});


user.sync({}).then((data)=>{
    console.log("table synced successfully");
}).catch((err)=>{
    console.log(err);
})

module.exports=user;
