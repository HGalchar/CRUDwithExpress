const express=require("express");
const bodyparser=require("body-parser");
const app=express();
app.set('view engine', 'twig');
//const ObjectId = require('mongodb').ObjectID;


/**Data Base connectivity */
      const mongoose = require('mongoose');
      mongoose.connect('mongodb://localhost:27017/myDB');
      const contact = require("./structure");      
/**for static files.... */
      app.use(express.static(__dirname+ '/transitive'));


/**for server port..... */
app.listen(3000, ()=> console.log("server is running"));

app.use(bodyparser.urlencoded({extended:true}));

//Main Content// 

app.get('/', function(req,res){
      res.sendfile("transitive/index.html")
});
app.post('/contact',function(req,res){
   contact.create(req.body); 
   res.redirect('/')

});

app.get('/show',async(req,res)=>{
      try{
            const data=await contact.find({});
            res.render('show',{data:data});
            
      }catch(err){
            res.send('error:'+ err);
      }
});

app.get('/deldata/:id', (req,res)=>{
     const id=req.params.id;
     contact.deleteOne({'_id':id},function(err){
           if(err)
           {
                 res.send(err);
           }
           res.redirect('/show');
      });
      
     console.log("data deleted...");       
});

app.get('/edit/:id',async(req,res)=>{
      try {
            const data=await contact.findOne({'_id':req.params.id})
            res.render('update',{data:data})

      } catch (error) {
            
      }

});
app.post("/update",(req,res)=>{
      
      const id=req.body.id;
      console.log(id);
      contact.updateOne({'_id':id},req.body,(err,res)=>{
            if(err) throw err

            console.log('data edited....')
    
      });

res.redirect("/show");
console.log("done..");
});

app.get('/test', (req,res)=>{
      res.render('test');
});

