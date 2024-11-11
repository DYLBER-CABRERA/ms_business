import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';
import ProductValidator from 'App/Validators/ProductValidator';

export default class ProductsController {
    public async find({ request, params }: HttpContextContract) {
        //Buscar el elemento dado una condición 
        if (params.id) {
            let theProduct: Product = await Product.findOrFail(params.id)
            await theProduct.load("batch")
            await theProduct.load("client")
            return theProduct;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Product.query().paginate(page, perPage)
            } else {
                return await Product.query()
            }
        }

    }

    public async create({ request }: HttpContextContract) {
        await request.validate(ProductValidator);
        const body = request.body();
        const theProduct: Product = await Product.create(body);
        await theProduct.load("batch")
        await theProduct.load("client")
        return theProduct;
    }

    public async update({ params, request }: HttpContextContract) {
        const theProduct: Product = await Product.findOrFail(params.id);
        const body = request.body();
        theProduct.name = body.name;
        theProduct.description = body.description;
        theProduct.expiration_date = body.expiration_date;
        theProduct.client_id = body.client_id;
        theProduct.batch_id = body.batch_id;
        return await theProduct.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theProduct: Product = await Product.findOrFail(params.id);
        response.status(204);
        return await theProduct.delete();
    }
}
