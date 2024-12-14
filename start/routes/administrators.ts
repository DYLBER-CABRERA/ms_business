import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/administrators", "AdministratorsController.find");
  Route.get("/administrators/:id", "AdministratorsController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/administrators", "AdministratorsController.create"); //crearlos
  Route.put("/administrators/:id", "AdministratorsController.update"); //actualizar recibe id
  Route.delete("/administrators/:id", "AdministratorsController.delete"); //borrar, recibe id
})//.middleware(["security"]);
