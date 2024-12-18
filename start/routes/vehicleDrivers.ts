import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/vehicleDrivers", "VehicleDriversController.find");
  Route.get("/vehicleDrivers/:id", "VehicleDriversController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/vehicleDrivers", "VehicleDriversController.create"); //crearlos
  Route.post('/vehicleDrivers/driver/:driver_id', 'VehicleDriversController.createForDriver');
  Route.post('/vehicleDrivers/vehicle/:vehicle_id', 'VehicleDriversController.createForVehicle');
  Route.put("/vehicleDrivers/:id", "VehicleDriversController.update"); //actualizar recibe id
  Route.delete("/vehicleDrivers/:id", "VehicleDriversController.delete"); //borrar, recibe id
});
