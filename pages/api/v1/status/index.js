import database from "infra/database.js";

async function status(request, response) {
  console.log((await database.query("SELECT 1 + 1;")).rows);

  response
    .status(200)
    .json({ key: "Fala galera, é hoje que só acaba amanhã." });
}

export default status;
