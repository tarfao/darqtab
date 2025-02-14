function status(request, response) {
  response
    .status(200)
    .json({ key: "Fala galera, é hoje que só acaba amanhã." });
}

export default status;
