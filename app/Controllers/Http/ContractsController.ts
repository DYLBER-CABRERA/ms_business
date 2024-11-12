import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contract from 'App/Models/Contract';
import ContractValidator from 'App/Validators/ContractValidator';


export default class ContractController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theContract: Contract = await Contract.findOrFail(params.id)

            await theContract.load('routes') 
            await theContract.load("quotas")
            await theContract.load("routes")

            return theContract;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Contract.query().paginate(page, perPage)
            } else {
                return await Contract.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(ContractValidator)
        const body = request.body();
        const theContract: Contract = await Contract.create(body);
        await theContract.load("quotas")
        await theContract.load("routes")
        return theContract;
    }

    public async update({ params, request }: HttpContextContract) {
        const theContract: Contract = await Contract.findOrFail(params.id);
        const body = request.body();
        theContract.start_date = body.start_date;
        theContract.end_date = body.end_date;
        theContract.client_id = body.client_id;
        return await theContract.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theContract: Contract = await Contract.findOrFail(params.id);
        await theContract.delete();
        return response.status(200).json({
            message: 'Contrato eliminado con éxito',
        });
    }
}
