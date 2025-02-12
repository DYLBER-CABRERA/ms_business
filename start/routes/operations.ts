//rutas para activar los controladores
import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/operations", "OperationsController.find");
    Route.get("/operations/:id", "OperationsController.find");
    Route.post("/operations", "OperationsController.create");
    Route.post("/operations/vehicle/:vehicle_id", "OperationsController.createForVehicle");
    Route.put("/operations/:id", "OperationsController.update");
    Route.delete("/operations/:id", "OperationsController.delete");
})//.middleware(["security"]);
