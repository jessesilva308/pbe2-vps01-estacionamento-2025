app.post('/estadias', async (req, res) => {
  const { veiculoId } = req.body;
  try {
    const estadia = await prisma.estadia.create({
      data: { veiculoId },
    });
    res.status(201).json(estadia);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao cadastrar estadia' });
  }
});

app.put('/estadias/:id', async (req, res) => {
  const { id } = req.params;
  const { saida, valorHora } = req.body;

  try {
    const estadia = await prisma.estadia.findUnique({ where: { id: parseInt(id) } });
    if (!estadia) return res.status(404).json({ error: 'Estadia não encontrada' });

    const saidaDate = saida ? new Date(saida) : null;
    const valorTotal = saidaDate
      ? valorHora * ((saidaDate - new Date(estadia.entrada)) / 3600000)
      : null;

    const updatedEstadia = await prisma.estadia.update({
      where: { id: parseInt(id) },
      data: { saida: saidaDate, valorTotal },
    });
    res.json(updatedEstadia);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar estadia' });
  }
});

app.delete('/estadias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.estadia.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Estadia excluída com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao excluir estadia' });
  }
});