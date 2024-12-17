import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message';
import MessageValidator from 'App/Validators/MessageValidator';

export default class MessagesController {
    public async find({ request, params }: HttpContextContract) {
        //Buscar el elemento dado una condición 
        if (params.id) {
            let theMessage: Message = await Message.findOrFail(params.id)
            return theMessage;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Message.query().paginate(page, perPage)
            } else {
                return await Message.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(MessageValidator);
        const body = request.body();
        const theMessage: Message = await Message.create(body);
        return theMessage;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMessage: Message = await Message.findOrFail(params.id);
        const body = request.body();
        theMessage.content = body.content;
        theMessage.chat_id = body.chat_id;
        return await theMessage.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMessage: Message = await Message.findOrFail(params.id);
        await theMessage.delete();
        return response.status(200).json({
            message: "Mensaje eliminado correctamente"
        }
        );
    }

    public async findByChat({ params }: HttpContextContract) {
        return await Message.query().where("chat_id", params.id);
    }

    public async createByWebSocket(messageData: any) {
        const theMessage: Message = await Message.create(messageData);
        return theMessage;
    }
    public async deleteByChat({ params, response }: HttpContextContract) {
        //busca los mensajes del chat
        const messages = await Message.query().where("chat_id", params.id);
        //recorre los mensajes y los elimina
        messages.forEach(async (message) => {
            await message.delete();
        });
        response.status(204);
    }

    /**
     * Consulta para saber el número total de mensajes por día de acuerdo al created_at
     *
     */

    public async getMessagesCountByDate({ }: HttpContextContract) {
        return await Message.query()
            .select("created_at")
            .count("created_at")
            .groupBy("created_at")
            .orderBy("created_at", "desc");
    }
}

