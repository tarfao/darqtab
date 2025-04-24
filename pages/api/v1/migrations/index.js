import migrationRunner from 'node-pg-migrate';
import { join } from "node:path";
import database from 'infra/database';

export default async function migrations(request, response) {  
  const dbClient = await database.getNewClient();

  const defaultMigrationOptions = {
    dbClient,
    dryRun: true, //executa as migrations de forma "fake"
    dir: join("infra", "migrations"), //independente do SO o join consegue resolver o path
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations"
  }

  if(request.method === 'GET') {
    const pendingMigrations = await migrationRunner(defaultMigrationOptions)
    
    await dbClient.end();

    return response.status(200).json(pendingMigrations);
  }

  if(request.method === 'POST') {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    })

    await dbClient.end();

    if(migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }
    
    return response.status(200).json(migratedMigrations);
  }

  response.status(405).end(); 
}
