import { Exception } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Driver from "App/Models/Driver";
//import DriverValidator from "App/Validators/DriverValidator";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

export default class DriversController {
  public async find({ request, params }: HttpContextContract) {
    //let theDriver

    try {
      if (params.id) {
        let theDriver: Driver = await Driver.findOrFail(params.id);
        // Llamada al microservicio de usuarios
        const userResponse = await axios.get(
          `${Env.get("MS_SECURITY")}/users/${theDriver.user_id}`,
          {
            headers: { Authorization: request.headers().authorization || "" },
          }
        );

        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
          throw new Exception(
            "No se encontró información de usuario en el microservicio",
            404
          );
        }

        return { cliente: theDriver, usuario: userResponse.data };
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

      
      // Crear el driver si la validación y la verificación de usuario son exitosas

      const theDriver: Driver = await Driver.create(body);
      return theDriver;
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

