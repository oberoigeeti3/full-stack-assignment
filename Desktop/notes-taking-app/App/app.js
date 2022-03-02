//If user adds a note, add it to the local storage

showNotes();
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {
  let addTitle = document.getElementById("addTitle");
  let addText = document.getElementById("addText");
  let titles = localStorage.getItem("titles");
  let notes = localStorage.getItem("notes");

  if (titles == null) {
    titleObj = [];
  } else {
    titleObj = JSON.parse(titles);
  }

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  titleObj.push(addTitle.value);
  notesObj.push(addText.value);
  localStorage.setItem("titles", JSON.stringify(titleObj));
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTitle.value = "";
  addText.value = "";
  //console.log(notesObj);
  showNotes();
});

//function to show notes from local storage
function showNotes() {
  let notes = localStorage.getItem("notes");
  let titles = localStorage.getItem("titles");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  if (titles == null) {
    titleObj = [];
  } else {
    titleObj = JSON.parse(titles);
  }

  let html = "";
  notesObj.forEach(function (element, index) {
    let title = titleObj[index];
    html += `
    <div class="noteCard card my-2 mx-2" style="width: 18rem">
          <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${element}</p>
          <button id="${index}" onClick="deleteNode(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
        </div>`;
  });

  let notesElement = document.getElementById("notes");

  if (notesObj.length != 0) {
    notesElement.innerHTML = html;
  } else {
    notesElement.innerHTML = `You may add notes using the above box :)`;
  }
}

//function to delete note
function deleteNode(index) {
  let notes = localStorage.getItem("notes");
  let titles = localStorage.getItem("titles");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  if (titles == null) {
    titleObj = [];
  } else {
    titleObj = JSON.parse(titles);
  }

  titleObj.splice(index, 1);
  notesObj.splice(index, 1);
  localStorage.setItem("titles", JSON.stringify(titleObj));
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchText");

search.addEventListener("input", function () {
  let inputVal = search.value;

  let notesCards = document.getElementsByClassName("noteCard");

  Array.from(notesCards).forEach(function (element) {
    let cardText = element.getElementsByTagName("p")[0].innerText;

    if (cardText.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
