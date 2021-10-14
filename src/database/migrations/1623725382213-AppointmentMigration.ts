import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AppointmentMigration1623725382213 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
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
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'place',
            type: 'varchar',
          },
          {
            name: 'initialDate',
            type: 'timestamp',
          },
          {
            name: 'finalDate',
            type: 'timestamp',
          },
          {
            name: "patientId",
            type: "varchar",
          },
          {
            name: "appointmentTypeId",
            type: "varchar",
          },
          {
            name: "providerId",
            type: "varchar",
            isNullable: true,
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
    )

    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      columnNames: ['providerId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'providers'
    }));

    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      columnNames: ['patientId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'patients'
    }));

    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      columnNames: ['appointmentTypeId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'appointmentTypes'
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
