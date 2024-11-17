import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Quota from 'App/Models/Quota'
import QuotaValidator from 'App/Validators/QuotaValidator';

export default class QuotasController {
    public async find({ request, params }: HttpContextContract) {
        //Buscar el elemento dado una condición 
        if (params.id) {
            let theQuota: Quota = await Quota.findOrFail(params.id);
            
            await theQuota.load("contracts")
            await theQuota.load("invoice")

            return theQuota;
          } else {
            const data = request.all();
            if ("page" in data && "per_page" in data) {
              const page = request.input("page", 1);
              const perPage = request.input("per_page", 20);
              return await Quota.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
            } else {
              return await Quota.query(); //es para que espere a la base de datos
            }
          }

    }

    public async create({ request }: HttpContextContract) {
        await request.validate(QuotaValidator);
        const body = request.body();
        const theQuota: Quota = await Quota.create(body);
        await theQuota.load("contracts")
        await theQuota.load("invoice")

       
        return theQuota;
    }

    public async update({ params, request }: HttpContextContract) {
        const theQuota: Quota = await Quota.findOrFail(params.id);
        const body = request.body();
        theQuota.amount =body.amount;
        theQuota.interest_rate = body.interest_rate;
        theQuota.due_date = body.due_date;
        theQuota.status = body.status;
        theQuota.contract_id = body.contract_id;
        return await theQuota.save();
    }
    
 public async delete({ params, response }: HttpContextContract) {
        const theQuota: Quota = await Quota.findOrFail(params.id);
          await theQuota.delete();
          return response.status(204).json({message: "Cuota eliminada con éxito"});
    }
    
}
