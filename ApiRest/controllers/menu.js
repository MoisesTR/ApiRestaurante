const { mssqlErrors }   = require('../Utils/util');
const { matchedData }   = require('express-validator/filter');
const MenuModel         = require('../models/Menu');

function createMenu(req, res) {
    const menuData = matchedData(req, { locations: 'body' });

    MenuModel.createMenu( menuData )
    .then((result) => {
        res.status(200)
            .json({success: 'Menu creado con exito'})
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err))
    })
}

function updateMenu(req, res) {
    const menuData = matchedData(req, { locations: 'body' });

    MenuModel.updateMenu( menuData )
    .then((result) => {
        res.status(200)
            .json({success: 'Menu editado con exito!'})
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err))
    })
}

// function getMenus(req, res) {
//     let data = matchedData(req);
    
    
//     .then((result) => {
//         var jsonString = result.recordset[0];
//         console.log(jsonString);
//         jsonString.Menues = JSON.parse(jsonString.Menues);
//         res.status(200).json(jsonString)
//     }).catch((err) => {
//         console.log(err)
//         res.status(500).json(err)
//     })
// }

function getMenuesByRol(req, res) {
    const data = matchedData(req,{locations:['query','params']});
    
    MenuModel.getMenuesByRol( data.IdRol )
    .then((result) => {
        // console.log(result.recordset[0]);
        
        // var jsonString = result.recordset[0];
        // jsonString = JSON.parse(jsonString['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']);
        res.status(200).json(result.recordset[0])
    }).catch((err) => {
        console.log(err)
        res.status(500).json(err)
    })
}
module.exports = {
    // getMenus,
    createMenu,
    updateMenu, 
    getMenuesByRol
}