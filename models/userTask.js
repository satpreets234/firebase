const {Model,DataTypes}=require('sequelize');
const sequelize=require('../config/config');
const users=require('./userModel');

class tasks extends Model{};

tasks.init({
    title:{type:DataTypes.STRING,allowNull:true},
    description:{type:DataTypes.TEXT,allowNull:false},
    lastDate:{type:DataTypes.STRING,allowNull:false},
    userId:{type:DataTypes.INTEGER},
    completed:{type:DataTypes.BOOLEAN,defaultValue:false}
},{sequelize,timestamps:false,tableName:'employeeTasks'})



tasks.sync({}).then((success)=>{
    console.log("successfullly synced table")
}).catch(err=>{
    console.log(err);
})

module.exports=tasks;

