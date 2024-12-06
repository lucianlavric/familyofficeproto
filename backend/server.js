const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/formData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const formSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  companyName: String,
  message: String,
});

const FormData = mongoose.model('FormData', formSchema);

app.post('/submit-form', (req, res) => {
  const formData = new FormData(req.body);
  formData.save()
    .then(() => res.status(200).send('Data saved'))
    .catch(err => res.status(500).send('Error saving data: ' + err.message));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
