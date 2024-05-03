const express = require('express');
const { listagemContas, criarConta, atualizarUsuario, deletarConta } = require('./controladores/contas');
const { depositar, sacar, transferir, saldo, extrato } = require('./controladores/transacoes');
const { validarSenha, corpoRequisicaoCompleta, validarExistenciaConta } = require('./intermediarios')

const rotas = express();

rotas.get('/contas', validarSenha, listagemContas);
rotas.post('/contas', corpoRequisicaoCompleta, criarConta)
rotas.put('/contas/:numeroConta/usuario', corpoRequisicaoCompleta, validarExistenciaConta, atualizarUsuario)
rotas.delete('/contas/:numeroConta', validarExistenciaConta, deletarConta)
rotas.get('/contas/saldo', saldo)
rotas.get('/contas/extrato', extrato)

rotas.post('/transacoes/depositar', depositar)
rotas.post('/transacoes/sacar', sacar)
rotas.post('/transacoes/transferir', transferir)


module.exports = rotas;