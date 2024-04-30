let { banco, contas, saques, depositos, transferencias, identificadorConta } = require('../bancodedados');

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;

    // Verifica se todos os campos foram informados
    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" });
    }

    // Verifica se o valor é válido
    if (Number(valor) <= 0) {
        return res.status(400).json({ mensagem: "O valor deve ser maior que zero." });
    }

    const conta = contas.find((conta) => conta.numeroConta === Number(numero_conta));

    // Verifica se a conta existe
    if (!conta) {
        return res.status(404).json({ mensagem: "Conta não encontrada." });
    }

    // Realiza o depósito
    conta.saldo += Number(valor);

    // Registro do depósito
    const registroDeposito = {
        data: new Date().toISOString(),
        numero_conta: numero_conta,
        valor: Number(valor)
    };
    depositos.push(registroDeposito);

    // Retorna confirmação de sucesso
    return res.status(200).send();
}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    // Verifica se todos os campos foram informados
    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: "todos os elementos são obrigatórios!" });
    }

    // Verifica se o valor do saque é válido
    if (Number(valor) <= 0) {
        return res.status(400).json({ mensagem: "O valor do saque não pode ser menor ou igual a zero!" });
    }

    // Verifica se a conta existe
    const conta = contas.find((conta) => conta.numeroConta === Number(numero_conta));
    if (!conta) {
        return res.status(404).json({ mensagem: "Conta não encontrada." });
    }

    // Verifica se a senha está correta
    if (conta.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta." });
    }

    // Verifica se há saldo disponível para o saque
    if (conta.saldo < Number(valor)) {
        return res.status(403).json({ mensagem: "Saldo insuficiente." });
    }

    // Realiza o saque
    conta.saldo -= Number(valor);

    // Registro do saque
    const registroSaque = {
        data: new Date().toISOString(),
        numero_conta: numero_conta,
        valor: Number(valor)
    };
    saques.push(registroSaque);

    // Retorna confirmação de sucesso
    return res.status(200).json({ mensagem: "Saque realizado com sucesso." });

}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    // Verifica se todos os campos foram informados
    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
    }

    // Verifica se o valor da transferência é válido
    if (Number(valor) <= 0) {
        return res.status(400).json({ mensagem: "O valor da transferência deve ser maior que zero." });
    }

    // Verifica se as contas de origem e destino existem
    const contaOrigem = contas.find(conta => conta.numeroConta === Number(numero_conta_origem));
    const contaDestino = contas.find(conta => conta.numeroConta === Number(numero_conta_destino));

    if (!contaOrigem || !contaDestino) {
        return res.status(404).json({ mensagem: "Conta de origem ou destino não encontrada." });
    }

    // Verifica se a senha da conta de origem está correta
    if (contaOrigem.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta." });
    }

    // Verifica se há saldo disponível na conta de origem para a transferência
    if (contaOrigem.saldo < Number(valor)) {
        return res.status(403).json({ mensagem: "Saldo insuficiente." });
    }

    // Realiza a transferência
    contaOrigem.saldo -= Number(valor);
    contaDestino.saldo += Number(valor);

    // Registro da transferência
    const registroTransferencia = {
        data: new Date().toISOString(),
        numero_conta_origem: numero_conta_origem,
        numero_conta_destino: numero_conta_destino,
        valor: Number(valor)
    };
    transferencias.push(registroTransferencia);

    // Retorna uma resposta indicando sucesso
    return res.status(200).json({ mensagem: "Transferência realizada com sucesso." });
}

const saldo = (req, res) => {
    const { numero_conta, senha } = req.query;

    // Verifica se o número da conta e a senha foram informadas
    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: "O número da conta e a senha são obrigatórios." });
    }

    // Verifica se a conta bancária informada existe
    const conta = contas.find(conta => conta.numeroConta === Number(numero_conta));

    if (!conta) {
        return res.status(404).json({ mensagem: "Conta bancária não encontrada." });
    }

    // Verifica se a senha informada é válida
    if (conta.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta." });
    }

    // Retorna o saldo da conta
    return res.status(200).json({ saldo: conta.saldo });
}

const extrato = (req, res) => {
    const { numero_conta, senha } = req.query;

    // Verifica se o número da conta e a senha foram informadas
    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: "O número da conta e a senha são obrigatórios." });
    }

    // Verifica se a conta bancária informada existe
    const conta = contas.find(conta => conta.numeroConta === Number(numero_conta));

    if (!conta) {
        return res.status(404).json({ mensagem: "Conta bancária não encontrada." });
    }

    // Verifica se a senha informada é válida
    if (conta.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta." });
    }

    // Filtra as transações relacionadas à conta específica
    const extratoConta = {
        depositos: depositos.filter(transacao => transacao.numero_conta === numero_conta),
        saques: saques.filter(transacao => transacao.numero_conta === numero_conta),
        transferenciasEnviadas: transferencias.filter(transacao => transacao.numero_conta_origem === numero_conta),
        transferenciasRecebidas: transferencias.filter(transacao => transacao.numero_conta_destino === numero_conta)
    };

    // Retorna o extrato da conta
    return res.status(200).json(extratoConta);
}

module.exports = {
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
}