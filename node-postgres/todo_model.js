const { request } = require('express');

const Pool = require('pg').Pool
const pool = new Pool({
    user : 'my_user',
    host : 'localhost',
    database : 'my_database',
    password : 'root',
    port : 5432,

});
const getTodos = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM todos', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
        
      })
      
    }) 
}

const createTodos = (body) => {
    return new Promise(function(resolve, reject) {
      const { id, toDos } = body
      pool.query('INSERT INTO todos (id, to_dos) VALUES ($1, $2) RETURNING *', [id, toDos], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`To-do added! -  ${results.rows[0]['to_dos'] }`)
        // console.log(results);
      })
    })
  }
  const updateTodos = (body) => {
    return new Promise(function(resolve, reject) {
      const { id, toDos } = body
      pool.query('UPDATE todos SET to_dos = $2 WHERE id = $1  RETURNING *', [id, toDos], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`To-do updated as :-  ${results.rows[0]['to_dos']}`)
        // console.log(results);
      })
    })
  }
  const deleteTodos = (body) => {
      return new Promise(function(resolve, reject) {
      const  id  = body.id
      // console.log(typeof(id))
      pool.query('DELETE FROM todos WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Todo deleted! `)
      })
    })
  }
  module.exports = {
    getTodos,
    createTodos,
    updateTodos,
    deleteTodos,    
  }
  