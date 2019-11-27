let jwt = require('jsonwebtoken');
let config = require('../config/config');

exports.login = (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        // For the given username fetch user from DB
        let mockedUsername = 'poonam';
        let mockedPassword = 'poonam123';
    
        if (username && password) {
          if (username === mockedUsername && password === mockedPassword) {
            let token = jwt.sign({username: username},
              config.secret,
              { expiresIn: '24h' // expires in 24 hours
              }
            );
            // return the JWT token for the future API calls
            res.json({
              success: true,
              message: 'Authentication successful!',
              token: token
            });
          } else {
            res.status(403).json({
              success: false,
              message: 'Incorrect username or password'
            });
          }
        } else {
          res.status(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
          });
        }
}