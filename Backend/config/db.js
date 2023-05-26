const mongoose = require('mongoose');

let connection=mongoose.connect('mongodb+srv://raj:raj@cluster0.ci4ufma.mongodb.net/PramataChatApp?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })

module.exports={
    connection
}