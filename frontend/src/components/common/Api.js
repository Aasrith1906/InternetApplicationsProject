import AWS from 'aws-sdk';

var API_URL = 'https://olb8eoegi5.execute-api.eu-west-2.amazonaws.com/Prod';


function ddbMarshall(params) {
    return AWS.DynamoDB.Converter.marshall(params)
}
export { API_URL, ddbMarshall };