const express = require('express');
const client = require('../lib/db');

const router = express.Router();

const signs = [`=`,`!=`,`<`,`>`,`LIKE`];

// Get table column names and informations
router.get('/infos/:name', (req, res, next) => {
    const { name } = req.params;
    
    getTableInfo({ name }).then((result) => {
        res.send(result)
    }).catch(err => { next(err) })
});

// Change table column names and informations
router.post('/infos/change/:name', (req, res, next) => {
    const { name } = req.params;

    const { column, newColumn } = req.body;
    
    getTableInfo({ name }).then((result) => {
        client.query(`ALTER TABLE ${name} RENAME COLUMN ${column} TO ${newColumn}`, 
            (err, result) => {
                if (err) throw err;
                res.send(result.rows);
            }
        );
    }).catch(err => { next(err) })
});

// Get all rows from the table
router.get('/:name', (req, res, next) => {
    const { name } = req.params;

    getTableInfo({ name }).then(() => {
        client.query(`SELECT * FROM ${name}`, 
            (err, result) => {
                if (err) throw err;
                res.send(result.rows);
            }
        );
    }).catch(err => { next(err) })
      
});

// Get sorted row from the table
router.post('/:name/sort', (req, res, next) => {
    const { name } = req.params;
    const { params } = req.body;

    getTableInfo({ name }).then((result) => {
        if(compareArrays(params.map(e => {return e.columnName}), result.map(e => {return e.name})) && compareArrays(params.map(e => {return e.sign}), signs)){
            client.query(
                `SELECT * FROM items WHERE ${params.map((e, i) => {
                                                return e.sign !== `LIKE` ? 
                                                    `${e.columnName} ${e.sign} $${i+1} ${i !== params.length - 1 ? 'AND ' : ''}` :
                                                    `${e.columnName} LIKE($${i+1}) ${i !== params.length - 1 ? 'AND ' : ''}`
                                            }).join('')}`,
                params.map(e => {return e.value}),
                (err, result) => {
                    if (err) throw err;
                    res.send(result.rows);
                }
            );
        }else{
            throw new Error(`Erro no envio de parâmetros`);
        }
    }).catch(err => { next(err) })
});

// Insert new row in the table  
router.post('/:name', (req, res, next) => {
    const { name } = req.params;
    const body = req.body;

    delete body.id;

    console.log(`body`, body);
    
    const columns = Object.keys(body);
    const values = Object.values(body);
    
    getTableInfo({ name }).then((result) => {
        if(compareArrays(columns, result.map(e => {return e.name}))){
            const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
            const columnString = columns.join(', ');

            client.query(
                `INSERT INTO ${ name } (${ columnString }) VALUES (${ placeholders }) RETURNING id`,
                values,
                (err, result) => {
                    if (err) throw err;
                    res.send(`Item added with ID: ${ result.rows[0].id }`);
                }
            );
        }else{
            throw new Error(`Erro no envio de parâmetros`);
        }
    }).catch(err => { next(err) })
});

// Update a row in a table using it's Id as reference
router.put('/:name/:id', (req, res, next) => {
    const { name, id } = req.params;
    const body = req.body;
    
    const columns = Object.keys(body);
    const values = [ ...Object.values(body), id];

    
    getTableInfo({ name }).then((result) => {
        if(compareArrays(columns, result.map(e => {return e.name}))){
            const columnString = columns.map((e, i) => `${e}=$${i + 1}`).join(', ');
            
            client.query(
                `UPDATE ${ name } SET ${ columnString } WHERE id=$${columns.length+1}`,
                values,
                (err, result) => {
                    if (err) throw err;
                    res.send(`Item ${id} updated`);
                }
            );
        }else{
            throw new Error(`Erro no envio de parâmetros`);
        }
    }).catch(err => { next(err) })
});

// Delete a row in a table using it's Id as reference
router.delete('/:name/:id', (req, res, next) => {
    const { name, id } = req.params;

    getTableInfo({ name }).then((result) => {
        client.query(`DELETE FROM ${ name } WHERE id=$1`, 
            [id], 
            (err, result) => {
                if (err) throw err;
                res.send(`Deleted the ${ id }th row from ${ name }.`);
            }
        );
    }).catch(err => { next(err) })
});


// Get information from the postgres table schema, using the table's name and getting it's column's name, data type and maximum character length
function getTableInfo({ name }){
    return new Promise((resolve, reject) => {
        client.query('SELECT column_name AS name, data_type AS type, character_maximum_length AS maxChar FROM information_schema.columns WHERE table_name = $1',
            [name], 
            (err, result) => {
                if (err) reject(err);
                resolve (result.rows);
            }
        );
    })
}

// Compare two arrays, returning true if the values of the first array (arr1) are all on the second array (arr2) as well.
function compareArrays(arr1, arr2) {
    return arr1.every(value => arr2.includes(value));
}

module.exports = router;