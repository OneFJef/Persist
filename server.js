const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

const sequelize = require('./config/connection');
const { auth } = require('express-openid-connect');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create();


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET_KEY,
  baseURL: 'https://ancient-ravine-93786.herokuapp.com' || 'http://localhost:3001',
  clientID: 'NOlcPn22ZIK5NqyWdor03o61uJfSh72X',
  issuerBaseURL: 'https://dev-cx6ypp69.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port:${PORT}`));
});
