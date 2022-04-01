const express = require('express'); // incldues express js
const app = express(); // variable for express
const bodyParser = require('body-parser'); // includes bodyParser
const mongoose = require('mongoose'); // includes mongoose
const bcrypt = require('bcryptjs');
const cors = require('cors');
const config = require('./config.json');
const Post = require('./models/post.js');
const User = require('./models/user.js');
const port = 5000;

const { response } = require('express');


app.use((req,res,next)=>{
    console.log(`${req.method} request ${req.url}`);
    next();
  })
  
  app.use(bodyParser.json());//calling body parser method
  app.use(bodyParser.urlencoded({extended:false})); // preventing url from being parsed
  
  app.use(cors()); // calling cors method with express
  
  app.get('/', (req,res)=> res.send('Hello! Im am from the backend!'));

mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@zip.${config.MONGO_CLUSTER_NAME}.mongodb.net/${config.MONGO_DBNAME}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=> console.log('DB Connected'))
.catch(err=>{
    console.log(`DB Connection Error: ${err.message}`)
});

app.listen(port,()=>console.log(`My fullstack application is listening on port ${port}`));




// Adding a post to the Database

app.post('/addPost',(req,res)=>{
  const dbPost = new Post({
    _id: new mongoose.Types.ObjectId,
    name: req.body.name,
    price: req.body.price,
    image_url: req.body.image_url
  });
  // save to database and to notify the user
  dbPost.save().then(result=>{
    res.send(result);
  }).catch(err=>res.send(err));
})



// Update Post on DataBase

app.patch('/updatePost/:id',(req,res)=>{
  const idParam = req.params.id;
  Product.findById(idParam,(err,post)=>{
      const updatedPost = {
        name : req.body.name,
        price : req.body.price,
        image_url:req.body.image_url
      }
      Post.updateOne({_id:idParam}, updatedPost).
      then(result=>{
        res.send(result);
      }).catch(err=> res.send(err));
  })
})



// Delete Post from DB

app.delete('/deletePost/:id',(req,res)=>{
  const idParam = req.params.id;
  Post.findOne({_id:idParam}, (err,post)=>{
    if(product){
      Product.deleteOne({_id:idParam},err=>{
        console.log('deleted on backend request');
      });
    } else {
      alert('Not found');
    }
  }).catch(err=> res.send(err));
}); // Delete



// Create Account

app.post('/registerUser',(req, res)=>{
  // Checking if user is in the DB already

  User.findOne({username:req.body.username}, (err, userResult)=>{

    if(userResult){
      res.send('Username taken already. Please try another name');
    } else{
      const hash = bcrypt.hashSync(req.body.password); // Encryp User Password
      const user = new User({
        _id: new mongoose.Types.ObjectId,
        username: req.body.username,
        // email: req.body.email,
        password: hash
      });
      // Save to database and notify userResult
      user.save().then(result=>{
        res.send(result);
      }).catch(err=>res.send(err));
    } // Else
  })
}) // End of Create Account



// Log in User

app.post('/loginUser', (req, res)=>{

  User.findOne({username:req.body.username}, (err, userResult)=>{
    if (userResult){
      if(bcrypt.compareSync(req.body.password, userResult.password)){
        res.send(userResult);
      } else{
        res.send('not authorised');
      } // inner if
    } else{
      res.send('user not found. Please register');
    } // outer if
  }) // Find one ends
}); // end of post login



// Get all Products for the Database
app.get('/allProductsFromDB',(req,res)=>{
  Product.find().then(result=>{
    res.send(result);
  })
})



// Comment

// Creating a comment

app.post('/createComment', (req, res)=>{

  const newComment = new Comment({

    _id: new mongoose.Types.ObjectId,
    text: req.body.text,
    time: new Date(),
    user_id: req.body.user_id,
    post_id: req.body.post_id
  }); // End of Const

  newComment.save()
  .then(result => {
    Post.updateOne({
      _id: req.body.post_id
    }
    ).then(result => {
      res.send(newComment);
    }).catch(err => {
      res.send(err);
    });
  });
}); // End of post



// Delete Comment

app.delete('/deleteComments/:id', (req, res) =>{
  Comment.findOne({
    _id: req.params.id
  }, (err, comment) => {

    if(comment && comment['user_id'] == req.body.user_id) {

      Post.updateOne({
        _id: comment.post_id
      }
      ).then (result => {
        Comment.deleteOne({
          _id: req.params.id
        }, err => {
          res.send('deleted');
        });
      }).catch(err => {
        res.send(err);
      });
    } else{
      res.send('not found / unauthorised');
    }
  });
});