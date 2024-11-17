import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Company from 'App/Models/Company'
import CompanyValidator from 'App/Validators/CompanyValidator';

export default class CompaniesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCompany: Company = await Company.findOrFail(params.id)
            await theCompany.load('NaturalPeople')
            return theCompany;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Company.query().paginate(page, perPage)
            } else {
                return await Company.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(CompanyValidator);
        const body = request.body();
        const theCompany: Company = await Company.create(body);
        await theCompany.load('NaturalPeople')
        return theCompany;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCompany: Company = await Company.findOrFail(params.id);
        const body = request.body();
        theCompany.company_type = body.company_type;
        theCompany.fiscal_address = body.fiscal_address;
        theCompany.client_id = body.client_id
        await theCompany.load('NaturalPeople')
        return await theCompany.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCompany: Company = await Company.findOrFail(params.id);
        await theCompany.delete();
        return response.status(200).json({
            message: 'Compañía eliminada con éxito',
        });
    }

}
