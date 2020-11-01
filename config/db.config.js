const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' })
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) console.log("DB Connection Established!")
    else console.log("DB Connection Error! " + err)
})

module.exports = mongoose