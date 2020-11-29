const mongoose = require('mongoose');
// const dateHelper = require('../helpers/dateHelpers.js'); --> não possui mais uso
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');
const { request } = require('express');


/* função para trazer período selecionado no front */
const findSelectedPeriod = async (request, response) => {
    try {
        if (!request.params.period) {
            response.status(400).send({ message: 'É necessário informar o parâmetro >period< no formato yyyy-mm junto a requisição.' });
        }

        const selectedPeriod = request.params.period;

        const periodData = await TransactionModel.find({ yearMonth: selectedPeriod });

        if (periodData === []) {
            response.status(400).send({ message: error.message || 'Não foi encontrado o período requisitado.' });
        }

        response.send(periodData);
    } catch (error) {
        response.status(500).send({ message: error.message || 'Ocorreu um erro interno ao buscar período requisitado.' });
    }
};


/* função para inserir um novo lançamento na base */
const createEntry = async (request, response) => {
    try {

        if (JSON.stringify(request.body) === '{}') {
            response.status(400).send({ message: 'Corpo da requisição não foi encontrado.' });
        }

        const newEntry = new TransactionModel({
            description: request.body.description,
            value: request.body.value,
            category: request.body.category,
            year: request.body.year,
            month: request.body.month,
            day: request.body.day,
            yearMonth: `${request.body.year}-${request.body.month.toString().padStart(2,'0')}`,
            yearMonthDay: `${request.body.year}-${request.body.month.toString().padStart(2,'0')}-${request.body.day.toString().padStart(2,'0')}`,
            type: request.body.type
        });

        const entryData = await newEntry.save();
        response.send(entryData);
    } catch (error) {
        response.status(500).send({ message: error.message || 'Ocorreu um erro interno ao salvar o lançamento.' });
    }
};


/* função para editar um lançamento já gravado */
const editEntry = async (request, response) => {
    try {
        if (JSON.stringify(request.body) === '{}') {
            response.status(400).send({ message: 'Corpo da requisição não foi encontrado.' });
        }

        if (JSON.stringify(request.body._id) === undefined) {
            response.status(400).send({ message: 'ID do registrado a ser editado não foi informado.' });
        }

        const id = request.body._id;

        const editedEntry = {
            description: request.body.description,
            value: request.body.value,
            category: request.body.category,
            year: request.body.year,
            month: request.body.month,
            day: request.body.day,
            yearMonth: `${request.body.year}-${request.body.month.toString().padStart(2,'0')}`,
            yearMonthDay: `${request.body.year}-${request.body.month.toString().padStart(2,'0')}-${request.body.day.toString().padStart(2,'0')}`,
            type: request.body.type
        };

        const entryData = await TransactionModel.findByIdAndUpdate({ _id: id }, editedEntry, {new: true});

        if (!entryData) {
            response.status(400).send({ message: error.message || 'Não encontramos o lançamento requisitado para atualizar.' });
        }
        response.send(entryData);
    } catch (error) {
        response.status(500).send({ message: error.message || 'Ocorreu um erro interno ao atualizar o lançamento.' });
    }
};


/* função para remover lançamento selecionado */
const removeEntry = async (request, response) => {
    try {
        if (JSON.stringify(request.body._id) === undefined) {
            response.status(400).send({ message: 'ID do registro a ser editado não foi informado.' });
        }

        const id = request.body._id;

        const entryData = await TransactionModel.findByIdAndRemove({ _id: id });
        if (!entryData) {
            response.status(400).send({ message: error.message || 'Não encontramos o lançamento requisitado para excluir.' });
        }
        response.send({ message: 'Lançamento excluído com sucesso.'});
    } catch (error) {
        response.status(500).send({ message: 'Ocorreu um erro interno ao excluir o lançamento.' });
    }
};


/* função para remover todos os lançamentos do período */
const removePeriodEntries = async (request, response) => {
    try {
        if (JSON.stringify(request.params.period) === undefined) {
            response.status(400).send({ message: 'Não foi informado um período para excluir os lançamentos.' });
        }

        const period = request.params.period;

        const entriesData = await TransactionModel.deleteMany({ yearMonth: period });
        if (!entriesData) {
            response.status(400).send({ message: error.message || 'Não encontramos nenhum lançamento para excluir no período.' });
        }
        response.send({ message: `Lançamentos do período ${period} excluídos com sucesso.`});
    } catch (error) {

    }
};


module.exports =  { findSelectedPeriod, createEntry, editEntry, removeEntry, removePeriodEntries };