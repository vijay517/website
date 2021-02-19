/* 
 * Code to make the current nav link active  
*/

function initialiseNavWatcher() {
  const currentPage = window.location.pathname
  const currentPathName = currentPage.split('/')[1]

  // all anchor tags that are nav links
  const allNavLinks = document.querySelectorAll(`.navbar-nav .nav-item a`)

  allNavLinks.forEach(navLink => {
    // one anchor tag
    const navLinkHref = navLink.href

    const pathName = navLinkHref.split('/').pop()

    if (pathName === currentPathName) {

      navLink.parentElement.classList.add('active')
    }

  })
}

initialiseNavWatcher()

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


//Write a function that clears the optimisation results table



//Write a function that takes in a json object to fill in the deployed predictive model section


//Write a function that toggles between the deployement status



//Write a function that takes in a json object to fill in the predictive models section


//Write a funtion that returns the model name when pressed deployed.
