const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url =
  "mongodb://127.0.0.1:27017/mydatabase"; //
let mong = mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
