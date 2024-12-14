import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/restaurants", "RestaurantsController.find");
  Route.get("/restaurants/:id", "RestaurantsController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/restaurants", "RestaurantsController.create"); //crearlos
  Route.put("/restaurants/:id", "RestaurantsController.update"); //actualizar recibe id
  Route.delete("/restaurants/:id", "RestaurantsController.delete"); //borrar, recibe id
})//.middleware(["security"]);
