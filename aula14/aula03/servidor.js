const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

// Rota de status
app.get('/status', (req, res) => {
    res.json({ sistema_telemetria: "ativo", status: "OK" });
});

// Rota Scania
app.get('/scania/info', (req, res) => {
    res.json({ montadora: "Scania", modelo: "R450", sistema_telemetria: "ativo", status: "OK", conexao: true, velocidade_media: 82 });
});

//Rota Volkswagen
app.get('/vw/info' , (req, res) => {
	res.json({ montadora: "Volkwagen", modelo: "Delivery" , sistema_telemetria:"ativo", status: "ALERTA",  conexao: false, velocidade_media: 0});
});

app.listen(PORT, () => {
    console.log(`[Binario Tec] Servidor rodando em http://localhost:${PORT}`);
});
