const configKnex = require("../../../knexfile");
const knex = require("knex");
const connection = knex(configKnex);

module.exports = connection;


