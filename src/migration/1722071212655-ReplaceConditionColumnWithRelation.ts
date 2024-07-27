import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class ReplaceConditionColumnWithRelation1722071212655 implements MigrationInterface {
    name = 'ReplaceConditionColumnWithRelation1722071212655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the new condition table
        await queryRunner.createTable(new Table({
            name: 'condition',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'place',
                    type: 'varchar',
                },
                {
                    name: 'method',
                    type: 'varchar',
                },
            ],
        }), true);

        // Add the conditionId column to the data table
        await queryRunner.addColumn('data', new TableColumn({
            name: 'conditionId',
            type: 'int',
            isNullable: true,
        }));

        // Create a foreign key from data to condition
        await queryRunner.createForeignKey('data', new TableForeignKey({
            columnNames: ['conditionId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'condition',
            onDelete: 'SET NULL',
        }));

        // Remove the old condition column
        await queryRunner.dropColumn('data', 'condition');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Add the old condition column back
        await queryRunner.addColumn('data', new TableColumn({
            name: 'condition',
            type: 'varchar',
            isNullable: true,
        }));

        // Drop the foreign key
        await queryRunner.dropForeignKey('data', 'conditionId');

        // Drop the conditionId column
        await queryRunner.dropColumn('data', 'conditionId');

        // Drop the condition table
        await queryRunner.dropTable('condition');
    }
}
