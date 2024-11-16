import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import NaturalPerson from "App/Models/NaturalPerson";
import NaturalPersonValidator from "App/Validators/NaturalPersonValidator";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";
import { Exception } from "@adonisjs/core/build/standalone";

export default class NaturalPeopleController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(
        params.id
      );
      await theNaturalPerson.load("Company");
      await theNaturalPerson.load("client");
      return theNaturalPerson;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await NaturalPerson.query().paginate(page, perPage);
      } else {
        return await NaturalPerson.query();
      }
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
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
        await request.validate(NaturalPersonValidator); //*cuando se llame este endpoint antes de mandar valida los datos de acuerdo a los parametros del validador

        return response.notFound({
          error:
            "No se encontró información de usuario, verifique que el código sea correcto",
        });
      }
      // Crear la persona natural si la validación y la verificación de usuario son exitosas
      await request.validate(NaturalPersonValidator);
      const theNaturalPerson: NaturalPerson = await NaturalPerson.create(body);
      await theNaturalPerson.load("Company");
      await theNaturalPerson.load("client");

      return theNaturalPerson;
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
    const theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(
      params.id
    );
    const body = request.body();
    theNaturalPerson.user_id = body.user_id;
    theNaturalPerson.document_type = body.document_type;
    theNaturalPerson.document_number = body.document_number;
    theNaturalPerson.birth_date = body.birth_date;
    theNaturalPerson.company_id = body.company_id;
    theNaturalPerson.client_id = body.client_id;
    await theNaturalPerson.load("Company");
    await theNaturalPerson.load("client");
    return await theNaturalPerson.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(
      params.id
    );
    await theNaturalPerson.delete();
    return response.status(200).json({
      message: "Persona natural eliminada con éxito",
    });
  }
}
