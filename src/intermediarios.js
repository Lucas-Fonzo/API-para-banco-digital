let { banco, contas, saques, depositos, transferencias, identificadorConta } = require('./bancodedados');

const validarSenha = (req, res, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(401).json({ mensagem: 'A senha não foi informada' });
    }

    if (senha_banco !== 'Cubos123Bank') {
        return res.status(403).json({ mensagem: 'A senha está incorreta' });
    }
    next();
}

const corpoRequisicaoCompleta = (req, res, next) => {
    let { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    // Verifica se todos os campos foram informados
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
    }
    next();
}

const validarExistenciaConta = (req, res, next) => {
    const { numeroConta } = req.params;

    // Verificar se o numero da conta passado como parametro na URL é válida
    const contaExistente = contas.find(conta => Number(conta.numeroConta) === Number(numeroConta));
    if (!contaExistente) {
        return res.status(400).json({ mensagem: "Numero de conta não encontrado." });
    }
    next();
}

module.exports = {
    validarSenha,
    corpoRequisicaoCompleta,
    validarExistenciaConta
}