const { Schema, model } = require('mongoose');

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: { // voy a guard el ID del user
        type: String,
        required: true
    },


}, { timestamps: true }); //cada vez que creo un modelo, le agrega por defecto 2 propiedades; createdAt y updatedAt.

module.exports = model('Note', NoteSchema);
