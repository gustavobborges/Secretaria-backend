import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableColumn } from "typeorm";

export class ProviderUserMigration1623725319797 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'providers_users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
          }
        ]
      })
    );

    await queryRunner.addColumn("providers_users", new TableColumn({
      name: "userId",
      type: "varchar",
      // isNullable: true,
      // unsigned: true, 
    }));

    await queryRunner.addColumn("providers_users", new TableColumn({
      name: "providerId",
      type: "varchar",
      // isNullable: true,
      // unsigned: true, 
    }));

    await queryRunner.createForeignKey('providers_users', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      // onDelete: 'SET NULL',
      // onUpdate: 'CASCADE',
    }));

    await queryRunner.createForeignKey('providers_users', new TableForeignKey({
      columnNames: ['providerId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'providers',
      // onDelete: 'SET NULL',
      // onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('providers_users');
  }
}
