const {mssqlErrors, matchedData} = require('../../Utils/defaultImports');
const  UnidadMedidaModel = require('../../models/catalogos/UnidadMedida')
const  { Habilitado}    = require( '../../Utils/validations/genericValidations');
const   UnidadMedida    = new UnidadMedidaModel();

exports.getUnidadById = (req,res) => {
    const data = req.params;
   
    UnidadMedida.getUnidadById( data.IdUnidadMedida ) 
    .then((results) => {
        res.status(200)
            .json({
                unidadmedida:results.recordset[0]
            }) 
    }).catch((err) => {
        res.status(500)
            .json( mssqlErrors(err) );
    });
}

exports.getUnidadesMedida = (req, res) => {
    const data    = matchedData(req, {locations:['query']})

    UnidadMedida.getUnidadesMedida( data )
    .then((results) => {
        res.status(200)
            .json({unidadesmedida:results.recordset}) 
    }).catch((err) => {
        res.status(500)
            .json( mssqlErrors(err) );
    });
}

exports.createUnidadMedida = (req, res) => {
    const data = matchedData(req);
    
    UnidadMedida.createUnidadMedida( data )
    .then((results) => {
        res.status(201)
            .json(results.recordset[0])
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}

exports.updateUnidadMedida = (req, res) => {
    const data = matchedData(req);

    UnidadMedida.updateUnidadMedida( data )
    .then((results) => {
        let afectadas = results.rowsAffected[0];
        res.status(200).json((afectadas > 0) ? { success: 'Unidad de Medida actualizada con exito!' } : { failed: 'No se encontro actualizo la unidad de medida solicitado!' })
    }).catch((err) => {
        res.status(500).json( mssqlErrors(err) );
    })
}

exports.changeStateUnidadMedida = (req, res) => {
    let data = matchedData(req, {locations:['query','params','body']});

    UnidadMedida.changeStateUnidadMedida( data.IdUnidadMedida, Habilitado )
    .then((results) => {
        console.log(results)
        let afectadas = results.rowsAffected[0];
        let accion = (data.Habilitado == false) ? 'Deshabilitada' : 'Habilitada';
        res.status(200).json((afectadas > 0) ? { success: 'Unidad de Medida ' + accion + ' con exito!' } : { failed: 'No se encontro la unidad de medida solicitada!' })
    }).catch((err) => {
        res.status(500).json(mssqlErrors(err));
        console.log('Error:', err)
    });
}