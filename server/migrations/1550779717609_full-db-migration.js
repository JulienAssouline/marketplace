exports.up = pgm => {
  //1. Users Table
  pgm.sql(`
    CREATE TABLE "boilerplate"."users" (
      "id" SERIAL PRIMARY KEY,
      "fullname" TEXT NOT NULL
    );
  `)
  /* TODO: add more migrations */
};