import database from "infra/database.js";

async function status(rquest, response) {
  const result = await database.query("SELECT 1 + 1;");
  console.log(result.rows);
  response.status(200).json({"nome": "Leandro"});
}

export default status;