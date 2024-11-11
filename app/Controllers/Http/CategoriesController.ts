import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CategoryValidator from 'App/Validators/CategoryValidator'


export default class CategoriesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCategory: Category = await Category.findOrFail(params.id)
            await theCategory.load("parent")
            return theCategory;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Category.query().paginate(page, perPage)
            } else {
                return await Category.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(CategoryValidator);//valida el request con el CategoryValidator
        const body = request.body();//toma la carta, lee el cuerpo del la carta y lo agrega a la variable body
        const theCategory: Category = await Category.create(body);//await es esperando dentro del hilo a que la clase Category la cual es el modelo del metodo creat de fetch y tendra el body la cual tiene el location y la capacidad y lo colocamos en la variable theAdress de tipo Category
        await theCategory.load("parent")
        return theCategory;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCategory: Category = await Category.findOrFail(params.id);
        const body = request.body();
        theCategory.name = body.name;
        theCategory.description = body.description;
        theCategory.parentCategory = body.parentCategory;
        return await theCategory.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCategory: Category = await Category.findOrFail(params.id);
        response.status(204);
        return await theCategory.delete();
    }
}
