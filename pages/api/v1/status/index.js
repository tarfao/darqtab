import database from "infra/database.js";
import { InternalServerError } from "infra/errors";

async function status(request, response) {
  try {
    const updatedAt = new Date();
    const databaseVersion = (await database.query("SHOW server_version;")).rows;
    const databaseVersionValue = databaseVersion[0].server_version;

    const [{ max_connections: maxConnections }] = (
      await database.query("SHOW max_connections;")
    ).rows;

    const databaseName = process.env.POSTGRES_DB;

    const connections = await database.query({
      text: "SELECT count(*) FROM pg_stat_activity where datname = $1;",
      values: [databaseName],
    });
    const openedConnections = connections.rows[0].count;

    response.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        version: databaseVersionValue,
        max_connections: parseInt(maxConnections),
        used_connections: openedConnections,
      },
    });
  } catch (error) {
    const publicError = new InternalServerError({
      cause: error,
    });

    response.status(500).json(publicError);
  }
}

export default status;
