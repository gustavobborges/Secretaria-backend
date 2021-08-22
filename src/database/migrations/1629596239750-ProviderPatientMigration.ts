import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableColumn } from "typeorm";

export class ProviderPatientMigration1629596239750 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'providers_patients',
        columns: [
          {
            name: "providerId",
            type: "varchar",
          },
          {
            name: "patientId",
            type: "varchar",
          }
        ]
      })
    );

    // await queryRunner.addColumn("providers_users", new TableColumn({
    //   name: "userId",
    //   type: "varchar",
    //   // isNullable: true,
    //   // unsigned: true, 
    // }));

    // await queryRunner.addColumn("providers_users", new TableColumn({
    //   name: "providerId",
    //   type: "varchar",
    //   // isNullable: true,
    //   // unsigned: true, 
    // }));

    await queryRunner.createForeignKey('providers_patients', new TableForeignKey({
      columnNames: ['providerId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'providers',
      // onDelete: 'SET NULL',
      // onUpdate: 'CASCADE',
    }));

    await queryRunner.createForeignKey('providers_patients', new TableForeignKey({
      columnNames: ['patientId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'patients',
      // onDelete: 'SET NULL',
      // onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('providers_patients');
  }
}
