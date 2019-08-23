# Alexa n26 tech demo aka BankingBuddy

This repo contains a simple tech demo for showing how easy it is to create a simple alexa skill with the [serverless framework](https://serverless.com/).

## Getting started

**Please keep in mind: this is only a demo and should not be used with an really used n26 account.** 

1. You need the serverless cli installed on your machine. A guide can be found here: https://serverless.com/framework/docs/getting-started/

2. Clone the repo
3. Run `npm i`
4. Create an alexa skill in the [amazon developer console](https://developer.amazon.com) using the content from `interactionModel.json`
5. Put your n26 login data as SecureStrings in the AWS Systems Manager parameter store. Use `bankingbuddy-dev-email` for the email and `bankingbuddy-dev-password` for the password
6. Replace placeholders with real values
    1. In the `serverless.yml` replace `{{AccountId}}` with your AWS account id
    2. In the `serverless.yml` replace `{{AlexaSkillId}}` with your alexa skill id
7. Run `serverless deploy`
8. Copy the ARN of your deployed lambda function to the endpoints section of your alexa skill

