import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
    Route.get("/message", "MessagesController.find");
    Route.get("/message/:id", "MessagesController.find"); //pedir teatro con id. lisar solo uno
    Route.post("/message", "MessagesController.create"); //crearlos
    Route.put("/message/:id", "MessagesController.update"); //actualizar recibe id
    Route.delete("/message/:id", "MessagesController.delete"); //borrar, recibe id
})//.middleware(["security"]);