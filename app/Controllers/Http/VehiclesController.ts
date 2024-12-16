import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Vehicles from "App/Models/Vehicle";
import VehicleValidator from "App/Validators/VehicleValidator";

export default class VehiclesController {
  public async find({ request, params }: HttpContextContract) {
    //Buscar el elemento dado una condición
    if (params.id) {
      let theVehicles: Vehicles = await Vehicles.findOrFail(params.id);
      await theVehicles.load("operations");
      await theVehicles.load("routes");
      await theVehicles.load("insurances");
      await theVehicles.load("vehicleOwners");
      return theVehicles;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Vehicles.query().paginate(page, perPage);
      } else {
        return await Vehicles.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(VehicleValidator);
    const body = request.body();
    const theVehicles: Vehicles = await Vehicles.create(body);
    await theVehicles.load("operations");
    await theVehicles.load("routes");
    await theVehicles.load("insurances");
    await theVehicles.load("vehicleOwners");
    return theVehicles;
  }

  public async update({ params, request }: HttpContextContract) {
    const theVehicles: Vehicles = await Vehicles.findOrFail(params.id);
    const body = request.body();
    theVehicles.license_plate = body.license_plate;
    theVehicles.model = body.model;
    theVehicles.capacity = body.capacity;
    theVehicles.cargo_type = body.cargo_type;
    theVehicles.latitud_inicial = body.latitud_inicial;
    theVehicles.latitud_final = body.latitud_final;
    theVehicles.longitud_inicial = body.longitud_inicial;
    theVehicles.longitud_final = body.longitud_final;

    await theVehicles.load("operations");
    await theVehicles.load("routes");
    await theVehicles.load("insurances");
    await theVehicles.load("vehicleOwners");
    return await theVehicles.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theVehicles: Vehicles = await Vehicles.findOrFail(params.id);
    await theVehicles.delete();

    return response.status(200).json({
      message: "Vehículo eliminado con éxito",
    });

  }
}
