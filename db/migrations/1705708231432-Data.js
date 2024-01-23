module.exports = class Data1705708231432 {
    name = 'Data1705708231432'

    async up(db) {
        await db.query(`CREATE TABLE "block" ("id" character varying NOT NULL, "number" numeric NOT NULL, "timestamp" numeric NOT NULL, "parent_hash" text, "author" text, "difficulty" numeric, "total_difficulty" numeric, "gas_used" numeric, "gas_limit" numeric, "receipts_root" text, "transactions_root" text, "state_root" text, "size" numeric, "uncles_hash" text, CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "block"`)
    }
}
