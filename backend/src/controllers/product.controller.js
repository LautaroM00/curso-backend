import ResponseBuilder from "../helpers/builders/ResponseBuilder.js";
import ProductRepository from "../repositories/product.repository.js";


const getAllProductsController = async (req, res) => {
    try{
    const products = await ProductRepository.getAllProducts()

    const response = new ResponseBuilder()
    .setCode('PRODUCTS_RECEIVED_SUCCESS')
    .setMessage('Productos recibido con éxito.')
    .setOk(true)
    .setStatus(200)
    .setPayload(
        {
            products: products
        }
    )
    .build()
    res.json(response)
    }
    catch(err){
        res.json(err.message)
    }
}


const getProductByIdController = async (req, res) => {
    try{
        const { product_id } = req.params
        const product = await ProductRepository.getProductById(product_id)
        
        const response = new ResponseBuilder()
        .setCode('PRODUCT_RECEIVED_SUCCESS')
        .setMessage('Producto recibido con éxito.')
        .setOk(true)
        .setStatus(200)
        .setPayload(
            {
                products: product
            }
        )
        .build()
        res.json(response)
        }
        catch(err){
            res.json(err.message)
        }
}
const createProductController = async (req, res) => {
    try{
        const newProduct = req.body
        const product = await ProductRepository.createProduct(newProduct)
    
        const response = new ResponseBuilder()
        .setCode('PRODUCT_CREATED_SUCCESS')
        .setMessage('Producto creado con éxito.')
        .setOk(true)
        .setStatus(200)
        .setPayload(
            {
                product_created: product
            }
        )
        .build()
        res.json(response)
        }
        catch(err){
            res.json(err.message)
        }
}
const updateProductController = async (req, res) => {
    try{
        const { product_id } = req.params
        const updated_data = req.body

        const productToUpdate = await ProductRepository.getProductById(product_id)
        await ProductRepository.updateProduct(product_id, updated_data)

        const response = new ResponseBuilder()
        .setCode('PRODUCT_UPDATE_SUCCESS')
        .setMessage('Producto actualizado con éxito.')
        .setOk(true)
        .setStatus(200)
        .setPayload({
            oldProduct: productToUpdate,
            newProduct: updated_data
        })
        .build()
    
        res.json(response)
    }
    catch(err){
        res.json(err.message)
    }
}
const deleteProductController = async (req, res) => {
    try{
        const { product_id } = req.params
        console.log(product_id)

        await ProductRepository.deleteProduct(product_id)

        const response = new ResponseBuilder()
        .setCode('PRODUCT_DELETE_SUCCESS')
        .setMessage('Producto eliminado con éxito.')
        .setOk(true)
        .setStatus(200)
        .build()
        res.json(response)

    }
    catch(err){
        res.json(err.message)
    }
}

export { deleteProductController, createProductController, getAllProductsController, getProductByIdController, updateProductController}