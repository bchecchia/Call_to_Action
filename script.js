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
        updateTables(resp[0].status)
     }
    })
  });
};

function populateApplication() {
  getApplication(sessionStorage.getItem("email"))
}

function updateTables(status) {
  let progressDiv = document.getElementById("in-progress")
  let reviewDiv = document.getElementById("in-review")
  let pendivDiv = document.getElementById("in-pending")
  
  if (status == "SUBMITTED") {
    progressDiv.appendChild(document.createElement("div")).innerHTML = "PENDING"
    reviewDiv.appendChild(document.createElement("div")).innerHTML = ""
    pendivDiv.appendChild(document.createElement("div")).innerHTML = ""

  } else if (status == "ACCEPTED") {
    progressDiv.appendChild(document.createElement("div")).innerHTML = "OK"
    reviewDiv.appendChild(document.createElement("div")).innerHTML = "PENDING"
    pendivDiv.appendChild(document.createElement("div")).innerHTML = ""
  } else if (status == "REVIEW") {
    progressDiv.appendChild(document.createElement("div")).innerHTML = "OK"
    reviewDiv.appendChild(document.createElement("div")).innerHTML = "OK"
    pendivDiv.appendChild(document.createElement("div")).innerHTML = "More Information Required"
  }
}