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

  let issues = {}
  for (const field in resp) {
    if (resp[field] == "") {
      issues[field] = "Not Entered"
    }
  }

  if (Object.keys(issues).length > 0) {
    let issuesCard = document.getElementById("issues-card")
    issuesCard.innerHTML = ""

    for (const field in issues) {
      let issueDiv = document.createElement("div")
      issueDiv.style.height = "auto"
      issueDiv.className = "overviewcard"
      issueDiv.innerHTML = `Issue: ${field} - ${issues[field]}`
      issuesCard.appendChild(issueDiv)
    }
  }
  
  if (Object.keys(issues).length > 0 ) { 
    progressDiv.appendChild(document.createElement("div")).innerHTML = `<p style="font-size: 15px; color: green">Submitted on ${submitted}</p>`
    reviewDiv.appendChild(document.createElement("div")).innerHTML = "N/A"
    pendivDiv.appendChild(document.createElement("div")).innerHTML = `<p style="color: red">Issues must be resolved before review</p>`
  } else {
    if (status == "SUBMITTED") {
      progressDiv.appendChild(document.createElement("div")).innerHTML = `<p style="font-size: 15px; color: green">Submitted on ${submitted}</p>`
      reviewDiv.appendChild(document.createElement("div")).innerHTML = "N/A"
      pendivDiv.appendChild(document.createElement("div")).innerHTML = "N/A"
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
}


function generateNews() {
  //array of news
  const news = ["Applicants can now check status of their application through the dashboard",
  "Portal will be unavailable on 7/12/2020 for maintenance",
  "Due to high demand we approximate review time for applications is 3 business days"]

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

  let scrollBar = document.querySelector("#scroll")
  scrollBar.innerHTML = tickerText
}
