import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/hotels", "HotelsController.find");
  Route.get("/hotels/:id", "HotelsController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/hotels", "HotelsController.create"); //crearlos
  Route.put("/hotels/:id", "HotelsController.update"); //actualizar recibe id
  Route.delete("/hotels/:id", "HotelsController.delete"); //borrar, recibe id
})//.middleware(["security"]);
