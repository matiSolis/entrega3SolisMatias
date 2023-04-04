import fs from 'fs';

const path ='./src/files/products.json';

export default class ProductManager {
    getProducts = async ()=>{
        if(fs.existsSync(path)){
            const data = await fs.promises.readFile(path, 'utf-8');
            const products = JSON.parse(data);
            return products;
        }else{
            return [];
        }
    }
    addProduct = async (product) =>{
        const products = await this.getProducts();
        let id = products.length;
        product.id = ++id;
        products.push(product);
        await fs.promises.writeFile(path, JSON.stringify(products,null,'\t'));
        return products;
    }
    getProductById = async (id) =>{
        const products = await this.getProducts();
        const product = products.filter((product) =>{
            return product.id == id;
        });
        return product;
    }
    deleteProduct = async(id)=>{
        const findProd = await this.getProducts();
        const delProd = findProd.filter(prod => prod.id != id);
            console.log('Producto eliminado');

        await fs.promises.writeFile(path, JSON.stringify(delProd, null,'\t'));
    }
    updateProduct = async ({id,...product}) =>{
        await this.deleteProduct(id);
        let oldProduct = await this.getProducts();
        let productUpdate = [{...product, id},...oldProduct];
        await fs.promises.writeFile(path, JSON.stringify(productUpdate, null, '\t'));
        console.log (productUpdate);
    }
}