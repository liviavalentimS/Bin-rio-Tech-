function validaCnh(req, res, next) {
  const { cnh } = req.body;

  if (!cnh || typeof cnh !== 'string' || !/^\d{11}$/.test(cnh)) {
    return res.status(400).json({
      erro: "Bad Request",
      mensagem: "O campo 'cnh' deve conter exatamente 11 digitos numericos."
    });
  }

  next();
}

module.exports = validaCnh;
