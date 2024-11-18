import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/owners", "OwnersController.find");
  Route.get("/owners/:id", "OwnersController.find");
  Route.post("/owners", "OwnersController.create");
  Route.put("/owners/:id", "OwnersController.update");
  Route.delete("/owners/:id", "OwnersController.delete");
}).middleware(["security"]);
