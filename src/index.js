const url = 'http://localhost:3000/projects'
const updForm = document.querySelector('form#update-form')
const deletebtn = document.querySelector('button.delete-button')
const creaForm = document.querySelector("form#create-form")
fetch(url)
  .then(res => res.json())
  .then(projArr => {
    projArr.forEach(projObj => dispOneProj(projObj))
  })
function dispOneProj(projObj) {
  const detLi = document.createElement('li')
  detLi.textContent = projObj.title
  detLi.dataset.id = projObj.id
  detLi.addEventListener('click', () => {
    makeCenterDiv(projObj)
  })
  const detUl = document.querySelector("ul.house-list")
  detUl.append(detLi)
}
function makeCenterDiv(projObj) {
  const centH3 = document.querySelector('h3.center')
  centH3.textContent = projObj.title
  const centNotes = document.querySelector('p.center-notes')
  centNotes.textContent = `${projObj.area}: ` + projObj.notes
  const centerDiv = document.querySelector('div.main')
  centerDiv.append(centH3, centNotes)
  updForm.dataset.id = projObj.id
  deletebtn.dataset.id = projObj.id
  const icon = document.querySelector('i#icon')
  if (projObj.area == "Kitchen") {
    icon.className = "fas fa-sink"
  } else if (projObj.area == "Living Room") {
    icon.className = "fas fa-couch"
  } else if (projObj.area == "Outdoors") {
    icon.className = "fas fa-tree"
  } else if (projObj.area == "Bedroom") {
    icon.className = "fas fa-bed"
  } else if (projObj.area == "Bathroom") {
    icon.className = "fas fa-toilet"
  } else { icon.src = "" }
  updForm.title.value = projObj.title
  updForm.area.value = projObj.area
  updForm.notes.value = projObj.notes
}
//Update
updForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const title = evt.target.title.value
  const area = evt.target.area.value
  const notes = evt.target.notes.value
  fetch(`http://localhost:3000/projects/${updForm.dataset.id}`, {
    method: "PATCH",
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({ title, area, notes })
  })
    .then(res => res.json())
    .then(console.log)
})
//DELETE
deletebtn.addEventListener('click', () => {
  let liToDel = document.querySelector(`li[data-id="${deletebtn.dataset.id}"]`)
  fetch(`${url}/${deletebtn.dataset.id}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(json => {
      return json;
    })
  updForm.title.value = ""
  updForm.area.value = ""
  updForm.notes.value = ""
  liToDel.remove()
})
//create 
creaForm.addEventListener('submit', evt => {
  evt.preventDefault()
  const newEntry = {
    title: evt.target.title.value,
    user_id: 2,
    area: evt.target.area.value,
    notes: evt.target.notes.value
  }
  fetch('http://localhost:3000/projects', {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(newEntry)
  })
    .then(res => res.json())
    .then(newProj => dispOneProj(newProj))
  evt.target.reset()
})
