import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/services", "ServicesController.find");
  Route.get("/services/:id", "ServicesController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/services", "ServicesController.create"); //crearlos
  Route.put("/services/:id", "ServicesController.update"); //actualizar recibe id
  Route.delete("/services/:id", "ServicesController.delete"); //borrar, recibe id
})