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
						name: 'userType_id',
						type: 'varchar',
						isNullable: true,
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

        await queryRunner.createForeignKey('users', new TableForeignKey({
			name: 'userType',
			columnNames: ['userType_id'],
			referencedColumnNames: ['id'],
			referencedTableName: 'userTypes',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users', 'userType');
        await queryRunner.dropTable('users');
    }

}
