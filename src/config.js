//
//
require('dotenv').config()

let CF = {
    app: {
        name: "MERN-project-tracking",
        version: "0.0.1"
    },
    server: {
        port: 5154,
        apiPath: '/api',
        ENV: 'development'
    },
    // mongodb setting
    mongoose: {
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        // url : 'mongodb+srv://wamoo:wamoo@devconnector.jdg80.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        url : 'mongodb://127.0.0.1:27017/MERN-project-tracking'
    },
    authentication_token_name: 'accessToken',
    jwt: {
       saltLength: 10,
       secret_str : "this-auth-token",
       token_exp:  60 * 60 // 60 minutes
    },
    frontEnd: {
        path: '/client_react/build'
    },
    model : {
        user: {
            register_state: true,
            automated_active: true
        }
    }
}

CF.server.ENV = process.env.ENV || CF.server.ENV
CF.server.port = process.env.PORT || CF.server.port
CF.jwt.saltLength =  process.env.saltLength || CF.jwt.saltLength
CF.jwt.secret_str =  process.env.secret_str || CF.jwt.secret_str
CF.jwt.token_exp =  process.env.token_exp || CF.jwt.token_exp


module.exports = CF
