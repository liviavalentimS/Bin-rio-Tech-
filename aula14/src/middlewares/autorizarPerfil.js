const autorizarPerfil = (perfisPermitidos) => {
  return (req, res, next) => {
    const perfilUsuario = req.usuario && req.usuario.perfil;

    if (!perfilUsuario || !perfisPermitidos.includes(perfilUsuario)) {
      return res.status(403).json({
        status: "ERRO",
        mensagem: "Acesso negado. Você não possui permissão para acessar este recurso."
      });
    }

    next();
  };
};

module.exports = autorizarPerfil;
