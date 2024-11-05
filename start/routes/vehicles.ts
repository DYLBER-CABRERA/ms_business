import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/vehicle", "VehiclesController.find");
    Route.get("/vehicle/:id", "VehiclesController.find");
    Route.post("/vehicle", "VehiclesController.create");
    Route.put("/vehicle/:id", "VehiclesController.update");
    Route.delete("/vehicle/:id", "VehiclesController.delete");
})