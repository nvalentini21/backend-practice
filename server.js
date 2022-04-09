const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  {id:1, name: 'course1'},
  {id:2, name: 'course2'},
  {id:3, name: 'course3'}
]
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/api/courses', (req, res) => {
  res.send(courses);
})

// api/courses/1

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if (!course) res.status(404).send('404: The course with the given id was not found.');
  res.send(course);
})

//When working with a database, the id will be assigned via the database. For now. we are hard
//coding the id into the object/assigning it manually.

app.post('/api/courses', (req, res) => {

const { error } = validateCourse(req.body);
if (error){
  res.status(400).send(error.details[0].message)
}
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course)
  res.send(course);
})

app.put('/apli/course/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if (!course) res.status(404).send('404: The course with the given id was not found.');
  res.send(course);
  //Look up the course
  //If not existing, return 404
  const { error } = validateCourse(req.body);

  // const {error, value} = schema.validate(req.body);
  if (error){
    res.status(400).send(error.details[0].message)
  }

  course.name = req.body.name;
  res.send(course)
  //validate
  //If invalid, retrun 400

  //update course
  //return
})

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });

  return schema.validate(course)
}

const port = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${`3000`}...`))
