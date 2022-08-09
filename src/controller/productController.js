const productModel = require('../models/productModel');


const getProductData = async ( req, res ) => {
    try {
        
        const products = await productModel.find()

        res.json({
            ok: true,
            products
        })  

    } catch ( error ) {
        console.log(error)
        res.status(500).json({ 
        ok: false,
        msg: 'Internal server error' })
    }
}

const postNewProduct = async (req, res ) => {

    const {  Brand, Name , Price, Img, Link, Page } = req.body;
    const addProduct = { Brand, Name , Price, Img, Link, Page } 

    try {

        const uploadProduct = await productModel.find( { Brand, Name , Price, Img, Link, Page } )

        if( uploadProduct.length !== 0  ){
            return res.status(201).json({
                ok: true,
                msg: 'Product Already Uploaded',
                uploadProduct
            })
        }

        const product = new productModel( addProduct )

        await product.save()
    
        res.json({
            ok: true,
            msg: 'Product add',
        })  

    } catch ( error ) {
        console.log(error)
        res.json({ 
        ok: false,
        msg: 'Internal server error' })
    }
}

module.exports = { getProductData, postNewProduct }