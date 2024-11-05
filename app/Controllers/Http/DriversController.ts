import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Driver from "App/Models/Driver";
import DriverValidator from "App/Validators/DriverValidator";

export default class DriversController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theDriver: Driver = await Driver.findOrFail(params.id);
      await theDriver.load("shift"); //*devuelve la info de turnos asignados tiene el conductor
      await theDriver.load("expense");
      await theDriver.load("vehicleDriver")
      return theDriver;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Driver.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
      } else {
        return await Driver.query(); //es para que espere a la base de datos
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    await request.validate(DriverValidator); //*cuando se llame este endpoint antes de mandar valida los datos de acuerdo a los parametros del validador

    const body = request.body();
    const theDriver: Driver = await Driver.create(body);
    return theDriver;
  }

  public async update({ params, request }: HttpContextContract) {
    const theDriver: Driver = await Driver.findOrFail(params.id); //busque el teatro con el identificador
    const body = request.body(); //leer lo que viene en la carta
    theDriver.user_id = body.user_id;

    theDriver.license_number = body.license_number;
    theDriver.expiration_date = body.expiration_date;

    theDriver.phone_number = body.phone_number;


    return await theDriver.save(); //se confirma a la base de datos el cambio
  }

  public async delete({ params, response }: HttpContextContract) {
    //
    const theTheater: Driver = await Driver.findOrFail(params.id); //buscarlo
    response.status(204);

    return await theTheater.delete(); //el teatro que se encontro, eliminelo
  }
}
