const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//Połączenie z bazą
const MongoURI =
  // 'mongodb+srv://<username>:<password>@moja-baza.m4kve.mongodb.net/<database>';
  'mongodb://127.0.0.1:27017/<database>';
mongoose
  .connect(MongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
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
app.use(express.urlencoded({ extended: false }));

//Ścieżki
app.use('/serwis', require('./routes/index'));
app.use('/serwis', require('./routes/services'));

//Główna strona
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}\\public\\html\\index.html`);
});

//404 do testów
// app.get('/error/404', (req, res) => {
//     res.sendFile(`${__dirname}\\public\\html\\404.html`);
// });

//Port i nasłuch
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Nasłuchiwanie na porcie ${PORT}`);
});
