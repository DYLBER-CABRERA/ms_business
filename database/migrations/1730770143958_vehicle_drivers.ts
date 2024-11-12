import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "vehicle_drivers";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      //!PARA LA RELACIÓN CON VEHICULOS
      table.integer("vehicle_id").unsigned().references("vehicles.id");
      table.integer("driver_id").unsigned().references("drivers.id");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
