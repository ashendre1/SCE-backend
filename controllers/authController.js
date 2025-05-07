const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id, email) => {
    return jwt.sign({ id, email }, 'current secret', {
        expiresIn: maxAge
    });
}

module.exports.signup = async (req, res) => {
    const {email, password} = req.body;
    console.log('signup', email, password);
    try {
        //const user = await User.create({email, password});
        const user = await User.findOne({email});
        if(user) {
            res.status(400).send('email already exists');
        } else {
            const user = await User.create({email, password});
            res.status(201).json({user: user._id});
        }
    }
    catch(err) {
        res.status(400).send('error: ${err}');
    }
}

module.exports.login = async (req, res) => {
    const {email, password} = req.body;
    console.log('login', email, password);
    try {
        const user = await User.findOne({email});
        if(user) {
            const auth = await bcrypt.compare(password, user.password);
            if(auth) {
                const token = createToken(user._id, email);
                res.cookie('jwt', token, { httpOnly: true, secure: false, sameSite: 'Lax', maxAge: maxAge * 1000 });
                res.status(200).json({user: user._id});
            }
            else {
                res.status(400).send('incorrect password');
            }
        } else {
            res.status(400).send('email not found');
        }
    } catch(err) {
        res.status(400).send('error: ${err}');
    }
    
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    console.log('logged out');
    res.status(200).json({message: 'logged out'});
}
