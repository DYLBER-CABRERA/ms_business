import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Quota from 'App/Models/Quota'
import QuotaValidator from 'App/Validators/QuotaValidator';
import { rules, schema } from '@ioc:Adonis/Core/Validator'

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
            console.log(data);
                        
                        if("contract_id" in data){
                            return await Quota.query().where("contract_id", request.input("contract_id"))
                        }
            else if ("page" in data && "per_page" in data) {
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

      public async createForContract({ params, request, response }: HttpContextContract) {
            const contract_id = parseInt(params.contract_id, 10)
            
            // Preparar los datos de validación
            const body = request.body()
            const quotaData = {
                ...body,
                contract_id: contract_id
            }
                  // Llamar a la función de validación
            await this.validateQuotaData(request, quotaData);
           
            
            const theQuota: Quota = await Quota.create(quotaData)
            await theQuota.load("contracts")
        await theQuota.load("invoice")
            return response.status(201).json(theQuota)
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
    
    private async validateQuotaData(request: HttpContextContract['request'], data: any) {
      const validationSchema = schema.create({
        amount: schema.number([rules.required(),// Asegura que el campo no esté vacío
          rules.unsigned(), // Asegura que la cantidad sea un número entero positivo y no negativo
          rules.range(10000, 2500000) // Asegura que la cantidad esté entre 1 y 1000000
        ]),
        
    
        interest_rate: schema.number([rules.required(),
          rules.unsigned(), // Asegura que la tasa de interés sea un número entero positivo y no negativo
          rules.range(1, 100) // Asegura que la tasa de interés esté entre
        ]),
    
        due_date: schema.date({ format: 'yyyy-MM-dd'}, [
          rules.required(),
          rules.after('today') // Asegura que la fecha de vencimiento sea posterior a la fecha actual,
        ]),
        status: schema.boolean([
          rules.required()// Asegura que el campo no esté vacío
          
        ]),
        contract_id: schema.number(
          [rules.exists({ table: 'contracts', column: 'id' }),
          rules.unsigned(),// Asegura que el ID del contrato no sea negativo
          rules.required(),// Asegura que el campo no esté vacío
       /*    rules.unique({ table: 'quotas', column: 'contract_id' }) // Asegura que el contract_id sea único */
        ]
        ),
    
      })

      // Usamos request.validate para validar los datos
      return await request.validate({
          schema: validationSchema,
          data
      });
  }
}
