import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/drivers", "DriversController.find");
  Route.get("/drivers/:id", "DriversController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/drivers", "DriversController.create"); //crearlos
  Route.put("/drivers/:id", "DriversController.update"); //actualizar recibe id
  Route.delete("/drivers/:id", "DriversController.delete"); //borrar, recibe id
});
