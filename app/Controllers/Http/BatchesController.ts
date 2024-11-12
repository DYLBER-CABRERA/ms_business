import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Batch from 'App/Models/Batch'
import BatchValidator from 'App/Validators/BatchValidator'

export default class BatchesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theBatch: Batch = await Batch.findOrFail(params.id)
            await theBatch.load("route")
            return theBatch;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Batch.query().paginate(page, perPage)
            } else {
                return await Batch.query()
            }
        }

    }

    public async create({ request }: HttpContextContract) {
        await request.validate(BatchValidator);
        const body = request.body();
        const theBatch: Batch = await Batch.create(body);
        await theBatch.load("route")
        return theBatch;
    }

    public async update({ params, request }: HttpContextContract) {
        const theBatch: Batch = await Batch.findOrFail(params.id);
        const body = request.body();
        theBatch.weight = body.weight;
        theBatch.route_id = body.route_id;
        theBatch.addre_route_orders_id = body.addre_route_orders_id;
        await theBatch.load("route")
        return await theBatch.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theBatch: Batch = await Batch.findOrFail(params.id);
        response.status(204);
        return await theBatch.delete();
    }
}

