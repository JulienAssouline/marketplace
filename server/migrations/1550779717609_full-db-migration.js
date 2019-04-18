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
      "rating" INT
    );

  `),

  pgm.sql(`
    CREATE TABLE "bazaar"."items"(
    "id" SERIAL PRIMARY KEY,
    "item_name" TEXT NOT NULL
    );

    `
    )
  /* TODO: add more migrations */
};