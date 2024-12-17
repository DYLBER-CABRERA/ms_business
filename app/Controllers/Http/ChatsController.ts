import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Chat from 'App/Models/Chat';
import ChatValidator from 'App/Validators/ChatValidator';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';

export default class ChatsController {
    private async getUserByEmail(email: string, authorization: string): Promise<any | null> {
        try {
            // Realizar la solicitud al microservicio para obtener la información del usuario por email
            const response = await axios.get(`${Env.get('MS_SECURITY')}/users`, {
                headers: { Authorization: authorization },
            });
            // Buscar el usuario con el email proporcionado
            const user = response.data.find((user: any) => user.email === email);
            return user || null;
        } catch (error) {
            console.error(`Error fetching user by email: ${email}`, error);
            return null;
        }
    }

    public async create({ request, response }: HttpContextContract) {
        try {
            // Validar el cuerpo de la solicitud
            await request.validate(ChatValidator);
            const body = request.body();

            // Obtener el token de autorización
            const authorization = request.headers().authorization || '';

            // Verificar y obtener los usuarios basados en los correos electrónicos de "to" y "from"
            const toUser = await this.getUserByEmail(body.to, authorization);
            const fromUser = await this.getUserByEmail(body.from, authorization);

            if (!toUser) {
                return response.badRequest({ error: `No se encontró información del usuario 'to' con el email: ${body.to}.` });
            }

            if (!fromUser) {
                return response.badRequest({ error: `No se encontró información del usuario 'from' con el email: ${body.from}.` });
            }

            // Crear el chat si los usuarios son válidos
            const theChat: Chat = await Chat.create(body);
            return theChat;
        } catch (error) {
            console.error('Error creating chat:', error);
            return response.status(500).send({ error: 'Ocurrió un error al crear el chat.' });
        }
    }


    
    public async find({ request, params }: HttpContextContract) {
        // Buscar el elemento dado una condición
        if (params.id) {
            let theChat: Chat = await Chat.findOrFail(params.id);
            await theChat.load("messages");
            return theChat;
        } else {
            const data = request.all();
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Chat.query().paginate(page, perPage);
            } else {
                return await Chat.query();
            }
        }
    }

    public async update({ params, request }: HttpContextContract) {
        const theChat: Chat = await Chat.findOrFail(params.id);
        const body = request.body();
        theChat.to = body.to;
        theChat.from = body.from;
        return await theChat.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theChat: Chat = await Chat.findOrFail(params.id);
        await theChat.delete();
        return response.status(200).json({
            message: "Chat eliminado correctamente",
        });
    }
}
