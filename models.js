function initialiseNavWatcher() {
  const currentPage = window.location.pathname;
  const currentPathName = currentPage.split('/')[1];

  // all anchor tags that are nav links
  const allNavLinks = document.querySelectorAll(`.navbar-nav .nav-item a`);

  allNavLinks.forEach((navLink) => {
    // one anchor tag
    const navLinkHref = navLink.href;

    const pathName = navLinkHref.split('/').pop();

    if (pathName === currentPathName) {
      navLink.parentElement.classList.add('active');
    }
  });
}

initialiseNavWatcher();

// Creating -> blue
// Updating -> blue
// Deleting -> red
// Failed -> red
// Inservice -> green

//Write a function that takes in a json object to fill in the deployed predictive model section
const populatePredictiveModel = (data) => {
  const tableBodyRowElements = document.querySelectorAll(
    '#deployed-predictive-model-table tbody tr'
  );

  const colorByDeploymentStatus = {
    creating: 'blue',
    updating: 'blue',
    deleting: 'red',
    failed: 'red',
    inService: 'green',
  };

  const labelByDeploymentStatus = {
    creating: 'Creating',
    updating: 'Updating',
    deleting: 'Deleting',
    failed: 'Failed',
    inService: 'In Service',
  };

  const btnClassByColor = {
    red: 'btn-danger',
    blue: 'btn-primary',
    green: 'btn-success',
  };

  console.log('tableBodyRowElements: ', tableBodyRowElements);

  tableBodyRowElements.forEach((rowElement) => {
    const rowParameter = rowElement.dataset.row;
    const rowDataElements = rowElement.querySelectorAll('td');

    // currently only expecting 1 <td> element per row
    rowDataElements.forEach((dataElement) => {
      if (rowParameter === 'deploymentStatus') {
        const foundButtonElement = dataElement.querySelector('button');
        const foundSpinnerElement = dataElement.querySelector(
          '.loading-spinner'
        );

        if (!data || !data[rowParameter]) {
          foundButtonElement.classList.remove(
            'btn-danger',
            'btn-success',
            'btn-primary'
          );

          foundButtonElement.textContent = '-';
          if (foundSpinnerElement) {
            foundSpinnerElement.remove();
          }

          return;
        }

        const color = colorByDeploymentStatus[data.deploymentStatus];
        const btnClass = btnClassByColor[color];
        const label = labelByDeploymentStatus[data.deploymentStatus];

        foundButtonElement.classList.remove(
          'btn-danger',
          'btn-success',
          'btn-primary'
        );
        foundButtonElement.classList.add(btnClass);
        foundButtonElement.textContent = label;

        if (
          data.deploymentStatus === 'updating' ||
          data.deploymentStatus === 'creating' ||
          data.deploymentStatus === 'deleting'
        ) {
          if (!foundSpinnerElement) {
            const spinnerElement = document.createElement('div');
            spinnerElement.classList.add('loading-spinner');
            foundButtonElement.insertAdjacentElement(
              'afterend',
              spinnerElement
            );
          }
        } else {
          if (foundSpinnerElement) {
            foundSpinnerElement.remove();
          }
        }
      } else {
        if (!data[rowParameter]) {
          dataElement.textContent = '-';
        } else {
          dataElement.textContent = data[rowParameter];
        }
      }
    });
  });
};

const fakeData = {
  modelName: 'someModelName',
  modelAccuracy: 80,
  deploymentStatus: 'updating',
};

const fakeData2 = {
  modelName: 'someModelName',
  modelAccuracy: 80,
  deploymentStatus: 'deleting',
};
const fakeData3 = {
  modelName: 'someModelName',
  modelAccuracy: 80,
  deploymentStatus: 'inService',
};
const fakeData4 = {};

const testPopulatePredictiveModel = () => {
  populatePredictiveModel(fakeData);
};
const testPopulatePredictiveModel2 = () => {
  populatePredictiveModel(fakeData2);
};
const testPopulatePredictiveModel3 = () => {
  populatePredictiveModel(fakeData3);
};
const testPopulatePredictiveModel4 = () => {
  populatePredictiveModel(fakeData4);
};

//Write a function that toggles between the deployement status
const togglPredictiveModelDeploymentStatus = () => {
  const deploymentStatusButton = document.querySelector(
    'button#deployment-status'
  );

  const isDeploymentActive =
    deploymentStatusButton.dataset.isdeploymentactive === 'true' ? true : false;

  if (isDeploymentActive) {
    deploymentStatusButton.classList.add('btn-danger');
    deploymentStatusButton.classList.remove('btn-success');
    deploymentStatusButton.textContent = 'NOT ACTIVE';
    deploymentStatusButton.dataset.isdeploymentactive = false;
  } else {
    deploymentStatusButton.classList.add('btn-success');
    deploymentStatusButton.classList.remove('btn-danger');
    deploymentStatusButton.textContent = 'ACTIVE';
    deploymentStatusButton.dataset.isdeploymentactive = true;
  }
};

//Write a function that takes in a json object to fill in the predictive models section
const populatePredictiveModelsInCloud = (models) => {
  if (!models || models.length === 0) {
    console.log('no models were provided');
    return;
  }

  const noModelsInfoElement = document.querySelector('#no-models-info');
  if (noModelsInfoElement) {
    noModelsInfoElement.remove();
  }

  const cloudPredictiveModelsTable = document.querySelector(
    '#cloud-predictive-models-table'
  );

  const tableBody = cloudPredictiveModelsTable.querySelector('tbody');

  models.forEach((model, index) => {
    const createdTableRow = document.createElement('tr');
    createdTableRow.classList.add('table-light');

    const createdTableHead = document.createElement('th');
    createdTableHead.setAttribute('scope', 'row');
    createdTableHead.textContent = index + 1;

    const createdModelNameTableData = document.createElement('td');
    createdModelNameTableData.textContent = model.modelName;

    const createdAccuracyTableData = document.createElement('td');
    createdAccuracyTableData.textContent = model.accuracy;

    const createdDeployButtonTableData = document.createElement('td');
    const createdDeployButton = document.createElement('button');
    createdDeployButton.textContent = 'DEPLOY';
    createdDeployButton.classList.add('btn', 'btn-primary');
    createdDeployButton.addEventListener('click', () => {
      Click_Deploy(model.modelName);
    });

    createdDeployButtonTableData.appendChild(createdDeployButton);
    createdTableRow.append(
      createdTableHead,
      createdModelNameTableData,
      createdAccuracyTableData,
      createdDeployButtonTableData
    );

    tableBody.appendChild(createdTableRow);
  });
};

const fakePredictiveModels = [
  {
    modelName: 'some name',
    accuracy: 10,
  },
  {
    modelName: 'some name 2',
    accuracy: 20,
  },
];
const testPopulatePredictiveModels = () =>
  populatePredictiveModelsInCloud(fakePredictiveModels);

/************************************************************
 *
 *
 * ********** CODE FOR AWS **********************************
 *
 *
 * **********************************************************
 */

/**
 *
 * CODE TO ESTABLISH A MQTT CONNECTION WITH AWS IOT CORE
 *
 */

/* Globabl variables */

//AWS CognitioCredentials
var CognitioCredentials = {
  poolId: '',
  endpoint: '',
  region: '',
};

//S3 Bucket Configurations
var S3Bucket = {
  bucketName: '',
};

//Array that holds info about all the models in the cloud
var PredictiveModels = [];

//Json object that holds the model name as its key and the model path as its value
var modelPaths = {};

//Number of modules
var NUMBER_OF_MODULES = 0;

/* Methods */

// Initialize the configuration.
AWS.config.update({
  region: CognitioCredentials.region,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: CognitioCredentials.poolId,
  }),
});

//Initialise S3 client
var s3 = new AWS.S3();

const GetModelInfo = (modelInfoPath, modelPath) => {
  //Initalise parameters to retrieve models path from the s3 bucket
  var params = { Bucket: S3Bucket.bucketName, Key: modelInfoPath };
  //Read the modelName and Accuracy from the .txt file
  s3.getObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      PredictiveModels.push({
        modelName: new TextDecoder('utf-8').decode(data.Body),
        accuracy: null,
        path: 's3://' + S3Bucket.bucketName + '/' + modelPath,
      });
      modelPaths[new TextDecoder('utf-8').decode(data.Body)] =
        's3://' + S3Bucket.bucketName + '/' + modelPath + 'output/model.tar.gz';
      if (PredictiveModels.length === NUMBER_OF_MODULES)
        populatePredictiveModelsInCloud(PredictiveModels);
    }
  });
};

const GetModelPath = () => {
  //Initalise parameters to retrieve models path from the s3 bucket
  var params = {
    Bucket: S3Bucket.bucketName,
    Delimiter: '/',
    Prefix: 'models/',
  };

  //Find path to the different model available in the S3 bucket
  s3.listObjects(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      NUMBER_OF_MODULES = data.CommonPrefixes.length;
      data.CommonPrefixes.forEach(function (item, index) {
        //model directory
        params.Prefix = item.Prefix;

        s3.listObjects(params, function (err, data) {
          if (err) console.log(err, err.stack);
          // an error occurred
          else {
            GetModelInfo(
              item.Prefix + 'model_info.txt',
              data.CommonPrefixes[0].Prefix
            );
          }
        });
      });
    }
  });
};

//GetModelPath()

/**
 *
 * CODE TO ESTABLISH A MQTT CONNECTION WITH AWS IOT CORE
 *
 */

var awsIot = require('aws-iot-device-sdk');
var cognitoIdentity = new AWS.CognitoIdentity();
var webMqttClient;
var CONNECTION_STATUS = false;
var PERMISSON_TO_DEPLOY = false;
var DEPLOY_REQUESTED = false;
var MODELNAME;

const Recieved_Msg_From_MQTT = (topic, payload) => {
  //remove later
  console.log('MQTT topic:', topic);
  console.log('payload: ', payload.state.desired);

  if (topic === '$aws/things/predictiveModel/shadow/get/accepted') {
    //Update the payload status to a boolean value and give permission to deploy when the deployed model is currently active.
    if (payload.state.desired.Status === 'InService') {
      payload.state.desired.Status = true;
      PERMISSON_TO_DEPLOY = true;
    }

    //Update the payload status to a boolean value and give permission to deploy when there is no deployed model
    else if (payload.state.desired.Status === 'Nil') {
      PERMISSON_TO_DEPLOY = true;
      payload.state.desired.Status = false;
    }

    //If the payload status is other than 'InService' or 'Nil' the permission is not given to deploy the new model
    else {
      PERMISSON_TO_DEPLOY = true;
      payload.state.desired.Status = false;
    }

    //Creating a temp object to populate the Predictive model table
    const Data = {
      modelName: payload.state.desired.Name,
      modelAccuracy: payload.state.desired.Accuracy,
      isDeploymentActive: payload.state.desired.Status,
    };

    //Populating the predictive model table
    populatePredictiveModel(Data);

    if (DEPLOY_REQUESTED) {
      Deploy_Model(MODELNAME);
    }
  } else if (topic === '$aws/things/predictiveModel/shadow/update/rejected') {
    alert('Unable to update the model status');
  } else {
    //
  }
};

const Subscribe_to_MQTT_Topic = (subTopic) => {
  if (CONNECTION_STATUS) {
    webMqttClient.subscribe(subTopic);
  }
};

const Publish_to_MQTT_Topic = (pubTopic, payload) => {
  if (CONNECTION_STATUS) {
    webMqttClient.publish(pubTopic, JSON.stringify(payload));
  } else {
    alert('UNABLE TO PUBLISH TO TOPIC: MQTT CONNECTION NOT ESTABLISHED');
  }
};

const Check_Model_Status = () => {
  if (CONNECTION_STATUS) {
    PERMISSON_TO_DEPLOY = false;
    //remove later
    console.log('CHECKING MODEL STATUS');
    Publish_to_MQTT_Topic('webuser/service/input', {
      service_no: 1,
      service_name: 'Deploy model',
      service_input_payload: null,
    });
  }
};

function Click_Deploy(modelName) {
  DEPLOY_REQUESTED = true;
  MODELNAME = modelName;
  Check_Model_Status();
}

function Deploy_Model(modelName) {
  if (CONNECTION_STATUS) {
    if (PERMISSON_TO_DEPLOY) {
      //remove later
      console.log('PERMISSION GIVEN TO DEPLOY');
      //Prepare the payload to deploy the model using ec2 instance
      payload = { model_data: modelPaths[modelName] };
      //Send a MQTT message to the shadow to update the model name and accuracy in the shadow
      Publish_to_MQTT_Topic('$aws/things/predictiveModel/shadow/update', {
        state: { desired: { Name: modelName, Accuracy: 70, Status: 'Nil' } },
      });
      //--- Send a MQTT message to the ec2 instance to deploy the model ----
      if (
        document.getElementsByTagName('td')[0].innerText.toUpperCase() === 'NIL'
      ) {
        //No model is present. Thus we will creating a new model endpoint
        Publish_to_MQTT_Topic('webuser/service/input', {
          service_no: 2,
          service_name: 'Deploy model',
          service_input_payload: payload,
        });
      } else {
        //A model is already active. Thus we will be updating the model endpoint
        Publish_to_MQTT_Topic('webuser/service/input', {
          service_no: 3,
          service_name: 'Deploy model',
          service_input_payload: payload,
        });
      }
    } else {
      alert('No permission to deploy the model');
    }
  } else {
    console.log('MQTT CONNECTION IS NOT AVAILABLE');
  }
  DEPLOY_REQUESTED = false;
}

const InitialiseMQTTClient = () => {
  AWS.config.credentials.get(function (err, data) {
    if (!err) {
      console.log(
        'retrieved identity from Cognito: ' + AWS.config.credentials.identityId
      );
      var params = {
        IdentityId: AWS.config.credentials.identityId,
      };
      cognitoIdentity.getCredentialsForIdentity(params, function (err, data) {
        if (!err) {
          webMqttClient = awsIot.device({
            //Set region
            region: CognitioCredentials.region,

            //Set endpoint
            host: CognitioCredentials.endpoint,

            // Use a random client ID.
            clientId:
              'webClient' + '-' + Math.floor(Math.random() * 100000 + 1),

            // Connect via secure WebSocket
            protocol: 'wss',

            // Set Access Key, Secret Key and session token based on credentials from Cognito
            accessKeyId: data.Credentials.AccessKeyId,
            secretKey: data.Credentials.SecretKey,
            sessionToken: data.Credentials.SessionToken,
          });

          webMqttClient.on('error', function (err) {
            console.log('Error is ', err);
          });

          webMqttClient.on('connect', function () {
            console.log('connected');
            CONNECTION_STATUS = true;
            Subscribe_to_MQTT_Topic(
              '$aws/things/predictiveModel/shadow/get/accepted'
            );
            Subscribe_to_MQTT_Topic(
              '$aws/things/predictiveModel/shadow/update/rejected'
            );
            Check_Model_Status();
          });

          webMqttClient.on('message', function (topic, payload) {
            Recieved_Msg_From_MQTT(topic, JSON.parse(payload.toString()));
          });

          webMqttClient.on('disconnect', function () {
            console.log('disconnected');
            CONNECTION_STATUS = false;
            alert('ERROR: MQTT CONNECTION LOST');
          });
        }
      });
    }
  });
};

//InitialiseMQTTClient();
