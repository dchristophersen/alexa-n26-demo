'use strict';

import { RichTextContentHelper } from 'ask-sdk';

const supportsDisplay = (handlerInput) => {
	var hasDisplay =
	  handlerInput.requestEnvelope.context &&
	  handlerInput.requestEnvelope.context.System &&
	  handlerInput.requestEnvelope.context.System.device &&
	  handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
	  handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;

	return hasDisplay;
}

export function generateBodyTemplate(handlerInput, template, primaryText) {
	let response = handlerInput.responseBuilder;

	if(supportsDisplay(handlerInput)) {
		
		const responseText = new RichTextContentHelper()
		.withPrimaryText(primaryText)
		.getTextContent();
  
		response.addRenderTemplateDirective({
		  type: template,
		  title: "BankingBuddy",
		  textContent: responseText,
		  });	
	  }


	return response;
}

export function generateListTemplate(handlerInput, template, listItems) {
	let response = handlerInput.responseBuilder;

	if(supportsDisplay(handlerInput)) {
  
		response.addRenderTemplateDirective({
		  type: template,
		  title: "BankingBuddy",
		  listItems: listItems,
		  });	
	  }


	return response;
}