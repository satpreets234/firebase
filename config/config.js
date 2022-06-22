const Sequelize=require('sequelize');
const sequelize=new Sequelize(
    'codebrew','root','',{
        "host":"localhost","dialect":"mysql"
    }
)

try{
sequelize.authenticate().then((success)=>{
    console.log('connection established successfully');
})
}
catch(err){
    console.log(err);
}
module.exports=sequelize;