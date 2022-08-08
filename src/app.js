const express = require('express') ;
const cors = require('cors');
const morgan = require('morgan'); 


const app = express();

//settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//routes
app.get('/', ( req, res ) => { res.json({ ok: 'true', msg: 'Server ready'}) })

module.exports = app;