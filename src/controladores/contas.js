let { banco, contas, saques, depositos, transferencias, identificadorConta } = require('../bancodedados');



const listagemContas = (req, res) => {
    if (!contas.length) {
        return res.status(200).json({ mensagem: "nenhuma conta encontrada" });
    }
    return res.status(200).json(contas);
}


const criarConta = (req, res) => {
    let { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    // Verifica se CPF ou e-mail já estão em uso
    const contaExistente = contas.find(conta => conta.cpf === cpf || conta.email === email);
    if (contaExistente) {
        return res.status(400).json({ mensagem: "Já existe uma conta com o CPF ou e-mail informado." });
    }

    // Cria uma nova conta com saldo inicial zero e número único
    const novaConta = {
        numeroConta: identificadorConta++,
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha,
        saldo: 0
    };

    // Adiciona a nova conta ao banco de dados
    contas.push(novaConta);

    // Retorna resposta de sucesso
    return res.status(201).send();
};

const atualizarUsuario = (req, res) => {
    let { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params;


    // Se o CPF for informado, verificar se já existe outro registro com o mesmo CPF
    const dadoRepetido = contas.find(conta => conta.cpf === cpf || conta.email === email);
    if (dadoRepetido && Number(dadoRepetido.numeroConta) !== Number(numeroConta)) {
        return res.status(400).json({ mensagem: "Já existe uma conta com o CPF ou e-mail informado." });
    }

    const conta = contas.find((conta) => {
        return conta.numeroConta === Number(numeroConta);
    });

    conta.nome = nome;
    conta.cpf = cpf;
    conta.data_nascimento = data_nascimento;
    conta.telefone = telefone;
    conta.email = email;
    conta.senha = senha;

    return res.status(204).send();
}

const deletarConta = (req, res) => {
    const { numeroConta } = req.params;

    const conta = contas.find((conta) => {
        return conta.numeroConta === Number(numeroConta);
    });

    if (Number(conta.saldo) !== 0) {
        return res.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" })
    }
    contas = contas.filter((conta) => {
        return conta.numeroConta !== Number(numeroConta);
    });
    return res.status(200).send()
}

module.exports = {
    listagemContas,
    criarConta,
    atualizarUsuario,
    deletarConta
}