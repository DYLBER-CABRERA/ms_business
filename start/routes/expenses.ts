import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/expenses", "ExpensesController.find");
  Route.get("/expenses/:id", "ExpensesController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/expenses", "ExpensesController.create"); //crearlos
  Route.put("/expenses/:id", "ExpensesController.update"); //actualizar recibe id
  Route.delete("/expenses/:id", "ExpensesController.delete"); //borrar, recibe id
})
