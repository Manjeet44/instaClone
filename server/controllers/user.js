const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function createToken(user, SECRET_KEY, expiresIn) {
    const {id, name, email, username} = user;
    const payload = {
        id,
        name,
        email,
        username
    };
    return jwt.sign(payload, SECRET_KEY, {expiresIn});
}

async function register(input) {
    const newUser = input;
    newUser.email = newUser.email.toLowerCase();
    newUser.username = newUser.username.toLowerCase();

    const {email, username, password} = newUser;

    //Revisamos si el email esta en uso
    const foundEmail = await User.findOne({email});
    const foundUser = await User.findOne({username});
    if(foundEmail) throw new Error('Este email ya esta registrado');
    if(foundUser) throw new Error('Este nombre de usuario ya esta registrado');

    //Encriptar password
    const salt = await bcryptjs.genSaltSync(10);
    newUser.password = await bcryptjs.hash(password, salt);

    try {
        const user = new User(newUser);
        user.save();
        return user;
    } catch (error) {
        console.log(error)
    }
}

async function login(input) {
    const {email, password} = input;
    const userFound = await User.findOne({email: email.toLowerCase()});
    if(!userFound) throw new Error('Error en el email o password');

    const passwordSucces = await bcryptjs.compare(password, userFound.password);
    if(!passwordSucces) throw new Error('Error en el email o password');

     

    return {
        token: createToken(userFound, process.env.SECRET_KEY, "24h")
    }
}
    module.exports = {
        register,
        login
    }