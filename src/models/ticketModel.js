const getAllIngressos = async (req, res) => {
    try {
        const ingressos = await ticketModel.getIngressos();
        res.json(ingressos);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar ingresso(s)." 
        });
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
        const newIngresso = await ticketModel.createUser(evento, local, data_evento, categoria, preco, quantidade_disponivel);
        res.status(201).json(newIngresso);
    } catch (error) {
     console.log(error);
        if (error.code === "23505") { // Código de erro do PostgreSQL para chave única violada
            return res.status(400).json({ message: "Ingresso já cadastrado." });
        }
        res.status(500).json({ message: "Erro ao criar usuário." });
    }
};
