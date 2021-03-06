var AWS = require('aws-sdk');

/* Globabl variables */

//AWS CognitioCredentials
var CognitioCredentials = {
    poolId: 'us-east-2:df51fc61-e512-4543-b81d-d1af4db80644',
    endpoint: 'abno170pso3ez.iot.us-east-2.amazonaws.com',
    region: 'us-east-2'
};

//S3 Bucket Configurations
var S3Bucket = {
    bucketName: "fypcementbucket",
}

//Array that holds info about all the models in the cloud
var PredictiveModels = []

//Json object that holds the model name as its key and the model path as its value
var modelPaths = {}

/* Methods */

// Initialize the configuration.
AWS.config.update({
    region: CognitioCredentials.region,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: CognitioCredentials.poolId
    })
});

//Initialise S3 client
var s3 = new AWS.S3();

const GetModelInfo = (modelInfoPath, modelPath) => {
    //Initalise parameters to retrieve models path from the s3 bucket
    var params = { Bucket: S3Bucket.bucketName, Key: modelInfoPath };
    //Read the modelName and Accuracy from the .txt file
    s3.getObject(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            PredictiveModels.push({ modelName: Buffer.from(data.Body).toString('utf8'), accuracy: null, path: "s3://" + S3Bucket.bucketName + "/" + modelPath });
            modelPaths[Buffer.from(data.Body).toString('utf8')] = "s3://" + S3Bucket.bucketName + "/" + modelPath;
            if (PredictiveModels.length === 4) console.log(PredictiveModels)
        }
    });
}

const GetModelPath = () => {

    //Initalise parameters to retrieve models path from the s3 bucket
    var params = { Bucket: S3Bucket.bucketName, Delimiter: '/', Prefix: 'models/' };

    //Find path to the different model available in the S3 bucket
    s3.listObjects(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            data.CommonPrefixes.forEach(function (item, index) {
                //model directory
                params.Prefix = item.Prefix;

                s3.listObjects(params, function (err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    else {
                        GetModelInfo(item.Prefix + "model_info.txt", data.CommonPrefixes[0].Prefix);
                    }
                })

            })
        }

    });
}

//GetModelPath()

var awsIot = require('aws-iot-device-sdk');
var cognitoIdentity = new AWS.CognitoIdentity();
var webMqttClient;
var CONNECTION_STATUS = false;



const InitialiseMQTTClient = () => {
    AWS.config.credentials.get(function (err, data) {
        if (!err) {
            console.log('retrieved identity from Cognito: ' + AWS.config.credentials.identityId);
            var params = {
                IdentityId: AWS.config.credentials.identityId
            };
            cognitoIdentity.getCredentialsForIdentity(params, function (err, data) {
                if (!err) {
                    var webMqttClient = awsIot.device({
                        //Set region
                        region: CognitioCredentials.region,
                        
                        //Set endpoint
                        host: CognitioCredentials.endpoint,
    
                        // Connect via secure WebSocket
                        protocol: 'wss',
    
                        // Set Access Key, Secret Key and session token based on credentials from Cognito
                        accessKeyId: data.Credentials.AccessKeyId,
                        secretKey: data.Credentials.SecretKey,
                        sessionToken: data.Credentials.SessionToken
    
                    });
                    
                    webMqttClient.on('connect', function () {
                        console.log('connected');
                        CONNECTION_STATUS = true;
                    });
    
                    webMqttClient.on('disconnect', function () {
                        console.log('connected');
                        CONNECTION_STATUS = false;
                    });
    
                    webMqttClient.on('error', function (err) {
                        console.log(err);
                    });
                }
            })
        }
    });
}

const Publish_to_MQTT_Topic = (pubTopic,payload) =>{
    if(CONNECTION_STATUS){
        webMqttClient.publish(pubTopic,JSON.stringify(payload));
    }
}

const Subscribe_to_MQTT_Topic = (subTopic) =>{
    if(CONNECTION_STATUS){
        webMqttClient.subscribe(subTopic);
    }
}


