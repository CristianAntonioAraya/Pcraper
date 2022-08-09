const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://www.pcfactory.cl/notebooks?categoria=735&papa=636'

const getPcfactoryData = async () => {

    const products = []
    
    const $ = await axios.get( url )
        .then( res => { 
            const html = res.data;
            return cheerio.load( html )
        })

    // Product-title

    $('.product .product__heading .card-title').each(( index, el) => { 
        products.push( {id: index,  brand: $(el).text()}  )
    })

    // Product Name
    $('.product .p-relative .product__card-title').each( (index, el ) => {
        products.map( product => {
            if( product.id === index ) {
                product.productName = $(el).text()
            }
        })
    })

    //Product Price

    $('.product .product__price .product__price-texts .title-md').each( (index, el )=> {
        products.map( product => {
            if( product.id === index ) {
                product.price = $(el).html()
            }
        })
    })

    //Product img
    $('.product .product__image').find('img').each( (index, el )=> {
        products.map( product => {
            if( product.id === index ) {
                product.img = $(el).attr('src')
            }
        })
    })
    //Product link
    $('.product .product__heading ').find('a').each( (index, el )=> {
        products.map( product => {
            if( product.id === index ) {
                product.link = `https://www.pcfactory.cl${$(el).attr('href')}`
            }
        })
    })
    //product id
    $('.product .p-relative ').find('button').each( (index, el )=> {

        products.map( product => {
            if( product.id === index ) {
                product.id = $(el).attr('data-clipboard-text')
            }
        })
    })
    
    products.map( product => {

        const newProduct = {
            Brand: product.brand,
            Name: product.productName,
            Price: product.price,
            Img: product.img,
            Link: product.link,
            Page: 'PcFactory'

        };

        axios.post('http://localhost:8080/api/add', newProduct)
        .catch( err => console.log(err))

    })
}


module.exports = getPcfactoryData;