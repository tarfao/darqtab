import useSWR from "swr";

async function fetchApi(url) {
  const response = await fetch(url);
  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <Details />
    </>
  );
}

function Details() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  return isLoading ? (
    "..."
  ) : (
    <>
      <UpdatedAt updated_at={data.updated_at} />
      <PGVersion version={data.dependencies.version} />
      <MaxConn max_connections={data.dependencies.max_connections} />
      <UsedConn used_connections={data.dependencies.used_connections} />
    </>
  );
}

function UpdatedAt({ updated_at }) {
  return (
    <pre>Atualizado em: {new Date(updated_at).toLocaleString("pt-BR")}</pre>
  );
}

function PGVersion({ version }) {
  return <pre>Versão do postgres: {version}</pre>;
}

function MaxConn({ max_connections }) {
  return <pre>Máximo de conexões: {max_connections}</pre>;
}

function UsedConn({ used_connections }) {
  return <pre>Conexões em uso: {used_connections}</pre>;
}
