const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoDb = require('./database/connection');
const createError = require('http-errors');
const port = process.env.PORT || 8000;

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
    console.log('Database sucessfully connected ')
    // console.log(`MongoDB Connected: ${mongoDb.db.connection.host}`)
  },
  error => {
    console.log('Database error: ' + error);
    process.exit(1);
  }
)

const student_Route = require('./routes/student_route')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

// Static directory path
app.use(express.static(path.join(__dirname, 'dist/angular-mean-crud-tutorial')));


// API root
app.use('/api', student_Route)


app.listen(port, () => {
  console.log('Listening on port ' + port)
})

// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});

// Base Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/angular-mean-crud-tutorial/index.html'));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});