const {matchedData, mssqlErrors, existParam} = require('../Utils/defaultImports')
let CategoriaModel = require('../models/Categoria');
let Categoria = new CategoriaModel();

function createCategoria(req,res){ 
    let data = matchedData(req)

    Categoria.createCategoria( data.NombCategoria, data.DescCategoria )
    .then((results) => {
        res.status(200)
            .json(results.recordset[0])
    }).catch((err) => {
        res.status(500)
            .json( mssqlErrors(err) );
        // res.status(500).json( err );
    })
}
function getCategorias(req,res){
    let data    = matchedData(req, {locations:['query']});

    Categoria.getCategorias( data )
    .then((results) => {
        res.status(200).json({
            categorias:results.recordset
        })
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function updateCategoria(req,res){
    let data = matchedData(req,{locations: ['body','params']});
    
    Categoria.updateCategoria( data )
    .then((results) => {
        let afectadas = results.rowsAffected[0];
        res.status(200).json((afectadas > 0) ? { success: 'Categoria modificada con exito!' } : { failed: 'No se encontro la Categoria solicitada!' })
    
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function getCategoriaById(req,res){
    let data = req.params;

    Categoria.getCategoriaById( data.IdCategoria )
    .then((results) => {
        res.status(200).json({categoria:results.recordset[0]}) 
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    });
}
function changeStateCategoria(req,res){
    let data    = matchedData(req,{locations:['body','params']});
    
    console.log(data)
    Categoria.changeStateCategoria( data.IdCategoria, data.Habilitado)
    .then((results) => {
        let afectadas = results.rowsAffected[0]
        let accion = (data.Habilitado == 0) ? 'Deshabilitada' : 'Habilitada';
        res.status(200).json((afectadas > 0) ? { success: 'Categoria ' + accion + ' con exito!' } : { failed: 'No se encontro la categoria solicitado!' })
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
        console.log('Error:', err)
    });
}
module.exports={
    createCategoria,
    getCategoriaById,
    getCategorias,
    updateCategoria,
    changeStateCategoria
}