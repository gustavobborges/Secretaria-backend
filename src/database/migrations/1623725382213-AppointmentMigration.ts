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
            name: "patientId",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "appointmentTypeId",
            type: "varchar",
          },
          {
            name: "userId",
            type: "varchar",
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'place',
            type: 'varchar',
            isNullable: true,
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

    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users'
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
