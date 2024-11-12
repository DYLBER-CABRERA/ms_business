import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory'
import ProductCategoryValidator from '../../Validators/ProductCategoryValidator';

export default class ProductCategoriesController {
    public async find({ request, params }: HttpContextContract) {
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
                return await ProductCategory.query().paginate(page, perPage)
            } else {
                return await ProductCategory.query()
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
        await theProductCategory.load("category")
        await theProductCategory.load("product")
        return await theProductCategory.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theProductCategory: ProductCategory = await ProductCategory.findOrFail(params.id);
        await theProductCategory.delete();
        return response.status(200).json({
            message: 'Categoría de producto eliminada con éxito',
        });
    }
}
