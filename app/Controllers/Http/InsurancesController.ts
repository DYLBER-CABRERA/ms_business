import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Insurance from 'App/Models/Insurance'
import InsuranceValidator from 'App/Validators/InsuranceValidator';
export default class InsurancesController {
    public async find({ request, params }: HttpContextContract) {
        //Buscar el elemento dado una condición 
        if (params.id) {
            let theInsurance: Insurance = await Insurance.findOrFail(params.id);
            await theInsurance.load("vehicles")
        

            return theInsurance;
          } else {
            const data = request.all();
            if ("page" in data && "per_page" in data) {
              const page = request.input("page", 1);
              const perPage = request.input("per_page", 20);
              return await Insurance.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
            } else {
              return await Insurance.query(); //es para que espere a la base de datos
            }
          }

    }

    public async create({ request }: HttpContextContract) {
        await request.validate(InsuranceValidator);
        const body = request.body();
        const theInsurance: Insurance = await Insurance.create(body);
        await theInsurance.load("vehicles")


       
        return theInsurance;
    }

    public async update({ params, request }: HttpContextContract) {
        const theInsurance: Insurance = await Insurance.findOrFail(params.id);
        const body = request.body();
        theInsurance.insurance_type =body.insurance_type;
        theInsurance.start_date = body.start_date;
        theInsurance.end_date = body.end_date;
        theInsurance.insurance_company = body.insurance_company;
        theInsurance.vehicle_id = body.vehicle_id;
        return await theInsurance.save();
    }

       
    public async delete({ params, response }: HttpContextContract) {
      const theInsurance: Insurance = await Insurance.findOrFail(params.id);
         await theInsurance.delete();
         return response.status(204).json({message: "Seguro eliminado con éxito"});
  }
  
}
