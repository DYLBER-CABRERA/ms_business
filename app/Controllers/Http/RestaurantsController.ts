import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Restaurant from "App/Models/Restaurant";
import RestaurantValidator from "App/Validators/RestaurantValidator";

export default class RestaurantsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theRestaurant: Restaurant = await Restaurant.findOrFail(params.id);
      
       //devuelve la info de que administrador tiene ese servicio
      return theRestaurant;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Restaurant.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
      } else {
        return await Restaurant.query(); //es para que espere a la base de datos
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    await request.validate(RestaurantValidator); //*cuando se llame este endpoint antes de mandar valida los datos de acuerdo a los parametros del validador

    const body = request.body();
    const theRestaurant: Restaurant = await Restaurant.create(body);
    return theRestaurant;
  }

  public async update({ params, request }: HttpContextContract) {
    const theRestaurant: Restaurant = await Restaurant.findOrFail(params.id); //busque el teatro con el identificador
    const body = request.body(); //leer lo que viene en la carta

    theRestaurant.name = body.name; //de lo que está en la base de datos, actualice con lo que viene dentro del body
    theRestaurant.address = body.address;
    theRestaurant.service_id = body.service_id;

    return await theRestaurant.save(); //se confirma a la base de datos el cambio
  }

  public async delete({ params, response }: HttpContextContract) {
    //
    const theTheater: Restaurant = await Restaurant.findOrFail(params.id); //buscarlo
    response.status(204);

    return await theTheater.delete(); //el teatro que se encontro, eliminelo
  }
}
