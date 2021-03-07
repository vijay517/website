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

  if(!results) return

  clearOptimisationResults()

  const tableBodyElement = document.querySelector(
    '#optimisation-results-table tbody'
  );
  

  results.forEach((result) => {
    const createdTableRowElement = document.createElement('tr');
    createdTableRowElement.classList.add('table-light');

    Object.entries(result).forEach(([key, value]) => {
      const createdTableDataElement = document.createElement('td');
      createdTableDataElement.dataset.datatype = key;
      createdTableDataElement.textContent = value;

      createdTableRowElement.appendChild(createdTableDataElement);
    });

    tableBodyElement.appendChild(createdTableRowElement);
  });
};

const fakeResults = [
  {
    cement: '123',
    blastFurn: '34254',
    flyAsh: '098',
    water: '0980',
    superplasticizer: '131',
    coarseAggregate: '098',
    fineAggregate: '908234',
    age: '324',
    ucs: '9038',
    optimisedUcs: '234',
    cost: '29034',
    optimisedCost: '123123',
  },
  {
    cement: '123',
    blastFurn: '12319',
    flyAsh: '0928',
    water: '234',
    superplasticizer: '131',
    coarseAggregate: '342',
    fineAggregate: '234098',
    age: '290348',
    ucs: '324',
    optimisedUcs: '12312',
    cost: '123443',
    optimisedCost: '123123',
  },
  {
    cement: '123',
    blastFurn: '12319',
    flyAsh: '0928',
    water: '234',
    superplasticizer: '131',
    coarseAggregate: '342',
    fineAggregate: '234098',
    age: '290348',
    ucs: '324',
    optimisedUcs: '12312',
    cost: '123443',
    optimisedCost: '123123',
  },
  {
    cement: '123',
    blastFurn: '12319',
    flyAsh: '0928',
    water: '234',
    superplasticizer: '131',
    coarseAggregate: '342',
    fineAggregate: '234098',
    age: '290348',
    ucs: '324',
    optimisedUcs: '12312',
    cost: '123443',
    optimisedCost: '123123',
  },
  {
    cement: '123',
    blastFurn: '12319',
    flyAsh: '0928',
    water: '234',
    superplasticizer: '131',
    coarseAggregate: '342',
    fineAggregate: '234098',
    age: '290348',
    ucs: '324',
    optimisedUcs: '12312',
    cost: '123443',
    optimisedCost: '123123',
  },
  {
    cement: '123',
    blastFurn: '12319',
    flyAsh: '0928',
    water: '234',
    superplasticizer: '131',
    coarseAggregate: '342',
    fineAggregate: '234098',
    age: '290348',
    ucs: '324',
    optimisedUcs: '12312',
    cost: '123443',
    optimisedCost: '123123',
  },
  {
    cement: '123',
    blastFurn: '12319',
    flyAsh: '0928',
    water: '234',
    superplasticizer: '131',
    coarseAggregate: '342',
    fineAggregate: '234098',
    age: '290348',
    ucs: '324',
    optimisedUcs: '12312',
    cost: '123443',
    optimisedCost: '123123',
  },
  {
    cement: '123',
    blastFurn: '12319',
    flyAsh: '0928',
    water: '234',
    superplasticizer: '131',
    coarseAggregate: '342',
    fineAggregate: '234098',
    age: '290348',
    ucs: '324',
    optimisedUcs: '12312',
    cost: '123443',
    optimisedCost: '123123',
  },
];
const callPopulateTableWithFakeResults = () => {
  populateOptimisationResultsTable(fakeResults);
};

//Write a function that clears the optimisation results table

const clearOptimisationResults = () => {
  const tableBodyRowElements = document.querySelectorAll(
    '#optimisation-results-table tbody tr'
  );

  tableBodyRowElements.forEach((rowElement) => {
    rowElement.remove()
  });
};
