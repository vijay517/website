//Code to make the current nav link active
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

const formElement = document.querySelector('#optimisation-form');

//function that gets executed when optimise button is pressed
function optimise(event) {
  event.preventDefault();

  const formElement = document.querySelector('#optimisation-form');
  const data = new FormData(formElement);

  const result = {};

  data.forEach((value, key) => {
    if (key === 'optimisationType') {
      result.optimisationType = value;
    }

    if (key.includes('-optimised')) {
      const parameter = key.split('-optimised')[0];

      if (!result[parameter]) {
        result[parameter] = { optimised: value === 'on' ? true : false };
      } else {
        result[parameter].optimised = value === 'on' ? true : false;
      }
    }

    if (key.includes('-value')) {
      const parameter = key.split('-value')[0];

      if (!result[parameter]) {
        result[parameter] = { value: value ? parseFloat(value) : null };
      } else {
        result[parameter].value = value ? parseFloat(value) : null;
      }
      if (!result[parameter].hasOwnProperty('optimised')) {
        result[parameter].optimised = false;
      }
    }
  });

  console.log(result);
}

formElement.addEventListener('submit', optimise);

//Write a function that takes in a json object and fills in the optimisation results table

const populateOptimisationResultsTable = (results) => {
  const tableBodyRowElements = document.querySelectorAll(
    '#optimisation-results-table tbody tr'
  );

  tableBodyRowElements.forEach((rowElement) => {
    const rowParameter = rowElement.dataset.row;
    const rowDataElements = rowElement.querySelectorAll('td');

    rowDataElements.forEach((dataElement) => {
      const dataType = dataElement.dataset.datatype;
      dataElement.textContent = results[rowParameter][dataType];
    });
  });
};

const fakeResults = {
  cement: {
    blastFurn: 'some value cement-blashfurn',
    flyAsh: 'some value cement-flyash',
    water: 'some value cement-water',
    superplasticizer: 'some value cement-superplastic',
    coarseAggregate: 'some value cement-coarseAggregate',
    fineAggregate: 'some value cement-fineAggregate',
    age: 'some value cement-age',
    ucs: 'some value cement-ucs',
    optimisedUcs: 'some value cement-optimisedUCS',
    cost: 'some value cement-cost',
    optimisedCost: 'some value cement-optimisedCost',
  },
  blastFurn: {
    blastFurn: 'some value',
    flyAsh: 'some value',
    water: 'some value',
    superplasticizer: 'some value',
    coarseAggregate: 'some value',
    fineAggregate: 'some value',
    age: 'some value',
    ucs: 'some value',
    optimisedUcs: 'some value',
    cost: 'some value',
    optimisedCost: 'some value',
  },
  flyAsh: {
    blastFurn: 'some value',
    flyAsh: 'some value',
    water: 'some value',
    superplasticizer: 'some value',
    coarseAggregate: 'some value',
    fineAggregate: 'some value',
    age: 'some value',
    ucs: 'some value',
    optimisedUcs: 'some value',
    cost: 'some value',
    optimisedCost: 'some value',
  },
  water: {
    blastFurn: 'some value',
    flyAsh: 'some value',
    water: 'some value',
    superplasticizer: 'some value',
    coarseAggregate: 'some value',
    fineAggregate: 'some value',
    age: 'some value',
    ucs: 'some value',
    optimisedUcs: 'some value',
    cost: 'some value',
    optimisedCost: 'some value',
  },
  superplasticizer: {
    blastFurn: 'some value',
    flyAsh: 'some value',
    water: 'some value',
    superplasticizer: 'some value',
    coarseAggregate: 'some value',
    fineAggregate: 'some value',
    age: 'some value',
    ucs: 'some value',
    optimisedUcs: 'some value',
    cost: 'some value',
    optimisedCost: 'some value',
  },
  coarseAggregate: {
    blastFurn: 'some value',
    flyAsh: 'some value',
    water: 'some value',
    superplasticizer: 'some value',
    coarseAggregate: 'some value',
    fineAggregate: 'some value',
    age: 'some value',
    ucs: 'some value',
    optimisedUcs: 'some value',
    cost: 'some value',
    optimisedCost: 'some value',
  },
  fineAggregate: {
    blastFurn: 'some value',
    flyAsh: 'some value',
    water: 'some value',
    superplasticizer: 'some value',
    coarseAggregate: 'some value',
    fineAggregate: 'some value',
    age: 'some value',
    ucs: 'some value',
    optimisedUcs: 'some value',
    cost: 'some value',
    optimisedCost: 'some value',
  },
  age: {
    blastFurn: 'some value',
    flyAsh: 'some value',
    water: 'some value',
    superplasticizer: 'some value',
    coarseAggregate: 'some value',
    fineAggregate: 'some value',
    age: 'some value',
    ucs: 'some value',
    optimisedUcs: 'some value',
    cost: 'some value',
    optimisedCost: 'some value',
  },
};
const callPopulateTableWithFakeResults = () => {
  populateOptimisationResultsTable(fakeResults);
};

//Write a function that clears the optimisation results table

const clearOptimisationResults = () => {
  const tableBodyDataElements = document.querySelectorAll(
    '#optimisation-results-table tbody tr td[data-datatype]'
  );

  tableBodyDataElements.forEach((dataElement) => {
    dataElement.textContent = '';
  });
};
