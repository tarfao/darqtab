const { exec } = require('node:child_process');

function checkPostgres() {
  const command = 'docker exec postgres-dev pg_isready --host localhost';

  exec(command, handleExecReturn)

  function handleExecReturn(error, stdout) {
    const acceptConn = 'accepting connections';

    if(stdout.search(acceptConn) === -1) {
      process.stdout.write('.')
      checkPostgres();
      return;
    }

    console.log('\n\n🟢 Postgres está pronto para receber conexões!\n')
  }
}

console.log("🔴 Aguardando postgres aceitar conexões...\n")
checkPostgres()