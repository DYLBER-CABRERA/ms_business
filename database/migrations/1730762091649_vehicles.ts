import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "vehicles";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string("license_plate");
      table.string("model");
      table.integer("capacity");
      table.string("cargo_type");
      table.decimal("latitud_inicial", 6, 4);
      table.decimal("latitud_final", 6, 4);
      table.decimal("longitud_inicial", 4, 2);
      table.decimal("longitud_final", 4, 2);

      table.increments("id");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
