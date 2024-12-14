import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/routes", "RoutesController.find");
    Route.get("/routes/:id", "RoutesController.find");
    Route.post("/routes", "RoutesController.create");
    Route.put("/routes/:id", "RoutesController.update");
    Route.delete("/routes/:id", "RoutesController.delete");
})//.middleware(["security"]);
