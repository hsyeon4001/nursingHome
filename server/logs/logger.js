const { createLogger, format, transports } = require("winston");
const path = require("path");

const logger = createLogger({
    level: "info",
    format: format.json(),
    transports: [
        new transports.File({ filename: path.join(__dirname, "combined.log") }),
        new transports.File({ filename: path.join(__dirname, "error.log"), level: "error" })
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(new transports.Console({ foramt: format.simple() }));
}

module.exports = logger;