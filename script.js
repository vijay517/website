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
    optimisationStatus: 'some status 1',
    inputValue: 100,
    prescribedValue: 10,
  },
  blastFurn: {
    optimisationStatus: 'some status 2',
    inputValue: 200,
    prescribedValue: 20,
  },
  flyAsh: {
    optimisationStatus: 'some status 3',
    inputValue: 300,
    prescribedValue: 30,
  },
  water: {
    optimisationStatus: 'some status 4',
    inputValue: 400,
    prescribedValue: 40,
  },
  superplasticizer: {
    optimisationStatus: 'some status 5',
    inputValue: 500,
    prescribedValue: 50,
  },
  coarseAggregate: {
    optimisationStatus: 'some status 6',
    inputValue: 600,
    prescribedValue: 60,
  },
  fineAggregate: {
    optimisationStatus: 'some status 7',
    inputValue: 700,
    prescribedValue: 70,
  },
  age: {
    optimisationStatus: 'some status 8',
    inputValue: 800,
    prescribedValue: 80,
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
