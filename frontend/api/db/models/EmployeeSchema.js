const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employeeSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    rollNo: {
        type: Number
    }
}, {
    collection: 'employees'
})

module.exports = mongoose.model('Employee', employeeSchema)