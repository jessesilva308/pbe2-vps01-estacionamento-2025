app.post('/veiculos', async (req, res) => {
  const { placa, modelo, cor, ano } = req.body;
  try {
    const veiculo = await prisma.veiculo.create({
      data: { placa, modelo, cor, ano },
    });
    res.status(201).json(veiculo);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao cadastrar veículo' });
  }
});

app.get('/veiculos', async (req, res) => {
  const veiculos = await prisma.veiculo.findMany();
  res.json(veiculos);
});

app.get('/veiculos/:id', async (req, res) => {
  const { id } = req.params;
  const veiculo = await prisma.veiculo.findUnique({
    where: { id: parseInt(id) },
    include: { estadias: true },
  });
  if (!veiculo) return res.status(404).json({ error: 'Veículo não encontrado' });
  res.json(veiculo);
});

app.put('/veiculos/:id', async (req, res) => {
  const { id } = req.params;
  const { placa, modelo, cor, ano } = req.body;
  try {
    const veiculo = await prisma.veiculo.update({
      where: { id: parseInt(id) },
      data: { placa, modelo, cor, ano },
    });
    res.json(veiculo);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar veículo' });
  }
});

app.delete('/veiculos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.veiculo.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Veículo excluído com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao excluir veículo' });
  }
});