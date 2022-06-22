const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;



function devLogger(){
    const myFormat = printf(({ level, message, timestamp }) => {
        return `${timestamp} ${level} ${message}`;
      })
return createLogger({
  level:'error',
    format:combine(format.colorize(),
    timestamp(),myFormat),
    transports: [
     new transports.Console()
    ],level:'warn',
    format:combine(format.colorize(),
    timestamp(),myFormat),
    transports: [
     new transports.Console()
    ],level:'info',
    format:combine(format.colorize(),
    timestamp(),myFormat),
    transports: [
     new transports.Console()
    ],level:'verbose',
    format:combine(format.colorize(),
    timestamp(),myFormat),
    transports: [
     new transports.Console()
    ],level:'debug',
    format:combine(format.colorize(),
    timestamp(),myFormat),
    transports: [
     new transports.Console()
    ],level:'silly',
    format:combine(format.colorize(),
    timestamp(),myFormat),
    transports: [
     new transports.Console()
    ]
  })
}

module.exports=devLogger();