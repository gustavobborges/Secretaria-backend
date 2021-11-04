import { MigrationInterface, QueryRunner, Table } from "typeorm";

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

    await queryRunner.query(`INSERT INTO users (id, name, email, password) VALUES ('92b1d67e-ac3e-46a2-b442-85984fdd2a09', 'Gustavo', 'gustavo', 'gustavo');`);
    await queryRunner.query(`INSERT INTO users (id, name, email, password) VALUES ('f82b5ed2-0719-4d26-baef-879d247e2317', 'Ivano', 'ivano', 'ivano');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropForeignKey('users', 'userHasProvider');
    await queryRunner.dropTable('users');
  }

}
