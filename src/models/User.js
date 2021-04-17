const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },    // Vamos a encriptar la contrasena para no guardarla TAL CUAL en la base de datos.

}, { timestamps: true });

UserSchema.methods.encryptPassword = async password => { // Creo un metodo de mi clase userSchema
    const salt = await bcrypt.genSalt(10) // genero el Salt. Mientras mayor sea el parametro, mas seguro sera, pero tendra mayor peso en el servidor y tardara mas.
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


module.exports = model('User', UserSchema);