const express = require('express');
const service = require('../services/transactionService.js');

const transactionRouter = express.Router();

transactionRouter.get('/:period', service.findSelectedPeriod);
transactionRouter.post('/', service.createEntry);
transactionRouter.put('/', service.editEntry);
transactionRouter.delete('/', service.removeEntry);
transactionRouter.delete('/:period', service.removePeriodEntries);

module.exports = transactionRouter;
