const express=require('express');
const app=express();
const path = require('path');
const {promisify}=require('util')
const {stat} = require('fs');
const fileInfo=promisify(stat);
const port=process.env.PORT || 9999;
const {I18n}=require('i18n');
app.use(express.json());
app.set('view engine','ejs');
app.use(express.static('views'))
const {devLogger}=require('./logger/index');
const filename='./Aaja Mexico Challiye (2022) Punjabi 720p CHTV WEB-DL H.264 AAC - CineVood.mkv'
app.get('/',async(req,res)=>{
    const size=await fileInfo(filename);
    res.writeHead(200,{"Content-Length":size,
        'Content-Type':'video/mp4'});
createReadStream(filename).pipe(res);
})


// const i18n=new I18n({locales:['en','de'],directory:path.join(__dirname,'locales')})
// devLogger.warn('text warn');
// devLogger.info('text info');
// devLogger.error(new Error('winston error'));
// devLogger.debug('text debug');
// devLogger.silly('silly text')

const userRoutes=require('./routes/userRoutes');
const { createReadStream } = require('fs');
app.use('/user',userRoutes);

app.listen(process.env.PORT || port,()=>{
    console.log('server listening on port 9999');
})