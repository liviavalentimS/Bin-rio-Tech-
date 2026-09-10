function verificarContentTypeJson(req, res, next) {
  if (req.method === 'POST') {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        status: "ERRO_VALIDACAO",
        mensagem: "O cabeçalho Content-Type deve ser application/json."
      });
    }
  }
  next();
}

module.exports = verificarContentTypeJson;
