import database from "infra/database.js";

async function status(rquest, response) {
  const updatedAt = new Date().toISOString();
  const databaseVersionResult = await database.query("SHOW server_version;");
  const maxConnections = await database.query("SELECT * FROM pg_settings WHERE name = 'max_connections';");

  const databaseName = process.env.POSTGRES_DB;
  const openedConnections = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName]
  });

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionResult.rows[0].server_version,
        max_connections: parseInt(maxConnections.rows[0].setting),
        opened_connections: openedConnections.rows[0].count,
      },
    },
  });
}

export default status;
