import { createLogger, format, transports} from 'winston'

const d_t = new Date();
let year = d_t.getFullYear();
let month = d_t.getMonth();
let day = d_t.getDate();
const finalDate = `${year}-${month}-${day}`


export const logger = createLogger({
    // le damos formato al json para q sea legible tanto en el log como en la consola y guaradmos en q momento se guardo ese log
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(info => ` [${info.timestamp}] \n Level: ${info.level} \n Message: ${info.message} \n`)
    ),

    transports: [ 
        // configuramos winston para guardar los logs en un archivo
        new transports.File({
            // maxsize: 512000, // peso maximo del archivo (es en byte)
            // maxFiles: 5, // cuando haya 5 archivos se elimina el 1ero que se creo
            filename: `${__dirname}/../logs/logs-${finalDate}.log`, // dir donde se va a depositar el log y nombre
        }),

        // configuramos logger de consola
    new transports.Console({
            level: 'info', // hay diferentes niveles
            //format: format.combine(format.simple()) // le damos formato al json para q sea legible en la consola
        })
    ]
  });