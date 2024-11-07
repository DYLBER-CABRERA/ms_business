import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/shifts", "ShiftsController.find");
  Route.get("/shifts/:id", "ShiftsController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/shifts", "ShiftsController.create"); //crearlos
  Route.put("/shifts/:id", "ShiftsController.update"); //actualizar recibe id
  Route.delete("/shifts/:id", "ShiftsController.delete"); //borrar, recibe id
});
