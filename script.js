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

async function getApplication(email) {
  let headers = new Headers()
  headers.append("Content-Type", "application/json")
  fetch("http://localhost:8080/api/application?email=" + email, {
    method: "GET",
    headers: headers
  }).then(function(response) {
    response.json().then(function(resp) {
     if (resp.length == 0) {
       document.body.innerHTML = "No applications submitted for this user, please submit an application."
       return
     }
     if (resp.length > 1) {
       alert("Error! Multiple applications match same email address")
       return 
     } else {
        console.log(resp[0])
        updateTables(resp[0])
     }
    })
  });
};

function populateApplication() {
  getApplication(sessionStorage.getItem("email"))
}

function updateTables(resp) {
  let progressDiv = document.getElementById("in-details")
  let reviewDiv = document.getElementById("in-review")
  let pendivDiv = document.getElementById("in-pending")

  let status = resp.status
  let submitted = resp.submitted
  let updated = resp.updated
  
  if (status == "SUBMITTED") {
    progressDiv.appendChild(document.createElement("div")).innerHTML = `<p style="font-size: 15px; color: green">Submitted on ${submitted}</p>`
    reviewDiv.appendChild(document.createElement("div")).innerHTML = "N/A"
    pendivDiv.appendChild(document.createElement("div")).innerHTML = "N/A"




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

  } else if (status == "REVIEW") {
    progressDiv.appendChild(document.createElement("div")).innerHTML = `<p style="font-size: 15px; color: green">Submitted on ${submitted}</p>`
    reviewDiv.appendChild(document.createElement("div")).innerHTML = `<p style="font-size: 15px; color: green">In Progress - Last Update: ${updated}</p>`
    pendivDiv.appendChild(document.createElement("div")).innerHTML = "N/A"
  } else if (status == "MORE_INFO") {
    progressDiv.appendChild(document.createElement("div")).innerHTML = `<p style="font-size: 15px; color: green">Submitted on ${submitted}</p>`
    reviewDiv.appendChild(document.createElement("div")).innerHTML = `<p style="font-size: 15px; color: yellow">Hold - Last Update: ${updated}</p>`
    pendivDiv.appendChild(document.createElement("div")).innerHTML = `<p style="font-size: 15px; color: red">More Information Required</p>`
  } 
}

var popover = new bootstrap.Popover(document.querySelector('.example-popover'), {
  container: 'body'
})

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})