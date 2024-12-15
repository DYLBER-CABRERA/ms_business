import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
    Route.get("/chat", "ChatsController.find");
    Route.get("/chat/:id", "ChatsController.find"); //pedir teatro con id. lisar solo uno
    Route.post("/chat", "ChatsController.create"); //crearlos
    Route.put("/chat/:id", "ChatsController.update"); //actualizar recibe id
    Route.delete("/chat/:id", "ChatsController.delete"); //borrar, recibe id
})//.middleware(["security"]);