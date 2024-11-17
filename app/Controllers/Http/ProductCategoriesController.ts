import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory'
import ProductCategoryValidator from '../../Validators/ProductCategoryValidator';

export default class ProductCategoriesController {
    public async find({ request, params }: HttpContextContract) {
        //Buscar el elemento dado una condición 
        if (params.id) {
            let theProductCategory: ProductCategory = await ProductCategory.findOrFail(params.id)
            await theProductCategory.load("category")
            await theProductCategory.load("product")
            return theProductCategory;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await ProductCategory.query().preload("category").preload("product").paginate(page, perPage)
            } else {
                return await ProductCategory.query().preload("category").preload("product")
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(ProductCategoryValidator);
        const body = request.body();
        const theProductCategory: ProductCategory = await ProductCategory.create(body);
        await theProductCategory.load("category")
        await theProductCategory.load("product")
        return theProductCategory;
    }

    public async update({ params, request }: HttpContextContract) {
        const theProductCategory: ProductCategory = await ProductCategory.findOrFail(params.id);
        const body = request.body();
        theProductCategory.category_id = body.category_id;
        theProductCategory.product_id = body.product_id;
        return await theProductCategory.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theProductCategory: ProductCategory = await ProductCategory.findOrFail(params.id);
        response.status(204);
        return await theProductCategory.delete();
    }
}
