import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});
// Importaciones de rutas
import './routes/addreRouteOrders';
import './routes/addresses';
import './routes/administrators';
import './routes/batches';
import './routes/categories';
import './routes/clients';
import './routes/companies';
import './routes/contracts';
import './routes/departments';
import './routes/distrubutionCenters';
import './routes/drivers';
import './routes/expenses';
import './routes/hotels';
import './routes/insurances';
import './routes/invoices';
import './routes/municipalities';
import './routes/naturalPeople';
import './routes/operations';
import './routes/owners';
import './routes/productCategories';
import './routes/products';
import './routes/quotas';
import './routes/restaurants';
import './routes/routes';
import './routes/services';
import './routes/shifts';
import './routes/vehicleDrivers';
import './routes/vehicleOwners';
import './routes/vehicles';





