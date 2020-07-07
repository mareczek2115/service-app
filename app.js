const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//Połączenie z bazą
//Nie zamierzam udostępniać publicznie własnych baz danych, dlatego
//aby działało należy zmienić <user>, <password> i <database> na odpowiednie własne dane. 
const MongoURI = 'mongodb+srv://test:test@moja-baza.m4kve.mongodb.net/test';
mongoose.connect(MongoURI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true})
    .then(() => {
        console.log('Połączono z bazą');
    })
    .catch(err => console.log(err));

//EJS config
app.set('view engine', 'ejs');

//Static files
app.use(express.static('public'));

//Method override
app.use(methodOverride('_method'));

//Body parser
app.use(express.urlencoded({extended: false}));

//Ścieżka do serwisów
app.use('/serwis', require('./routes/index'));
app.use('/serwis', require('./routes/services'));

//Strona główna
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}\\public\\html\\index.html`);
});

//Error 404
app.get('/error/404', (req, res) => {
    res.sendFile(`${__dirname}\\public\\html\\404.html`);
});

//Ustawienie portu i nasłuch
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Nasłuchiwanie na porcie ${PORT}`);
});