const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express();
const dotenv = require('dotenv');

dotenv.config();
require('./config/passport')(passport);

const authController = require('./controllers/authController');

const mainRoutes = require('./routes/mainRoutes');
const adminRoutes = require('./routes/adminRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const detalhesRoutes = require('./routes/detalhesRoutes');
const buscarRoutes = require('./routes/buscarRoutes');
const vendedorRoutes = require('./routes/vendedorRoutes');

//Configurações
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Variável global de sessão
app.use((req, res, next) => {
    res.locals.currentRoute = req.path;
    res.locals.user = req.user || null;
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');
    res.locals.error = req.flash('error');
    next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

//Estilos
app.use(express.static('public'));

//Rotas principais
app.use('/', mainRoutes);
app.use('/', adminRoutes);
app.use('/', clienteRoutes);
app.use('/', detalhesRoutes);
app.use('/', buscarRoutes);
app.use('/', vendedorRoutes);
//Rotas de autenticação
app.get('/login', authController.showLogin);
app.post('/login', authController.login);
app.get('/logout', authController.logout);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na port ${PORT}`);
})
