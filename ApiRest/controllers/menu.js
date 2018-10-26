const { mssqlErrors }   = require('../Utils/util');
const { matchedData }   = require('express-validator/filter');
const MenuModel         = require('../models/Menu');
const Menu              = new MenuModel();

function createMenu(req, res) {
    var menuData = matchedData(req, { locations: 'body' });

    Menu.createMenu( menuData )
    .then((result) => {
        res.status(200)
            .json({success: 'Menu creado con exito'})
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err))
    })
}

function updateMenu(req, res) {
    var menuData = matchedData(req, { locations: 'body' });

    Menu.updateMenu( menuData )
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
    let data = matchedData(req,{locations:['query','params']});
    
    Menu.getMenuesByRol( data.IdRol )
    .then((result) => {
        var jsonString = result.recordset[0];
        jsonString = JSON.parse(jsonString['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']);
        res.status(200).json(jsonString)
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