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



async function checkUserExists(ddb, username) {
    var params = {
        ExpressionAttributeValues: {
            ":v1": {
                S: username
            }
        },
        KeyConditionExpression: "username = :v1",
        TableName: "hlsp_user_data"
    };

    output = await ddb.query(params).promise()
    console.log(output)
    if (output.Count > 0) {
        return true
    } else {
        return false
    }
}

exports.lambdaHandler = async (event, context) => {

    response = {
        statusCode: 200,
        body: JSON.stringify({}),
        isBase64Encoded: false,
        headers: {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Credentials": true
        }
    }

    try {
        // const ret = await axios(url);

        event = JSON.parse(event.body)
        item_params = event
        var continue_ = await checkUserExists(ddb, item_params.username.S)
        if (continue_ == true) {
            response.body = JSON.stringify({ "message": "user already exists" })
            response.statusCode = 409
            return response
        }
        params = {
            TableName: "hlsp_user_data",
            Item: item_params
        }

        output = await ddb.putItem(params).promise()

        response.body = JSON.stringify({ "data": output })
        return response

    } catch (err) {
        console.log(err);
        response.statusCode = 500
        response.body = JSON.stringify({ "message": err })
        return response;
    }
};
