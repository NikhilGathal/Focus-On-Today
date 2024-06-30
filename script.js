const checkboxlist = document.querySelectorAll('.custom-checkbox')
const inpfields = document.querySelectorAll('.goal-input')

const error = document.querySelector('.error-label')
const progressbar = document.querySelector('.progress-bar')
const progressvalue = document.querySelector('.progress-value')
const progressLabel = document.querySelector('.progress-label')
const quote = document.querySelector('.quote')

const allQuotes = [
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all the goals, time for chill :D',
]

checkboxlist.forEach((checkbox) => {
  // console.log(checkbox);
  checkbox.addEventListener('click', (e) => {
    const allGoalsAdded = [...inpfields].every((input) => {
      return input.value
    })

    if (allGoalsAdded) {
      // progressvalue.style.width = '33%'
      checkbox.parentElement.classList.toggle('completed')

      const inpid = checkbox.nextElementSibling.id

      allGoals[inpid].completed = !allGoals[inpid].completed
      completedgoal = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length
      progressvalue.style.width = `${(completedgoal / 3) * 100}%`
      progressvalue.firstElementChild.innerText = `${completedgoal}/3 completed`
      progressLabel.innerText = allQuotes[completedgoal]

      if (completedgoal > 0) {
        quote.innerText = `"Keep Going, You're making great progress!"`
      } else {
        quote.innerText = `"Move one step ahead,today"`
      }

      localStorage.setItem('allGoals', JSON.stringify(allGoals))
    } else {
      //avoid css in js error.style.display ="block"
      progressbar.classList.add('show-error')
    }
  })
})

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}


// {
//   first: {
//     name: '',
//     completed: false,
//   },
//   second: {
//     name: '',
//     completed: false,
//   },
//   third: {
//     name: '',
//     completed: false,
//   },
// }

let completedgoal = Object.values(allGoals).filter(
  (goal) => goal.completed
).length
progressvalue.style.width = `${(completedgoal / inpfields.length) * 100}%`
progressvalue.firstElementChild.innerText = `${completedgoal}/${inpfields.length} completed`
progressLabel.innerText = allQuotes[completedgoal]

if (completedgoal > 0) {
  quote.innerText = `"Keep Going, You're making great progress!"`
} else {
  quote.innerText = `"Move one step ahead,today"`
}

inpfields.forEach((input) => {


  if(allGoals[input.id])
    {
      input.value = allGoals[input.id].name


      if (allGoals[input.id].completed) {
        input.parentElement.classList.add('completed')
      }
    }

    
    


 

  input.addEventListener('focus', () => {
    progressbar.classList.remove('show-error')
  })
  input.addEventListener('input', (e) => {



    if (allGoals[input.id] &&  allGoals[input.id].completed) {
      console.log("executed return");
      input.value = allGoals[input.id].name
      return
    }

    // console.log(e.target.id);
    // same output if we use input.id
    // console.log(input.id);


    if(allGoals[input.id])
      {
        allGoals[input.id].name= input.value
      }
      else
      {
        allGoals[input.id] = {
          name : input.value,
          completed : false
        }
      }
    
     
    
    localStorage.setItem('allGoals', JSON.stringify(allGoals))
    console.log(allGoals)
  })
})



// Complete this project today
// Speak English for 10 minutes
// Practice Event Listener in JavaScript