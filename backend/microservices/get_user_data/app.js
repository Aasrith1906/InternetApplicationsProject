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
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
AWS.config.update({ region: 'eu-west-2' });




async function checkUserExists(ddb, username) {
    var params = {
        Key: {
            "username": {
                S: username
            }
        },
        TableName: "hlsp_user_data"
    };

    output = await ddb.getItem(params).promise()
    console.log(output)
    if (output.Item != null) {
        return output
    } else {
        return false
    }
}
async function fetchData(ddb, username) {
    var params = {
        Key: {
            "username": {
                S: username
            }
        },
        TableName: "hlsp_datastore"
    };

    output = await ddb.getItem(params).promise()
    console.log(output)
    if (output.Item != null) {
        return output.Item
    } else {
        return {}
    }
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

        var continue_ = await checkUserExists(ddb, item_params.username)
        if (continue_ == false) {
            response.statusCode = 404
            response.body = JSON.stringify({ "message": "user doesn't exist" })
            return response
        }

        output = await fetchData(ddb, item_params.username)
        response.body = JSON.stringify({ "data": AWS.DynamoDB.Converter.unmarshall(output) })
        return response

    } catch (err) {
        console.log(err);
        response.statusCode = 500
        response.body = JSON.stringify({ "message": "An Error has occurred" })
        return response;
    }
};
