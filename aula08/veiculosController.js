const db = require('../database/connection');

const veiculosController = {
        listarTodos: async (req, res) => {
                try {
                        const veiculos = await db('veiculos').select('*');
                        res.status(200).json(veiculos);
                } catch (erro) {
                        res.status(500).json({ erro: "Erro ao consultar banco de dados."});
                }
        },

        criar: async (req, res) => {
                try {
                        const { placa, montadora, modelo} = req.body;

                        if (!placa || !montadora || !modelo) {
                                return res.status(400).json({ erro: "Campos 'placa', 'montadora' e 'modelo' sao obrigatorios."});
                        }

                        const [id] = await db('veiculos').insert({
                                placa,
                                montadora,
                                modelo
                        });
	buscarPorId: async (req, res) => {
		try {
			const { id } = req.params;
			const veiculo = await db('veiculos').where({ id }).first();

			if (!veiculo) {
				return res.status(404).json({ erro: "Veículo não encontrado." });
			}

			res.status(200).json(veiculo);
		} catch (erro) {
			res.status(500).json({ erro: "Erro ao consultar banco de dados." });
		}
	},
                        const novoVeiculo = await
                                db('veiculos').where('id', id).first();
                        res.status(201).json(novoVeiculo);
                } catch (erro) {
                        if (erro.message.includes('UNIQUE constraint failed')) {
                                return res.status(409).json({ erro: "Ja existe um veiculo cadastrado com essa placa." });
                        }
                        res.status(500).json({ erro: "Erro ao inserir veiculo no banco de dados."});
                }
        }
        };

module.exports = {
  // ...outros métodos já existentes,
  buscarPorId,
};
