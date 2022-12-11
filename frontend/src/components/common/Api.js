import AWS from 'aws-sdk';

var API_URL = 'https://u74pmvelrk.execute-api.eu-west-2.amazonaws.com/Prod';


function ddbMarshall(params) {
    return AWS.DynamoDB.Converter.marshall(params)
}
export { API_URL, ddbMarshall };