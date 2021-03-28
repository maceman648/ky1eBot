const mongoose = require('mongoose')
const reqString = {
    type: String,
    required: false
}
const testSchema = mongoose.Schema({
    _id: reqString,
    chanenelId: reqString,
    text: reqString
})  

module.exports = mongoose.model('testWrite', testSchema)