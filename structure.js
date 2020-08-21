const mongoose=require('mongoose');

const schema=mongoose.Schema;

const newschema=new schema({
    name:String,
    email:String,
    dept:String,
    message:String,
});

const Contacts=mongoose.model('Contacts', newschema);

module.exports=Contacts;