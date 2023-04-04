import express from "express";
import ProductManager from "./managers/productManager.js";

const PORT = 8080;
const productManager = new ProductManager();
const app = express();
app.use(express.urlencoded({extended:true}));
app.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: '+PORT);
})
app.get('/products', async (req, res)=>{
    const products = await productManager.getProducts();
    const limit = parseInt(req.query.limit);
    if (limit){
        const productNumber = products.slice(0, limit);
        return res.send(productNumber);
    }else{
        return res.send(products);
    }
})
app.get('/product/:id', async (req, res)=>{
    const id = req.params.id;
    const product = await productManager.getProductById(id);
    res.send(product);
})