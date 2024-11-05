import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'departments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.text('description').nullable()
      table.integer('city_capital_id').nullable()
      table.integer('municipalities').nullable()
      table.decimal('surface', 10, 2).nullable()
      table.integer('population').nullable()
      table.string('phone_prefix', 5).nullable()
      table.integer('country_id').nullable()
      table.integer('region_id').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
