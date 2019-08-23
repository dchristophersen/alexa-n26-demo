'use strict';

import { N26 } from "n26-api";
import { PlainTextContentHelper } from 'ask-sdk';
import moment from 'moment';

import { getParam } from './parameters';

let api = null;

const initApi = async () => {
    let email = await getParam('bankingbuddy-dev-email');
    let password = await getParam('bankingbuddy-dev-password');

    api = new N26(email.Parameter.Value, password.Parameter.Value);
}

export async function getBalance() {
    if(api === null) {
        await initApi();
    }

    let balance = null;

    await api.authenticate()
        .then(() => api.getBalance())
        .then((response) => {
            balance = response;
        })
        .catch(console.error);

    return balance;
}

export async function getTransactions() {

    if(api === null) {
        await initApi();
    }

    let transactions = new Array();

    await api.authenticate()
        .then(() => api.getTransactions(new Date('2018-01-01'), new Date(), 10))
        .then((response) => {
            response.forEach(transaction => {

            const textContent = transaction.hasOwnProperty('partnerName') ? transaction.partnerName : transaction.merchantName


            transactions.push({
                token: transaction.id,
                textContent: new PlainTextContentHelper()
                .withPrimaryText(transaction.amount + "€")
                .withSecondaryText(textContent)
                .withTertiaryText(moment(transaction.visibleTS).format('DD.MM.YYYY'))
                .getTextContent()
            }); 
        })
        .catch(console.error);

    return transactions;
}