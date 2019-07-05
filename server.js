// We are including a 'Templating engine' wich will render our html file and will be good for working
// when we will have to work on Headers and Footers which will be in every page
// Simply we can create different componenets so that they can be reused
// We are using handlebars but we can also use Pug.

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Configuring Heroku port and localhost ports
const port = process.env.PORT || 8000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');  
app.set('view engine', 'hbs');


// Creating a Logger middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFileSync('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to log');
        }
    });
    next();
 });

//  This middleware can  be used to stop all the middleware from working as next() is not called in this middleware.
// app.use((req,res,next) => {
//     res.render('maintain.hbs');
// });


// Adding a middleware to let the help.html to interact with the server
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
 
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/' , (req,res) => {
    // res.send('<h1>Hello Express</h1>');
    // res.send({
    //     name: 'Kautuk',
    //     age: 18,
    //     hobby: [
    //         'singing' , 
    //         'guitar'
    //     ]
    // });

    res.render('home.hbs',{
        pageTitle:'Home Page',
           })

});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'Login Page',
       });
});

app.get('/bad', (req,res) => {
     res.send({
        errorMessage: 'Unable to handle request' 
     });
});

app.listen(port , () => {
    console.log(`Server is running on ${port}`);
});