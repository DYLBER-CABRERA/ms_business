import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Insurance from "App/Models/Insurance";
import InsuranceValidator from "App/Validators/InsuranceValidator";
import { rules, schema } from "@ioc:Adonis/Core/Validator";

export default class InsurancesController {
  public async find({ request, params }: HttpContextContract) {
    //Buscar el elemento dado una condición
    if (params.id) {
      let theInsurance: Insurance = await Insurance.findOrFail(params.id);
      await theInsurance.load("vehicles");

      return theInsurance;
    } else {
      //sino viene el identificador en la ruta
      const data = request.all(); //listar a todos pero lo manda por tramos
      console.log(data);

      if ("vehicle_id" in data) {
        return await Insurance.query().where(
          "vehicle_id",
          request.input("vehicle_id")
        );
      } else if ("page" in data && "per_page" in data) {
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
    await theInsurance.load("vehicles");
    return theInsurance;
  }

  
    public async createForVehicle({
      params,
      request,
      response,
    }: HttpContextContract) {
      const vehicle_id = parseInt(params.vehicle_id, 10);
  
      // Preparar los datos de validación
      const body = request.body();
      const InsuranceData = {
        ...body,
        vehicle_id: vehicle_id,
      };
  
      console.log(InsuranceData);
  
      // Llamar a la función de validación
      await this.validateInsuranceData(request, InsuranceData);
  
      const theInsurance: Insurance = await Insurance.create(InsuranceData);
      await theInsurance.load("vehicles"); //
      return response.status(201).json(theInsurance);
    }

  public async update({ params, request }: HttpContextContract) {
    const theInsurance: Insurance = await Insurance.findOrFail(params.id);
    const body = request.body();
    theInsurance.insurance_type = body.insurance_type;
    theInsurance.start_date = body.start_date;
    theInsurance.end_date = body.end_date;
    theInsurance.insurance_company = body.insurance_company;
    theInsurance.vehicle_id = body.vehicle_id;
    return await theInsurance.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theInsurance: Insurance = await Insurance.findOrFail(params.id);
    await theInsurance.delete();
    return response.status(204).json({ message: "Seguro eliminado con éxito" });
  }

  
  private async validateInsuranceData(
    request: HttpContextContract["request"],
    data: any
  ) {
    const validationSchema = schema.create({
      insurance_type: schema.string({ trim: true }, [
        rules.required(),// Asegura que el campo no esté vacío
        rules.maxLength(255)// Asegura que el campo no tenga más de 255 caracteres
      ]),
      start_date: schema.date({ format: 'yyyy-MM-dd' }, [rules.afterOrEqual('today')]),
  
      end_date: schema.date({ format: 'yyyy-MM-dd' }, [rules.afterOrEqual('today'), rules.afterField('start_date')]),
      
      insurance_company: schema.string({ trim: true }, [// Asegura que el campo no tenga espacios en blanco al principio y al final
        rules.required(),// Asegura que el campo no esté vacío
        rules.maxLength(255)// Asegura que el campo no tenga más de 255 caracteres
      ]),
      vehicle_id: schema.number([
        rules.exists({ table: 'vehicles', column: 'id' }),
        rules.unsigned(),// Asegura que el ID del vehículo no sea negativo
        rules.required()// Asegura que el campo no esté vacío
      ])
    })
    // Usamos request.validate para validar los datos
    return await request.validate({
      schema: validationSchema,
      data,
    });
  }
}
