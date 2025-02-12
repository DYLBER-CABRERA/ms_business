import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Env from "@ioc:Adonis/Core/Env";
import Owner from "App/Models/Owner";
import axios from "axios";
import { Exception } from "@adonisjs/core/build/standalone";
import OwnerValidator from "App/Validators/OwnerValidator";

export default class OwnersController {
  public async find({ request, params }: HttpContextContract) {
    //let theOwner

    try {
      if (params.id) {
        let theOwner: Owner = await Owner.findOrFail(params.id);
        // Llamada al microservicio de usuarios
        await theOwner.load("driver");
        await theOwner.load("vehicleOwners");

        const userResponse = await axios.get(
          `${Env.get("MS_SECURITY")}/users/${theOwner.user_id}`,
          {
            headers: { Authorization: request.headers().authorization || "" },
          }
        );

        await theOwner.load("driver");
        await theOwner.load("vehicleOwners");

        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
          throw new Exception(
            "No se encontró información de usuario en el microservicio",
            404
          );
        }

        const data={
          "_id":userResponse.data._id,
          "name":userResponse.data.name,
          "email":userResponse.data.email,
          "verificationCode":userResponse.data.verificationCode,
        }

        const ownerWithUserData = {
          ...theOwner.toJSON(),
          user: data,
        }

        return ownerWithUserData

      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
          return await Owner.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
        } else {
          return await Owner.query(); //es para que espere a la base de datos
        }
      }
    } catch (error) {
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500
      );
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar datos usando el ClienteValidator
      const body = request.body();

      // Llamada al microservicio de usuarios
      const userResponse = await axios.get(
        `${Env.get("MS_SECURITY")}/users/${body.user_id}`,
        {
          headers: { Authorization: request.headers().authorization || "" },
        }
      );

      // Verificar si no se encontró información del usuario en el microservicio
      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        return response.notFound({
          error:
            "No se encontró información de usuario, verifique que el código sea correcto",
        });
      }
      // Crear el Owner si la validación y la verificación de usuario son exitosas
      await request.validate(OwnerValidator);
      const theOwner: Owner = await Owner.create(body);

      await theOwner.load("driver");
      await theOwner.load("vehicleOwners");
      return theOwner;
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500
      );
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const theOwner: Owner = await Owner.findOrFail(params.id); //busque el teatro con el identificador
    const body = request.body(); //leer lo que viene en la carta

    theOwner.user_id = body.user_id;
    theOwner.phone_number = body.phone_number;
    theOwner.driver_id = body.driver_id;
    await theOwner.load("driver");
    await theOwner.load("vehicleOwners");

    return await theOwner.save(); //se confirma a la base de datos el cambio
  }

  public async delete({ params, response }: HttpContextContract) {
    //
    const theOwner: Owner = await Owner.findOrFail(params.id); //buscarlo
    response.status(204);

    return await theOwner.delete(); //el teatro que se encontro, eliminelo
  }
}
