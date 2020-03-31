const express =  require('express');
const mongoose = require('mongoose');
const  exphbs = require('express-handlebars');
const path =  require('path');
const todoRoutes = require('./routes/todos');


const PORT = process.env.PORT || 3000;

const app = express();
const hbs  = exphbs.create({
   defaultLayout: 'main',
   extname: 'hbs'
});

app.engine('hbs' , hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname , 'public')));

app.use(express.urlencoded({extended: true}));
app.use(todoRoutes);

async function start (){
    try{
      await mongoose.connect(
          'mongodb+srv://zlobste:password@cluster0-lihx5.mongodb.net/todos',
          {
                useNewUrlParser: true,
                useFindAndModify: true
            });
        app.listen(PORT , () => {
            console.log(`server has been started on port: ${PORT}`)
        });


    }catch (e) {
        console.log(e);
    }
}

start();


