import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});
// Importaciones de rutas
import "./routes/vehicles";
import "./routes/drivers";
import "./routes/shifts"; 
import "./routes/services";
import "./routes/expenses";
import "./routes/administrators";
import "./routes/restaurants";
import "./routes/hotels";
import "./routes/vehicleDrivers";
import './routes/departments';
import './routes/municipalities';
import './routes/addresses';
import './routes/distrubutionCenters';
import './routes/contracts';
import './routes/operations';
import './routes/routes';
import './routes/addreRouteOrders';
import './routes/categories'
import './routes/batches'
import './routes/owners'
import './routes/categories'
import './routes/batches'
import './routes/clients'
import './routes/products'
import './routes/productCategories'
import './routes/companies'
import './routes/naturalPeople'
import './routes/quotas';
import './routes/invoices';
import './routes/insurances';
import './routes/vehicleOwners';




