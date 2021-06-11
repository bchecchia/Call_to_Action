function clearForm() {
    document.getElementById("myForm").reset();
  }

async function sendApplication() {
  event.preventDefault()

  let formData = document.getElementById("myForm")
  let inputs = formData.getElementsByTagName("input")

  let applicationPayload = {}

  for (let i = 0; i < inputs.length; i++) {
    applicationPayload[inputs[i].name] = inputs[i].value
  }

  let headers = new Headers()
  headers.append("Content-Type", "application/json")

  console.log(applicationPayload)
  fetch("http://localhost:8080/api/applications", {
    method: "POST",
    body: JSON.stringify(applicationPayload),
    headers: headers
  }).then(function(response) {
    return response.json()
  }).then(function(json) {
    alert(json.result)
  })
  clearForm()
}


class ProgressBar {
  constructor(progressbar, targets){
    this.progressBar = progressbar;    // Progress Bar
    this.targets = targets;            // Step Complete Btns
    this.progress = 0;                 // Tracking Progress
  }
}

// Add this below the constructor function.
 
init(); {
  const context = this;   // Reference to the instantiated object.
  this.targets.forEach(function(target){
    // Loop through each target element and add a click 
    // event to listen for which will call the 
    // changeProgress method and update the progress bar
    target.addEventListener('click', function(e){
      context.changeProgress(e);
      // Passing the built event object (e) to our method
    });
  });
}

changeProgress(e); {
  this.progress = e.target.getAttribute('data-progress');
  this.progressBar.style.width = this.progress + '%';
  this.progressBar.setAttribute('aria-valuenow', this.progress);
}

const progressBar = new ProgressBar(
  // passing in reference to progress-bar div
  document.querySelector('.progress-bar'),
  // passing in an array of all the steps (targets) to listen on
  document.querySelectorAll('.btn-primary')
);
progressBar.init();


//array of news
const news = ["Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
"Contrary to popular belief, Lorem Ipsum is not simply random text.",
"The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
"All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary."]

//logo
const logo = "<img src='https://www.naishare.com/images/favicon.png' width='25px' style='margin:0 8px'/>";
let tickerText = "";
//looping through the news array
for(let i=0; i<news.length; i++){
  tickerText+=news[i];
  //adds the logo in between news items
  if(i!=news.length-1){
    tickerText+=logo;
  }
}

document.querySelector("#scroll").innerHTML = tickerText;