const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const ARQUIVO_DADOS = path.join(__dirname, 'ocorrencias.json');

app.use(cors());
app.use(express.json());

// Funcao Auxiliar: Ler Arquivo JSON
async function lerOcorrencias() {
	try {
		const dados = await fs.readFile(ARQUIVO_DADOS, 'utf-8');
		return JSON.parse(dados);
	} catch (erro) {
		// Se o arquivo não existir, retorna array vazia e cria o arquivo
		await fs.writeFile(ARQUIVO_DADOS, '[]', 'utf-8');
		return [];
	}
}

// Função Auxiliar: Salvar no Arquivo JSON
async function salvarOcorrencias(ocorrencia) {
	await fs.writeFile(ARQUIVO_DADOS, JSON.stringify(ocorrencia, null, 2), 'utf-8');
}

// Rota 1: Listar todas as ocorrencias
app.get('/api/v1/ocorrencias', async (req, res) => {
	try {
		const ocorrencias = await lerOcorrencias();
		res.status(200).json(ocorrencias);
	} catch (erro) {
		res.status(500).json({ erro: "Erro ao ler base de dados em disco." });
	}
});

// Rota 2: Listar ocorrencias filtradas por montadora
app.get('/api/v1/ocorrencias/montadora/:nome', async (req, res) => {
	try {
		const { nome } = req.params;
		const ocorrencias = await lerOcorrencias();
		const filtradas = ocorrencias.filter(
			o => o.montadora.toLowerCase() === nome.toLowerCase()
		);
		res.status(200).json(filtradas);
	} catch (erro) {
		res.status(500).json({ erro: "Erro ao filtrar ocorrencias por montadora." });
	}
});

// Rota 3: Cadastrar nova ocorrencia na frota
app.post('/api/v1/ocorrencias', async (req, res) => {
	try {
		const { montadora, placa, descricao, gravidade } = req.body;

		if (!montadora || !placa || !descricao) {
			return res.status(400).json({ erro: "Montadora, placa e descricao sao obrigatorios." });
		}

		const ocorrencias = await lerOcorrencias();
		const novaOcorrencia = {
			id: Date.now(),
			montadora,
			placa,
			descricao,
			gravidade: gravidade || "MEDIA",
			data_registro: new Date().toISOString()
		};

		ocorrencias.push(novaOcorrencia);
		await salvarOcorrencias(ocorrencias);

		res.status(201).json(novaOcorrencia);
	} catch (erro) {
		res.status(500).json({ erro: "Erro ao salvar ocorrencias em disco." });
	}
});

// Rota 4: Remover ocorrencia por ID
app.delete('/api/v1/ocorrencias/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const ocorrencias = await lerOcorrencias();
		const existe = ocorrencias.some(o => String(o.id) === String(id));

		if (!existe) {
			return res.status(404).json({ erro: "Ocorrencia nao encontrada." });
		}

		const atualizadas = ocorrencias.filter(o => String(o.id) !== String(id));
		await salvarOcorrencias(atualizadas);

		res.status(200).json({ mensagem: "Ocorrencia removida com sucesso.", id });
	} catch (erro) {
		res.status(500).json({ erro: "Erro ao remover ocorrencia do disco." });
	}
});

app.listen(PORT, () => {
	console.log(`[Binario Tech] API de ocorrencias ativa na porta ${PORT}`);
});
