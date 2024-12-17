import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Chat from "App/Models/Chat";
import ChatValidator from "App/Validators/ChatValidator";

export default class ChatsController {
  public async getChatByUsers({
    params,
  }: HttpContextContract): Promise<Chat | null> {
    try {
      return await Chat.query()
        .where((builder) => {
          builder.where("to", params.to).where("from", params.from);
        })
        .orWhere((builder) => {
          builder.where("to", params.from).where("from", params.to);
        })
        .firstOrFail();
    } catch (error) {
      return null;
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar el cuerpo de la solicitud
      await request.validate(ChatValidator);
      const body = request.body();

      return await Chat.create(body);
    } catch (error) {
      console.error("Error creating chat:", error);
      return response
        .status(500)
        .send({ error: "Ocurrió un error al crear el chat." });
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
        const page = request.input("page", 1);
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
