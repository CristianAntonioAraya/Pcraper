const express = require('express') ;
const cors = require('cors');
const morgan = require('morgan'); 
const getPcfactoryData = require('./utils/getPcfactoryData');

const app = express();

//settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


//routes
app.get('/', ( req, res ) => { res.json({ ok: 'true', msg: 'Server ready'}) })
app.use('/api', require('./routes/productRoutes'))

//populate data base with actual data

getPcfactoryData()

module.exports = app;