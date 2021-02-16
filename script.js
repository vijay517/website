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
  
    if(pathName === currentPathName) {
  
      navLink.parentElement.classList.add('active')
    }
  
  })
}

initialiseNavWatcher()


const selectedOptmisation = 'SOO' // 'MOO

// const parameters =  {
//   cement: {
//     optimised: true,
//     value: 23,
//   },
//   flyAsh: {
//     optimised: true,
//     value: 23,
//   }
// }

function initialiseForm () {
  const formElement = document.querySelector('#optimisation-form')
  
  function optimise(event) {
    event.preventDefault()
    console.log('hello optimise')

    const allOptimisationTypeInputs = document.querySelectorAll('input[name="optimisationType"]')
    const selectedOptmisationTypeInput = Array.from(allOptimisationTypeInputs).find(input => {return input.checked})

    console.log('the selectedType: ', selectedOptmisationTypeInput.value)

    const allInputElements = document.querySelectorAll('input')

  }


  formElement.addEventListener('submit',optimise)
  

  
}
initialiseForm()

