import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from "@adonisjs/core/build/standalone";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";
import Client from "App/Models/Client";
import ClientValidator from '../../Validators/ClientValidator';


export default class ClientsController {
    public async find({ request, params }: HttpContextContract) {
        try {
            if (params.id) {
                let theClient: Client = await Client.findOrFail(params.id);
                // Se llama al MS_SECURITY para validar a los usuarios
                await theClient.load('NaturalPeople')
                await theClient.load('companies')
                await theClient.load('contract')
                const userResponse = await axios.get(
                    `${Env.get("MS_SECURITY")}/users/${theClient.user_id}`,
                    {
                        headers: { Authorization: request.headers().authorization || "" },
                    }
                );
                if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
                    throw new Exception(
                        "No se encontró información del usuario en el sistema",
                        404
                    );
                } return { cliente: theClient, usuario: userResponse.data };
            } else {
                const data = request.all();
                if ("page" in data && "per_page" in data) {
                    const page = request.input("page", 1);
                    const perPage = request.input("per_page", 20);
                    return await Client.query().paginate(page, perPage);
                } else {
                    return await Client.query(); // Espera la respuesta de la base de datos
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
            // Llamada al MS_SECURITY para validar al usuario
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
                        "No se encontró información del usuario, verifique que el id sea correcto",
                });
            }
            // Crear el driver si la validación y la verificación de usuario son exitosas
            await request.validate(ClientValidator);
            const theClient: Client = await Client.create(body);
            await theClient.load('NaturalPeople')
            await theClient.load('companies')
            await theClient.load('contract')
            return theClient;
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
        const theClient: Client = await Client.findOrFail(params.id);
        const body = request.body();
        theClient.user_id = body.user_id;
        theClient.id_type = body.id_type;
        theClient.id_number = body.id_number;
        theClient.phone_number = body.phone_number;
        theClient.order_count = body.order_count;
        await theClient.load('NaturalPeople')
        await theClient.load('companies')
        await theClient.load('contract')
        return await theClient.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theClient: Client = await Client.findOrFail(params.id);
        await theClient.delete();
        return response.status(200).json({
            message:'Cliente eliminado con éxito',
        });
    }
}
