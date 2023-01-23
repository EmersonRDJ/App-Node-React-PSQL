// Node Modules
const express = require('express');

// Db client
const client = require('../../lib/db');

// Router
const router = express.Router();

// Misc
const signs = [`=`,`!=`,`<`,`>`,`LIKE`];

    // Route: '/table'

// Get all tables column names and informations
router.get('/infos', (req, res, next) => {
    client.query("SELECT ddmtab as name FROM ddm",
        (err, result) => {
            if (err) next(err);
            res.send(result.rows);
        }
    );
});

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
        console.log(`SELECT * FROM ${ name } WHERE ${params.map((param, i) => {
                                                return `${param.columnName}::text LIKE('${param.value}') ${i !== params.length - 1 ? 'AND ' : ''}`
                                            }).join('')}`)
        console.log(params.map(param => {return param.value}))
        if(compareArrays(params.map(param => {return param.columnName}), result.map(e => {return e.name}))){
            client.query(
                `SELECT * FROM ${ name } WHERE ${params.map((param, i) => {
                                                return `${param.columnName}::text LIKE('${param.value}') ${i !== params.length - 1 ? 'AND ' : ''}`
                                            }).join('')}`,
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

    const newBody = Object.fromEntries(
        Object.entries(body).filter(([key, value]) => value)
    ); 
    
    console.log(`body 2`, newBody); 
    const columns = Object.keys(newBody);
    const values = Object.values(newBody);
    
    getTableInfo({ name }).then((result) => {
        if(compareArrays(columns, result.map(e => {return e.name}))){
            const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
            const columnString = columns.map(column => `"${column}"`).join(', ');

            client.query(
                `INSERT INTO "${ name }" (${ columnString }) VALUES (${ placeholders }) RETURNING id`,
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
    
    const newBody = Object.fromEntries(
        Object.entries(body).filter(([key, value]) => value)
    ); 

    console.log(`body 2`, newBody); 
    const columns = Object.keys(newBody);
    const values = [ ...Object.values(newBody), id];

    console.log('veio aqui')
    console.log('columns', columns)
    console.log('values', values)
    
    getTableInfo({ name }).then((result) => {
        console.log('veio2')
        console.log('aqui',result.map(e => {return e.name}))
        // Compara as colunas enviadas com as disponiveis na tabela, se existirem a query é executada.
        if(compareArrays(columns, result.map(e => {return e.name}))){
            // Configura uma string para os updates em cada coluna, por exemplo: 'coluna1=$1, coluna2=$2'
            const columnString = columns.map((e, i) => `"${e}"=$${i + 1}`).join(', ');
            // console.log('columnString', columnString)
            // console.log('UPDATE ${ name } SET ${ columnString } WHERE id=$${columns.length+1}')
            // console.log(values)
        
            // res.send('foi: '+ columnString)
            client.query(
                `UPDATE "${ name }" SET ${ columnString } WHERE ddmidy=$${columns.length+1}`,
                values,
                (err, result) => {
                    console.log('result', result)
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

    // Helper Functions

// Get information from the postgres table schema, using the table's name and getting it's column's name, data type and maximum character length
function getTableInfo({ name }){
    return new Promise((resolve, reject) => {
        client.query(`SELECT column_name AS name, data_type AS type, character_maximum_length AS maxChar FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1`,
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