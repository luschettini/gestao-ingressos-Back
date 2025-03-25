const ticketModel = require("../models/ticketModel");


const getIngressos = async (req, res) => {
    try {
        const ingressos = await ticketModel.getIngressos();
        res.json(ingressos);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar ingresso(s)." });
    }
};

const getIngresso = async (req, res) => {
    try {
        const ingresso = await ticketModel.getIngressoById(req.params.id);
        if (!ingresso) {
            return res.status(404).json({ message: "Ingresso(s) não encontrado." });
        }
        res.json(ingresso);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar ingresso(s)." });
    }
};

const createIngresso = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
  
        const minPrecos = {
            Pista: 100,
            "Pista VIP": 200,
            Camarote: 300,
            Arquibancada: 80,
        };
  
        if (preco < minPrecos[categoria]) {
            return res.status(400).json({
                message: `Preço mínimo para ${categoria} é R$${minPrecos[categoria]},00.`,
            });
        }
  
        if (quantidade_disponivel <= 0) {
            return res.status(400).json({ message: "Ingressos esgotados." });
        }
  
        const newIngresso = await ticketModel.createIngresso(evento, local, data_evento, categoria, preco, quantidade_disponivel);
        res.status(201).json(newIngresso);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar ingresso." });
    }
  };
  
  
  const vendaIngresso = async (req, res) => {
    try {
        const { id, quantidade, preco } = req.body;
  
        if (preco === undefined || preco === null) {
            return res.status(400).json({ erro: "Preço é obrigatório." });
        }
  
        if (quantidade <= 0) {
            return res.status(400).json({ erro: "A quantidade deve ser maior que zero." });
        }
  
        const ingresso = await ticketModel.getIngressoById(id);
        if (!ingresso) {
            return res.status(404).json({ erro: "Ingresso não encontrado." });
        }
  
        if (ingresso.quantidade_disponivel === 0) {
            return res.status(400).json({ erro: "Ingressos esgotados." });
        }
  
        if (quantidade > ingresso.quantidade_disponivel) {
            return res.status(400).json({ erro: "Ingressos insuficientes para a venda." });
        }
  
        const minPrecos = {
            Pista: 100,
            "Pista VIP": 200,
            Camarote: 300,
            Arquibancada: 80,
        };
  
        if (preco < minPrecos[ingresso.categoria]) {
            return res.status(400).json({
                erro: `Preço mínimo para a categoria ${ingresso.categoria} é R$${minPrecos[ingresso.categoria]},00.`,
            });
        }
  
        const novaQuantidade = ingresso.quantidade_disponivel - quantidade;
        await ticketModel.updateQuantidade(id, novaQuantidade);
  
        const precoTotal = (preco * quantidade).toFixed(2);
        const precoUnitario = preco.toFixed(2);
  
        res.json({
            mensagem: "Compra realizada com sucesso!",
            evento: ingresso.evento,
            categoria: ingresso.categoria,
            preco_unitario: precoUnitario,
            quantidade_comprada: quantidade,
            preco_total: precoTotal,
            quantidade_restante: novaQuantidade
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao processar a venda." });
    }
  };
  

const updateIngresso = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        const updatedIngresso = await  ticketModel.updateIngresso(req.params.id, evento, local, data_evento, categoria, preco, quantidade_disponivel);
        if (!updatedIngresso) {
            return res.status(404).json({ message: "Ingresso(s) não encontrado." });
        }
        res.json(updatedIngresso);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar ingresso(s)." });
    }
};


const deleteIngresso = async (req, res) => {
    try {
        const message = await ticketModel.deleteIngresso(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir ingresso(s)." });
    }
};


module.exports = { getIngressos, getIngresso, createIngresso, vendaIngresso, updateIngresso, deleteIngresso };
