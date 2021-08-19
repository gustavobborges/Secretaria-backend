import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class UserMigration1623725304409 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
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
    // await queryRunner.dropForeignKey('users', 'userHasProvider');
    await queryRunner.dropTable('users');
  }

}
