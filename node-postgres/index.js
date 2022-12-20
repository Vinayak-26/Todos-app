const { response } = require('express')
const express  = require('express')
const app = express()
const port = 3001

// app.get('/', (req, res)=> {
//     res.status(200).send('Hello World!');
// })

// app.listen(port, () => {
//     console.log('App running on port'  +port+ '.');
// })
const todo_model = require('./todo_model')

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
  });

app.get('/', (req, res) => {
    todo_model.getTodos()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.post('/todos', (req, res) => {
    todo_model.createTodos(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
    
  })
  app.put('/todos', (req, res) => {
    todo_model.updateTodos(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
    
  })

  app.delete('/todos/:id', (req, res) => {
    todo_model.deleteTodos(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })