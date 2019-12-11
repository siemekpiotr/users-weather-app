const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('./database.json');
const userdb = JSON.parse(fs.readFileSync('./database.json', 'UTF-8'));

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789';

const expiresIn = '1h';

// Create a token from a payload 
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token 
function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

// Check if the user exists in database
function isAuthenticated({email, password}){
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}

// Generate password
function generatePassword(){
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 10;
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return password;
}

// Send email
function sendEmail(email, password){
  console.log('Email send to ' + email + ' Message: ' + password);
}

// Register New User
server.post('/auth/register', (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  const {email, password, city, country, name, surname, admin} = req.body;

  if(isAuthenticated({email, password}) === true) {
    const status = 401;
    const message = 'Email and Password already exist';
    res.status(status).json({status, message});
    return;
  }

  fs.readFile("./database.json", (err, data) => {  
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({status, message});
        return;
      };

      // Get current users data
      var data = JSON.parse(data.toString());

      // Get the id of last user
      var last_item_id = data.users[data.users.length-1].id;

      //Add new user 
      data.users.push({id: last_item_id + 1, email: email, password: password, city: city, country: country, name: name, surname: surname, admin: admin ? true : false}); //add some data
      var writeData = fs.writeFile("./database.json", JSON.stringify(data, null, 2), (err, result) => {  // WRITE
          if (err) {
            const status = 401;
            const message = err;
            res.status(status).json({status, message});
            return;
          }
      });
  });

// Create token for new user
  const access_token = createToken({email, password});
  console.log("Access Token:" + access_token);
  res.status(200).json({access_token});
})

// Login to one of the users from ./database.json
server.post('/auth/login', (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const {email, password} = req.body;
  if (isAuthenticated({email, password}) === false) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({status, message});
    return;
  }
  const access_token = createToken({email, password});
  console.log("Access Token:" + access_token);
  res.status(200).json({access_token});
})

// get info about logged user
server.get('/userinfo', (req, res) =>{
  console.log("get users endpoint called");
  let userInfo = {email: null, admin: null, id: null};
  let verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);
  if(verifyTokenResult instanceof Error){ // check if token is valid
    const status = 401;
    const message = 'Access token not valid';
    res.status(status).json({status, message});
    return;
  }
  let {email} = verifyTokenResult;
  userdb.users.findIndex(user => {
    if(user.email === email){
      Object.assign(userInfo, user);
    }
  });
  res.status(200).json(userInfo);
})

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401;
    const message = 'Error in authorization format';
    res.status(status).json({status, message});
    return;
  }
  try {
    let verifyTokenResult;
     verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

    let {email} = verifyTokenResult;
    userdb.users.findIndex(user => {
      if(user.email === email && !user.admin){ //if user isn't admin
          const status = 401;
          const message = 'You do not have permissions to this endpoint';
          res.status(status).json({status, message});
          return;
      }
    });

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = 'Access token not provided';
      res.status(status).json({status, message});
      return;
    }
    next()
  } catch (err) {
    const status = 401;
    const message = 'Error access_token is revoked';
    res.status(status).json({status, message});
  }
})

server.use((req, res, next) => {
  if (req.method === 'POST') {
    if(req.body.password === ''){
      req.body.password = generatePassword();
      sendEmail(req.body.email, req.body.password);
    }
  }
  next();
})

server.use(router);

server.listen(8000, () => {
  console.log('Run Auth API Server');
})