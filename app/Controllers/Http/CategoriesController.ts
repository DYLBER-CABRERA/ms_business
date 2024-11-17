import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CategoryValidator from 'App/Validators/CategoryValidator'


export default class CategoriesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCategory: Category = await Category.findOrFail(params.id)
            await theCategory.load("parent") //Relación con la categoria padre
            await theCategory.load("subCategories") //Relación con las subcategorias
            return theCategory;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                const category = await Category.query().paginate(page, perPage)
                return category
            } else {
                return await Category.query()
            }
        }
    }
    public async create({ request }: HttpContextContract) {
        await request.validate(CategoryValidator);//Validacion de los datos para la creacion
        const body = request.body();
        const theCategory: Category = await Category.create(body);
        await theCategory.load("parent")
        await theCategory.load("subCategories")
        return theCategory;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCategory: Category = await Category.findOrFail(params.id);
        const body = request.body();
        theCategory.name = body.name;
        theCategory.description = body.description;
        theCategory.parentCategory = body.parentCategory;
        await theCategory.load("parent")
        await theCategory.load("subCategories")
        await theCategory.save();
        return theCategory
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCategory: Category = await Category.findOrFail(params.id);
        await theCategory.delete();
        return response.status(200).json({
            message: 'Categoría eliminada con éxito',
        });
    }
}
