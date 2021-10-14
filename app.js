const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
var exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

if(process.env.NODE_ENV === 'dev'){
    require('dotenv').config();
}

const port = process.env.PORT;
const key = process.env.KEY;

app.get('/', async function (req, res) {
    res.render('home', {noticias: await AG()});
});

app.get('/:everything', async function (req, res) {
    let tema = req.params.everything
    res.render('home', {noticias: await theme(tema)});
});

async function theme(tema){
    return await axios.get("https://newsapi.org/v2/everything?q="+tema+"&sortBy=popularity&apiKey="+key)
    .then(function(response){
        return response.data.articles
    })
}

async function AG(){
    return await axios.get("https://newsapi.org/v2/everything?q=world&sortBy=popularity&apiKey="+key)
    .then(function(response){
        return response.data.articles
    })
}

app.get('/:everything', async function (req, res) {
    res.render('home',{noticias: await theme(tema)});
});

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.listen(port,()=>{
    console.log('App is listening in port '+port)
})
