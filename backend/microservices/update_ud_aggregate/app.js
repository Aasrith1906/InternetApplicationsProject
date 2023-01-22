const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });
const ddb = new aws.DynamoDB({ apiVersion: '2012-08-10' });

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
    if (output.Item != null) {
        return output.Item
    } else {
        return {}
    }
}

function getChangeSet(current, new_data) {

    var changeSet = {}

    for (let k in new_data) {

        if (k != 'username' && k != "data_type") {
            if (current[k] == undefined || current['Increase'.concat(k)] == undefined || current['Last'.concat(k)] == undefined) {
                changeSet['Increase'.concat(k)] = "+100%"
                changeSet['Last'.concat(k)] = new_data[k]
            } else {
                var current_value = parseInt(current['Last'.concat(k)]['S'])
                var increase = ((parseInt(new_data[k]) - current_value) / current_value) * 100
                increase = increase.toFixed(2)
                if (increase < 0) {
                    changeSet['Increase'.concat(k)] = increase.concat("%")
                } else {
                    changeSet['Increase'.concat(k)] = "+".concat(increase).concat("%")
                }

                changeSet['Last'.concat(k)] = new_data[k]
            }
        }

    }

    return changeSet
}


async function updateDDB(data) {
    var username = data.username
    var tableName = "hlsp_datastore"
    let updateExpression = 'set';
    let ExpressionAttributeNames = {};
    let ExpressionAttributeValues = {};
    for (const property in data) {
        if (property !== 'username' && property !== 'data_type') {
            updateExpression += ` #${property} = :${property} ,`;
            ExpressionAttributeNames['#' + property] = property;
            ExpressionAttributeValues[':' + property] = data[property];
        }
    }
    ExpressionAttributeValues = aws.DynamoDB.Converter.marshall(ExpressionAttributeValues)
    updateExpression = updateExpression.slice(0, -1);
    var updateParams = {
        TableName: tableName,
        Key: {
            "username": {
                "S": username
            }
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: ExpressionAttributeNames,
        ExpressionAttributeValues: ExpressionAttributeValues
    }
    var output = await ddb.updateItem(updateParams).promise()
    return output
}


exports.lambdaHandler = async (event, context) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    // Get the object from the event and show its content type
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const params = {
        Bucket: bucket,
        Key: key,
    };
    try {
        const response = await s3.getObject(params).promise();
        const fileContent = JSON.parse(response.Body.toString('utf-8'))

        var data = await fetchData(ddb, fileContent.username)

        var changeSet = getChangeSet(data, fileContent)
        changeSet['username'] = fileContent.username
        output = await updateDDB(changeSet)
        return output;
    } catch (err) {
        console.log(err);
        const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
        console.log(message);
        throw new Error(message);
    }
};
