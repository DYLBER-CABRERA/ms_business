import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import VehicleDriver from "App/Models/VehicleDriver";
import VehicleDriverValidator from "App/Validators/VehicleDriverValidator";

export default class VehicleDriversController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theVehicleDriver: VehicleDriver = await VehicleDriver.findOrFail(
        params.id
      );
      await theVehicleDriver.load("driver"); //devuelve la info de que administrador tiene ese servicio
      await theVehicleDriver.load("vehicle");

      return theVehicleDriver;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await VehicleDriver.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
      } else {
        return await VehicleDriver.query(); //es para que espere a la base de datos
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    await request.validate(VehicleDriverValidator); //*cuando se llame este endpoint antes de mandar valida los datos de acuerdo a los parametros del validador

    const body = request.body();
    const theVehicleDriver: VehicleDriver = await VehicleDriver.create(body);
    await theVehicleDriver.load("driver"); //devuelve la info de que administrador tiene ese servicio
    await theVehicleDriver.load("vehicle");
    return theVehicleDriver;
  }

  public async update({ params, request }: HttpContextContract) {
    const theVehicleDriver: VehicleDriver = await VehicleDriver.findOrFail(
      params.id
    );
    const body = request.body(); //leer lo que viene en la carta
    theVehicleDriver.vehicle_id = body.vehicle_id; //de lo que está en la base de datos, actualice con lo que viene dentro del body
    theVehicleDriver.driver_id = body.driver_id;
    await theVehicleDriver.load("driver"); //devuelve la info de que administrador tiene ese servicio
    await theVehicleDriver.load("vehicle");
    return await theVehicleDriver.save(); //se confirma a la base de datos el cambio
  }

  public async delete({ params, response }: HttpContextContract) {
    //
    const theTheater: VehicleDriver = await VehicleDriver.findOrFail(params.id); //buscarlo
    response.status(204);

    return await theTheater.delete(); //el teatro que se encontro, eliminelo
  }
}
