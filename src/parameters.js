'use strict';

import { config, SSM } from 'aws-sdk';

config.update({
  region: 'eu-west-1'
});

const parameterStore = new SSM();

export function getParam(param) {
    return new Promise((res, rej) => {
        parameterStore.getParameter({
        Name: param,
        WithDecryption: true
        }, (err, data) => {
            if (err) {
            return rej(err)
            }
            return res(data)
        })
    });
}