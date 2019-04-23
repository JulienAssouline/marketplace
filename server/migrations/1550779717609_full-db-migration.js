exports.up = pgm => {
  //1. Users Table
  pgm.sql(`
    CREATE TABLE "bazaar"."users" (
      "id" SERIAL PRIMARY KEY,
      "fullname" TEXT,
      "password" TEXT NOT NULL,
      "email" TEXT UNIQUE NOT NULL,
      "username" TEXT,
      "status" TEXT,
      "country" TEXT,
      "date_created" DATE DEFAULT CURRENT_DATE,
      "date_updated" DATE DEFAULT CURRENT_DATE,
      "rating" INT
    );

  `),

  pgm.sql(`
    CREATE TABLE "bazaar"."items"(
    "id" SERIAL PRIMARY KEY,
    "item_name" TEXT NOT NULL,
    "item_type" TEXT,
    "status" TEXT NOT NULL,
    "price" NUMERIC,
    "inventory" INT,
    "owner_id" INT,
    "date_created" DATE DEFAULT CURRENT_DATE,
    "date_updated" DATE DEFAULT CURRENT_DATE,
    "item_description" TEXT
    );
    `
    ),
  pgm.sql(`
    CREATE TABLE "bazaar"."purchased_items"(
    "item_id" SERIAL PRIMARY KEY,
    "purchased_from_id" INT,
    "shipping_status" TEXT,
    "date_of_purchase" DATE DEFAULT CURRENT_DATE,
    "owner_id" INT,
    "purchased_quantity" INT,
    "transaction_id" INT
    );
    `),
  pgm.sql(`
    CREATE TABLE "bazaar"."transactions"(
        "id" SERIAL PRIMARY KEY,
        "stripe_charge_id" INT,
        "date_of_purchase" DATE DEFAULT CURRENT_DATE
        );
    `),
  pgm.sql(`
    CREATE TABLE "bazaar"."removed_items"(
    "id" SERIAL PRIMARY KEY,
    "item_name" TEXT NOT NULL,
    "item_type" TEXT,
    "status" TEXT NOT NULL,
    "price" NUMERIC,
    "inventory" INT,
    "owner_id" INT,
    "date_created" DATE DEFAULT CURRENT_DATE,
    "date_removed" DATE DEFAULT CURRENT_DATE,
    "item_description" TEXT
    );
    `
    )
  /* TODO: add more migrations */
};