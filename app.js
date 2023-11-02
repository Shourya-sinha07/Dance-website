const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;
const bodyparser = require("body-parser")
const mongoose = require('mongoose');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



//define mongoose schema
const ContactSchema = new mongoose.Schema({
  Name: String,
  phone: String,
  email: String,
  address: String,
  desc: String
});
const Contact = mongoose.model('Contact', ContactSchema);
//EXPRESS SPECIFIC STUFF

app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
app.get('/', (req, res) => {
  const params = {}
  res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
  const params = {}
  res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
  var mydata = new Contact(req.body);
  mydata.save().then(() => {
    res.send("This iteam has been set to the database")
  }).catch(() => {
    res.status(400).send("This item has been set in the data base")
  });
 // res.status(200).render('contact.pug');
})
// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});



// app.post('/', (req, res) => {
//   Name = req.body.Name;
//   phone = req.body.phone;
//   email = req.body.email;
//   address = req.body.address;
//   desc = req.body.desc;
//   let outputTowrite = `The name of the customer is ${Name} and phone number is ${phone} ,email is ${email} and he/she lived in ${address} more about them ${desc}`
//   fs.writeFileSync('output.txt', outputTowrite)
//   const psrsms = { 'message': 'Your form has been submitted succesfully' }
//   res.status(200).render('index.pug', psrsms)
// })





