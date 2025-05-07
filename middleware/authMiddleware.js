const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    console.log('token inside auth', token);

    if (token) {
        jwt.verify(token, 'current secret', (err, decodedToken) => {
            if (err) {
                console.log('error found: ', err.message);
                res.status(401).json({ message: 'Unauthorized' });
            } else {
                console.log('user approved')
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}


const extractUsername = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'current secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(401).json({ message: 'Unauthorized' });
            } else {
                req.email = decodedToken.email; // Assuming the token contains the username
                console.log('here is the email', req.email);
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { requireAuth, extractUsername };