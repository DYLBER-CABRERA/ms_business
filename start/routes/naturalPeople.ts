import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/naturalPeople", "NaturalPeopleController.find");
    Route.get("/naturalPeople/:id", "NaturalPeopleController.find");
    Route.post("/naturalPeople", "NaturalPeopleController.create");
    Route.put("/naturalPeople/:id", "NaturalPeopleController.update");
    Route.delete("/naturalPeople/:id", "NaturalPeopleController.delete");
})
