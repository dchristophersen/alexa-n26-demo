'use strict';

import { SkillBuilders } from 'ask-sdk';

import { getBalance } from './src/api';
import { getTransactions } from './src/api';
import { generateBodyTemplate, generateListTemplate } from './src/helpers';

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {

    let response = generateBodyTemplate(handlerInput, 'BodyTemplate2', 'Willkommen! Was kann ich für dich tun?');
   
    return response
      .speak('Willkommen! Was kann ich für dich tun?')
      .getResponse();
  },
};

const BalanceRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'BalanceIntent';
  },
  async handle(handlerInput) {

    const balance = await getBalance();

    let response = generateBodyTemplate(handlerInput, 'BodyTemplate2', 'Dein Kontostand ist ' + balance.usableBalance + "€");
   
    return response
      .speak('Dein Kontostand ist '+ balance.usableBalance +'€')
      .getResponse();
  },
};

const TransactionsRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'TransactionsIntent';
  },
  async handle(handlerInput) {

    const transactions = await getTransactions();

    let response = generateListTemplate(handlerInput, 'ListTemplate1', transactions);
   
    return response
      .speak('Deine letzten Transaktionen sind folgende.')
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    console.log('Inside SessionEndedRequestHandler');
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

/* LAMBDA SETUP */
const skillBuilder = SkillBuilders.custom();
export const app = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    BalanceRequestHandler,
    TransactionsRequestHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
