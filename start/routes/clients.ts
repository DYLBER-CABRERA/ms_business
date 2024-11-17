import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
    Route.get("/clients", "ClientsController.find");
    Route.get("/clients/:id", "ClientsController.find"); //pedir teatro con id. lisar solo uno
    Route.post("/clients", "ClientsController.create"); //crearlos
    Route.put("/clients/:id", "ClientsController.update"); //actualizar recibe id
    Route.delete("/clients/:id", "ClientsController.delete"); //borrar, recibe id
}).middleware(["security"]);
