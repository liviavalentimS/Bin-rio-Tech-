
function validaCnh(req, res, next) {
          const { cnh } = req.body;
        const cnhValida = typeof cnh === 'string' && /^\d{11}$/.test(cnh.trim());

  if (!cnhValida) {
    return res.status(400).json({
      erro: "CNH invalida. O campo 'cnh' e obrigatorio e deve conter exatamente 11 digitos numericos."
    });
  }

  next();
}

module.exports = validaCnh;
