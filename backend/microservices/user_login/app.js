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


async function signToken(user) {
    const secret = Buffer.from(process.env.JWT_SECRET, "base64");

    return jwt.sign({ id: user.username.S, roles: ["USER"] }, secret, {
        expiresIn: 86400 // expires in 24 hours
    });
}

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
        if (continue_ == false) {
            response.statusCode = 404
            response.body = JSON.stringify({ "message": "user doesn't exists" })
            return response
        }

        item = continue_.Item
        if (item.password.S === item_params.password.S) {
            jwtToken = await signToken(item)
            response.statusCode = 200
            response.body = JSON.stringify({ "message": "User Authenticated", "token": jwtToken })
            return response

        } else {
            response.statusCode = 400
            response.body = JSON.stringify({ "data": "Invalid Password" })
            return response
        }

    } catch (err) {
        console.log(err);
        response.statusCode = 500
        response.body = JSON.stringify({ "message": err })
        return response;
    }
};
