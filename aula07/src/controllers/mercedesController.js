
let frotaMercedes = [];

const listarFrota = (req, res) => {
	  res.status(200).json(frotaMercedes);
};

const cadastrarCaminhao = (req, res) => {
	  const { modelo, vin, placa } = req.body;

	  if (!modelo || !vin || !placa) {
		      return res.status(400).json({ erro: "Campos obrigatórios: modelo, vin, placa" });
		    }

	  const modelosValidos = ["Actros", "Atego"];
	  if (!modelosValidos.includes(modelo)) {
		      return res.status(400).json({ erro: "Modelo deve ser Actros ou Atego" });
		    }

	  const novoCaminhao = { id: frotaMercedes.length + 1, modelo, vin, placa };
	  frotaMercedes.push(novoCaminhao);

	  res.status(201).json(novoCaminhao);
};

module.exports = { listarFrota, cadastrarCaminhao };
