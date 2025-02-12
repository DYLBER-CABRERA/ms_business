//rutas para activar los controladores
import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/vehicleOwners", "VehicleOwnersController.find");
    Route.get("/vehicleOwners/:id", "VehicleOwnersController.find");
    Route.post("/vehicleOwners", "VehicleOwnersController.create");
    Route.post('/vehicleOwners/owner/:owner_id', 'VehicleOwnersController.createForOwner');
    Route.post('/vehicleOwners/vehicle/:vehicle_id', 'VehicleOwnersController.createForVehicle');
    Route.put("/vehicleOwners/:id", "VehicleOwnersController.update");
    Route.delete("/vehicleOwners/:id", "VehicleOwnersController.delete");
})