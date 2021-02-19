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

//Write a function that takes in a json object to fill in the deployed predictive model section
const populatePredictiveModel = (data) => {
  const tableBodyRowElements = document.querySelectorAll(
    '#deployed-predictive-model-table tbody tr'
  );

  console.log('tableBodyRowElements: ', tableBodyRowElements);

  tableBodyRowElements.forEach((rowElement) => {
    const rowParameter = rowElement.dataset.row;
    const rowDataElements = rowElement.querySelectorAll('td');

    // currently only expecting 1 <td> element per row
    rowDataElements.forEach((dataElement) => {
      if (rowParameter === 'deploymentStatus') {
        const foundButtonElement = dataElement.querySelector('button');

        if (data.isDeploymentActive) {
          foundButtonElement.classList.remove('btn-danger');
          foundButtonElement.classList.add('btn-success');
          foundButtonElement.textContent = 'ACTIVE';
          foundButtonElement.dataset.isdeploymentactive = true;
        } else {
          foundButtonElement.classList.remove('btn-success');
          foundButtonElement.classList.add('btn-danger');
          foundButtonElement.textContent = 'NOT ACTIVE';
          foundButtonElement.dataset.isdeploymentactive = false;
        }
      } else {
        dataElement.textContent = data[rowParameter];
      }
    });
  });
};

const fakeData = {
  modelName: 'someModelName',
  modelAccuracy: 80,
  isDeploymentActive: true,
};

const testPopulatePredictiveModel = () => {
  populatePredictiveModel(fakeData);
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
      console.log('deploy model with the name: ', model.modelName);
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

//Write a funtion that returns the model name when pressed deployed.

/* this task has been completed from line 120-122. It has to be done dynamically */
