const express = require('express');
const app = express();

const student_Route = express.Router();
let Student = require('../model/student_data');

// Add stydent data
student_Route.route('/add-student').post((req, res, next) => {
    Student.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all student data
student_Route.route('/').get((req, res) => {
    Student.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get Student data (id-wise)
student_Route.route('/student-data/:id').get((req, res) => {
    Student.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});


// Update Student
student_Route.route('/update-student/:id').put((req, res, next) => {
    Student.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Book updated successfully!')
    }
  })
});

// Delete Student
student_Route.route('/delete-student/:id').delete((req, res, next) => {
    Student.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
      console.log('Delete data successfully!')
    }
  })
});

// Delete all student data
student_Route.route('/delete-student-all').delete((req, res) => {
  Student.deleteMany((error, data) => {
  if (error) {
    return next(error)
  } else {
    res.status(200).json({
      msg: data
    })
    console.log('Delete all data successfully!')
  }
})
});

//search by name
student_Route.route({name:{ $regexp: new RegExp(), $options: "i"}}).get((req, res) => {
  Student.find(req.params.name,(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  });
});


module.exports = student_Route;