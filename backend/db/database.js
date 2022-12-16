import knex from 'knex';

export const connectedKnex = knex({
  client: "sqlite3",
  connection: {
    filename: "hackathor.sqlite3"
  }
});
