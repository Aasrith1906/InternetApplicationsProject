// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
var AWS = require('aws-sdk');
var s3 = new AWS.S3({ apiVersion: '2006-03-01' });
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
AWS.config.update({ region: 'eu-west-2' });

const {
    randomUUID
} = import('node:crypto');


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


/*
    This Lambda function pushes data into the hlsp-data-lake 
*/

var S3BucketName = "hlsp-data-lake"
var ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
AWS.config.update({ region: 'eu-west-2' });





async function fetchData(ddb, type) {
    var params = {
        TableName: "hlsp_metadata",
        FilterExpression: "#type = :type",
        ExpressionAttributeNames: { "#type": "type" },
        ExpressionAttributeValues: { ":type": type }
    };

    output = await ddb.scan(params).promise()
    return output.Items
}

exports.lambdaHandler = async (event, context) => {

    response = {
        statusCode: 200,
        body: JSON.stringify({}),
        isBase64Encoded: false,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST"
        }
    }

    try {

        event = JSON.parse(event.body)
        item_params = event

        output = await fetchData(ddb, item_params.type)
        response.body = JSON.stringify({ "data": output })
        return response

    } catch (err) {
        console.log(err);
        response.statusCode = 500
        response.body = JSON.stringify({ "message": "An Error has occurred" })
        return response;
    }
};
