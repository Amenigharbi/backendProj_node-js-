const mongoose=require('mongoose');
const db=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/nodeComm').then((conn)=>{
    console.log(`database connected :${conn.connection.host}`);
}).catch((err)=>{
    console.error(`database error ${err}`);
    process.exit(1);
});
}
module.exports=db 