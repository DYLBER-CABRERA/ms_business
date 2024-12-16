import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Batch from "App/Models/Batch";
import BatchValidator from "App/Validators/BatchValidator";
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class BatchesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theBatch: Batch = await Batch.findOrFail(params.id);
      await theBatch.load("route");
      return theBatch;
    } else {
      const data = request.all();
      console.log(data);

      if ("route_id" in data) {
        return await Batch.query().where("route_id", request.input("route_id"));

      } else if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Batch.query().paginate(page, perPage);
      } else {
        return await Batch.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(BatchValidator);
    const body = request.body();
    const theBatch: Batch = await Batch.create(body);
    await theBatch.load("route");
    return theBatch;
  }

  
      public async createForRoute({ params, request, response }: HttpContextContract) {
          const route_id = parseInt(params.route_id, 10)
          
          // Preparar los datos de validación
          const body = request.body()
          const batchData = {
              ...body,
              route_id: route_id
          }
                // Llamar a la función de validación
          await this.validateBatchData(request, batchData);
         
          
          const thebatch: Batch = await Batch.create(batchData)
          await thebatch.load("route")
          return response.status(201).json(thebatch)
      }

  public async update({ params, request }: HttpContextContract) {
    const theBatch: Batch = await Batch.findOrFail(params.id);
    const body = request.body();
    theBatch.weight = body.weight;
    theBatch.route_id = body.route_id;
    theBatch.addre_route_orders = body.addre_route_orders;
    await theBatch.load("route");
    return await theBatch.save();
  }
  

  public async delete({ params, response }: HttpContextContract) {
    const theBatch: Batch = await Batch.findOrFail(params.id);
    await theBatch.delete();
    return response.status(200).json({
      message: "Lote eliminado con éxito",
    });
  }

  private async validateBatchData(request: HttpContextContract['request'], data: any) {
    const validationSchema = schema.create({
      weight: schema.number([
        rules.unsigned(),
        rules.required(),
        rules.range(10, 100)
      ]),
      route_id: schema.number([
        rules.exists({ table: 'routes', column: 'id' }),
        rules.required()
      ]),
      addre_route_orders: schema.number([
        rules.exists({ table: 'addre_route_orders', column: 'id' }),
        rules.required()
      ])
    })
  
    // Usamos request.validate para validar los datos
    return await request.validate({
      schema: validationSchema,
      data,
      messages: {
        'weight.required': 'El peso es obligatorio.',
        'weight.unsigned': 'El peso debe ser un número positivo.',
        'weight.range': 'El peso debe estar entre 10 y 100.',
        'route_id.required': 'El ID de la ruta es obligatorio.',
        'route_id.exists': 'La ruta especificada no existe.',
        'addre_route_orders.required': 'El ID de la orden de ruta es obligatorio.',
        'addre_route_orders.exists': 'La orden de ruta especificada no existe.'
      }
    })
}
}
