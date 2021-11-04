import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AppointmentTypeMigration1623698912297 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointmentTypes',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          }
        ],
      })
    );

    await queryRunner.query(`INSERT INTO appointmentTypes (id, name) VALUES ('c728bb73-3f0b-4e83-a72e-57db80ef3f16', 'Pessoal');`);
    await queryRunner.query(`INSERT INTO appointmentTypes (id, name) VALUES ('f26affb6-d725-43ef-b3c7-6ffb28794a85', 'Profissional');`)
  };

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointmentTypes');
  }

}
