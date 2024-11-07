import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/vehicleDrivers", "VehicleDriversController.find");
  Route.get("/vehicleDrivers/:id", "VehicleDriversController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/vehicleDrivers", "VehicleDriversController.create"); //crearlos
  Route.put("/vehicleDrivers/:id", "VehicleDriversController.update"); //actualizar recibe id
  Route.delete("/vehicleDrivers/:id", "VehicleDriversController.delete"); //borrar, recibe id
});