import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contracts from 'App/Models/Contracts';


export default class ContractsController {
    public async find({ request, params }: HttpContextContract) {
        //Buscar el elemento dado una condición 
        if (params.id) {
            let theContracts: Contracts = await Contracts.findOrFail(params.id)
            return theContracts;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Contracts.query().paginate(page, perPage)
            } else {
                return await Contracts.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theContracts: Contracts = await Contracts.create(body);
        return theContracts;
    }

    public async update({ params, request }: HttpContextContract) {
        const theContracts: Contracts = await Contracts.findOrFail(params.id);
        const body = request.body();
        theContracts.start_date = body.start_date;
        theContracts.end_date = body.end_date;
        theContracts.client_id = body.client_id;
        return await theContracts.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theContracts: Contracts = await Contracts.findOrFail(params.id);
            response.status(204);
            return await theContracts.delete();
    }
}
