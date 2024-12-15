import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat';
import ChatValidator from 'App/Validators/ChatValidator';

export default class ChatsController {
    public async find({ request, params }: HttpContextContract) {
            //Buscar el elemento dado una condición 
            if (params.id) {
                let theChat: Chat = await Chat.findOrFail(params.id)
                return theChat;
            } else {
                const data = request.all()
                if ("page" in data && "per_page" in data) {
                    const page = request.input('page', 1);
                    const perPage = request.input("per_page", 20);
                    return await Chat.query().paginate(page, perPage)
                } else {
                    return await Chat.query()
                }
            }
        }
    
        public async create({ request }: HttpContextContract) {
            await request.validate(ChatValidator);
            const body = request.body();
            const theChat: Chat = await Chat.create(body);
            return theChat;
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
                message: "Chat eliminado correctamente"
            }
            );
        }
    }
    