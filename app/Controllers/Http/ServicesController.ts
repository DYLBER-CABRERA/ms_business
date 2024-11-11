import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Service from "App/Models/Service";
import ServiceValidator from "App/Validators/ServiceValidator";

export default class ServicesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theService: Service = await Service.findOrFail(params.id);
      await theService.load("administrator"); //devuelve la info de que administrador tiene ese servicio

      return theService;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Service.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
      } else {
        return await Service.query(); //es para que espere a la base de datos
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    await request.validate(ServiceValidator); //*cuando se llama este endpoint antes de mandar valida los datos de acuerdo a los parametros del validador

    const body = request.body();

    const theService: Service = await Service.create(body);
    return theService;
  }

  public async update({ params, request }: HttpContextContract) {
    const theService: Service = await Service.findOrFail(params.id); //busque el teatro con el identificador
    const body = request.body(); //leer lo que viene en la carta
    theService.name = body.name;
    theService.address = body.address;

    theService.description = body.description; //de lo que está en la base de datos, actualice con lo que viene dentro del body
    theService.date = body.date;
    await theService.load("administrator"); //devuelve la info de que administrador tiene ese servicio

    return await theService.save(); //se confirma a la base de datos el cambio
  }

  public async delete({ params, response }: HttpContextContract) {
    //
    const theTheater: Service = await Service.findOrFail(params.id); //buscarlo
    response.status(204);

    return await theTheater.delete(); //el teatro que se encontro, eliminelo
  }
}
