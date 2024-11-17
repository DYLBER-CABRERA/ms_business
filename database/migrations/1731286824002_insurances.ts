import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'insurances'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("insurance_type") // Tipo de poliza
      table.date("start_date") // Fecha de inicio de la poliza
      table.date("end_date") // Fecha de fin de la poliza
      table.string("insurance_company") // Compañia de seguros
      table.integer("vehicle_id").unsigned().references('vehicles.id').onDelete('CASCADE') // Vehiculo asegurado
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
