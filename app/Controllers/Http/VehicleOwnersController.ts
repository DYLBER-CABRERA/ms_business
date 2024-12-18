import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehicleOwner from 'App/Models/VehicleOwner';
import VehicleOwnerValidator from 'App/Validators/VehicleOwnerValidator';
import { rules, schema } from "@ioc:Adonis/Core/Validator";


export default class VehicleOwnersController {
    public async find({ request, params }: HttpContextContract) {
        //Buscar el elemento dado una condición 
        if (params.id) {
            let theVehicleOwner: VehicleOwner = await VehicleOwner.findOrFail(params.id);
            await theVehicleOwner.load("owner")
            await theVehicleOwner.load("vehicle")

            return theVehicleOwner;
          } else {
            const data = request.all();
            console.log(data);
            
                  if ("owner_id" in data) {
                    return await VehicleOwner.query().where(
                      "owner_id",
                      request.input("owner_id")
                    );
                  } else if ("vehicle_id" in data) {
                    return await VehicleOwner.query().where(
                      "vehicle_id",
                      request.input("vehicle_id")
                    );
                  }
            else if ("page" in data && "per_page" in data) {
              const page = request.input("page", 1);
              const perPage = request.input("per_page", 20);
              return await VehicleOwner.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
            } else {
              return await VehicleOwner.query(); //es para que espere a la base de datos
            }
          }

    }

    public async create({ request }: HttpContextContract) {
       await request.validate(VehicleOwnerValidator);
        const body = request.body();
        const theVehicleOwner: VehicleOwner = await VehicleOwner.create(body);
        await theVehicleOwner.load("owner")
        await theVehicleOwner.load("vehicle")

       
        return theVehicleOwner;
    }

    
      public async createForOwner({
        params,
        request,
        response,
      }: HttpContextContract) {
        const owner_id = parseInt(params.owner_id, 10);
    
        // Preparar los datos de validación
        const body = request.body();
        const vehicleOwnersData = {
          ...body,
          owner_id: owner_id,
        };

        console.log(vehicleOwnersData);
        
        // Llamar a la función de validación
        await this.validateVehicleOwnerData(request, vehicleOwnersData);
    
        const theVehicleOwner: VehicleOwner = await VehicleOwner.create(vehicleOwnersData);
        await theVehicleOwner.load("owner")
        await theVehicleOwner.load("vehicle")
        return response.status(201).json(theVehicleOwner);
      }
    
      public async createForVehicle({
        params,
        request,
        response,
      }: HttpContextContract) {
        const vehicle_id = parseInt(params.vehicle_id, 10);
    
        // Preparar los datos de validación
        const body = request.body();
        const vehicleOwnersData = {
          ...body,
          vehicle_id: vehicle_id,
        };
    
        console.log(vehicleOwnersData);
    
        // Llamar a la función de validación
        await this.validateVehicleOwnerData(request, vehicleOwnersData);
    
        const theVehicleOwner: VehicleOwner = await VehicleOwner.create(vehicleOwnersData);
        await theVehicleOwner.load("owner")
        await theVehicleOwner.load("vehicle")
        return response.status(201).json(theVehicleOwner);
      }

    public async update({ params, request }: HttpContextContract) {
        const theVehicleOwner: VehicleOwner = await VehicleOwner.findOrFail(params.id);
        const body = request.body();
        theVehicleOwner.acquisition_date =body.acquisition_date;
        theVehicleOwner.ownership_percentage = body.ownership_percentage;
        theVehicleOwner.owner_id = body.owner_id;
        theVehicleOwner.vehicle_id = body.vehicle_id;

        await theVehicleOwner.load("owner")
        await theVehicleOwner.load("vehicle")
        return await theVehicleOwner.save();
    }

    public async delete({ params, response }: HttpContextContract) {
      const theVehicleOwner: VehicleOwner = await VehicleOwner.findOrFail(params.id);
      await theVehicleOwner.delete();
      return response.status(204).json({message: "Propietario de vehículo eliminado con éxito"});
  }
  
  private async validateVehicleOwnerData(
    request: HttpContextContract["request"],
    data: any
  ) {
    const validationSchema = schema.create({
     
    acquisition_date: schema.date({ format: 'yyyy-MM-dd'}),// Asegura que la fecha de adquisición tenga el formato yyyy-MM-dd HH:mm:ss


    ownership_percentage: schema.number([rules.unsigned(), rules.required(),// Asegura que el porcentaje de propiedad no sea negativo
      rules.range(1, 100)]),// Asegura que el porcentaje de propiedad esté entre 1 y 100


      owner_id: schema.number([
      rules.exists({ table: 'owners', column: 'id' }),// Asegura que el ID del propietario exista en la tabla 'owners'
      rules.unsigned(),// Asegura que el ID del propietario no sea negativo
      rules.required()// Asegura que el campo no esté vacío
    ]),

    vehicle_id: schema.number([
      rules.exists({ table: 'vehicles', column: 'id' }),// Asegura que el ID del vehículo exista en la tabla 'vehicles'
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
