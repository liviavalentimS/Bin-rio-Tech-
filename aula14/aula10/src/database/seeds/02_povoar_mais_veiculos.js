/**
 * Seed adicional: insere mais veículos SEM apagar os dados existentes.
 * Diferente do seed principal (01_povoar_frota.js), que usa del() antes de inserir,
 * este seed apenas adiciona novos registros, preservando os já existentes.
 */
exports.seed = async function (knex) {
  const veiculos = [
    { placa: 'MBZ-4E21', montadora: 'Mercedes-Benz', modelo: 'Actros 2651' },
    { placa: 'DAF-9K18', montadora: 'DAF', modelo: 'XF 480' }
  ];

  // Evita duplicar caso o seed rode mais de uma vez
  for (const veiculo of veiculos) {
    const existe = await knex('veiculos')
      .where({ placa: veiculo.placa })
      .first();

    if (!existe) {
      await knex('veiculos').insert(veiculo);
    }
  }
};
