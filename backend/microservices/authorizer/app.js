// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
var AWS = require('aws-sdk');
const jwt = require("jsonwebtoken");
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

function generateAuthResponse(principalId, effect, methodArn) {
    const policyDocument = generatePolicyDocument(effect, methodArn);

    return {
        principalId,
        policyDocument
    };
}

function generatePolicyDocument(effect, methodArn) {
    if (!effect || !methodArn) return null;

    const policyDocument = {
        Version: "2012-10-17",
        Statement: [
            {
                Action: "execute-api:Invoke",
                Effect: effect,
                Resource: methodArn
            }
        ]
    };

    return policyDocument;
}

exports.lambdaHandler = async (event, context) => {

    response = {
        statusCode: 200,
        body: JSON.stringify({}),
        isBase64Encoded: false,
        headers: {}
    }
    try {
        const token = event.authorizationToken.replace("Bearer ", "");
        const methodArn = event.methodArn;

        if (!token || !methodArn) return callback(null, "Unauthorized");

        const secret = Buffer.from(process.env.JWT_SECRET, "base64");

        // verifies token
        const decoded = jwt.verify(token, secret);

        if (decoded && decoded.id) {
            return callback(null, generateAuthResponse(decoded.id, "Allow", methodArn));
        } else {
            return callback(null, generateAuthResponse(decoded.id, "Deny", methodArn));
        }

    } catch (err) {
        console.log(err);
        return callback(null, generateAuthResponse(decoded.id, "Deny", methodArn));
    }
};
