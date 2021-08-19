import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ProviderMigration1623725319796 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'providers',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropForeignKey('providers', 'providerHasUser');
    await queryRunner.dropTable('providers');
  }
}
