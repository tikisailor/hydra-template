import {MigrationInterface, QueryRunner} from "typeorm";

export class migration11643246757609 implements MigrationInterface {
    name = 'migration11643246757609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "heartbeat" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "block_number" numeric, "authority_id" character varying, "validator" character varying, "peer_id" character varying, "network_address" character varying, "multi_address" boolean, "ipv4" character varying, CONSTRAINT "PK_2eef6ae1f091f9a8900f60682fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "last_heartbeat" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "heartbeat_id" character varying NOT NULL, CONSTRAINT "PK_2ad47e9f9a5650487b050b77af1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "last_heartbeat"`);
        await queryRunner.query(`DROP TABLE "heartbeat"`);
    }

}
