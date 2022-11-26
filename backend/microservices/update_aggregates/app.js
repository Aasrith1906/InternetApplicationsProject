

// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
AWS.config.update({ region: 'eu-west-2' });

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */




exports.lambdaHandler = async (event, context) => {
    try {
        // const ret = await axios(url);

        params = {
            TableName: "oncampusday-ddb"
        }
        data = await ddb.scan(params).promise()
        device_list = []
        for (let i = 0; i < data['Items'].length; ++i) {
            device_list.push({ "uniqueId": data['Items'][i]['uniqueId'], "deviceName": data['Items'][i]['deviceName'] })
        }
        response = {
            statusCode: 200,
            body: JSON.stringify({
                "data": device_list
            }),
            isBase64Encoded: false,
            headers: {}
        }

        return response

    } catch (err) {
        console.log(err);
        return err;
    }
};
