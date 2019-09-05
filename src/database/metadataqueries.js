const router = require("express").Router();
const pool = require("../database/connection");


//MIDDLEWARE Hello roar
const getMetadata = (request, response) => {
    pool.query('SELECT * FROM metadata', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    };
  
router.post("/metadata", getMetadata,  (request, response) => {});

module.exports = router;

