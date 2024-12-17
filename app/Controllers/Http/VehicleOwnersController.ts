import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehicleOwner from 'App/Models/VehicleOwner';
import VehicleOwnerValidator from 'App/Validators/VehicleOwnerValidator';

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
            if ("page" in data && "per_page" in data) {
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
  
  
}
