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

async function getS3Directory(input_data) {

    const {
        randomUUID
    } = await import('node:crypto');

    var user = input_data.username
    var date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDay()

    var directory = `healthData/${user}/${year}/${month}/${day}/${randomUUID()}`

    return directory

}

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

async function pushToS3(bucket_name, file_path, data) {
    var params = {
        Bucket: bucket_name,
        Key: file_path,
        Body: JSON.stringify(data)
    }

    output = await s3.upload(params).promise()
}

exports.lambdaHandler = async (event, context) => {

    response = {
        statusCode: 200,
        body: JSON.stringify({}),
        isBase64Encoded: false,
        headers: {}
    }

    try {
        // const ret = await axios(url);

        event = JSON.parse(event.body)
        item_params = event

        var continue_ = await checkUserExists(ddb, item_params.username)
        if (continue_ == false) {
            response.statusCode = 404
            response.body = JSON.stringify({ "message": "user doesn't exist" })
            return response
        }

        directory = await getS3Directory(item_params)
        output = await pushToS3(S3BucketName, directory, item_params)
        response.body = JSON.stringify(output)
        return response

    } catch (err) {
        console.log(err);
        response.statusCode = 500
        response.body = JSON.stringify({ "message": err })
        return response;
    }
};
