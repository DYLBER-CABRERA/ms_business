import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'vehicle_owners'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.dateTime('acquisition_date')
      table.integer('ownership_percentage')
      table.integer('owner_id').unsigned().references('owners.id').onDelete('CASCADE')
      table.integer('vehicle_id').unsigned().references('vehicles.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
