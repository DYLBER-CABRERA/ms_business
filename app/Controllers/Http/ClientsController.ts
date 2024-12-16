import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
// import { Exception } from "@adonisjs/core/build/standalone";
// import axios from "axios";
// import Env from "@ioc:Adonis/Core/Env";
import Client from "App/Models/Client";
import ClientValidator from "../../Validators/ClientValidator";

export default class ClientsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theClient: Client = await Client.findOrFail(params.id);
      await theClient.load("NaturalPeople");
      return theClient;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Client.query().paginate(page, perPage);
      } else {
        return await Client.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    await request.validate(ClientValidator);
    const body = request.body();
    const theClient: Client = await Client.create(body);
    await theClient.load("NaturalPeople");
    return theClient;
  }

  public async update({ params, request }: HttpContextContract) {
    const theClient: Client = await Client.findOrFail(params.id);
    const body = request.body();
    theClient.user_id = body.user_id;
    theClient.id_type = body.id_type;
    theClient.id_number = body.id_number;
    theClient.phone_number = body.phone_number;
    theClient.order_count = body.order_count;
    await theClient.load("NaturalPeople");
    await theClient.load("contract");
    return await theClient.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theClient: Client = await Client.findOrFail(params.id);
    await theClient.delete();
    return response.status(200).json({
      message: "Cliente eliminado con éxito",
    });
  }
}
