
/**
 * 
 * Description: middleware para mostrar codigos de estado http, utilizando la libreria boom
 * 
 **/

export function boomErrorHandler(err, req, res, next){
    if(err.isBoom){//si el error es de tipo boom
        const {output} =err;
        res.status(output.statusCode).json(output.payload)
    }
    next(err);//sino ejecuta el siguiente middleware de tipo error
}

export function errorHandler(err, req, res, next){
    console.log('errorHandler');
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
}

