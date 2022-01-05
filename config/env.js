const ENV = process.env

module.exports = {
    DATABASE_URL : ENV.DATABASE_URL,
    JWT_SECRET : ENV.JWT_SECRET,
    PORT : ENV.PORT
}
