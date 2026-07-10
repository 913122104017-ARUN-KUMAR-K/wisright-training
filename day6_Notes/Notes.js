/* ===================================
   DOM ELEMENTS
=================================== */

let title = document.getElementById("title");
let content = document.getElementById("content");
let addbtn = document.getElementById("add-btn");

let searchitem = document.getElementById("searchtext");
let searchbtn = document.getElementById("search-btn");

let noteSection = document.getElementById("note-section");

let sort = document.getElementById("sort");
let themeBtn = document.getElementById("theme-btn");
let color = document.getElementById("color");

/* ===================================
   GLOBAL VARIABLES
=================================== */

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editId = null;
let theme = localStorage.getItem("theme");

/* ===================================
   INITIAL LOAD
=================================== */

if (theme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
}

renderNotes();


/* ===================================
   RENDER NOTES
=================================== */

function renderNotes() {

    noteSection.innerHTML = "";

    if (notes.length === 0) {

        let message = document.createElement("h2");

        message.textContent = "No Notes Found";
        message.classList.add("empty-message");

        noteSection.appendChild(message);

        return;

    }

    notes.forEach(function (note) {

        displayNote(note);

    });

}

/* ===================================
   DISPLAY SINGLE NOTE
=================================== */

function displayNote(note) {

    /* ---------- Create Elements ---------- */

    let article = document.createElement("article");

    let noteTitle = document.createElement("h3");
    let noteContent = document.createElement("div");
    let time = document.createElement("p");

    let action = document.createElement("div");

    let delBtn = document.createElement("button");
    let editBtn = document.createElement("button");

    /* ---------- Add Classes ---------- */

    article.classList.add("note");

    noteTitle.classList.add("note-title");
    noteContent.classList.add("note-content");
    time.classList.add("timestamp");

    action.classList.add("actions");

    delBtn.classList.add("delete-btn");
    editBtn.classList.add("edit-btn");

    /* ---------- Set Content ---------- */

    noteTitle.textContent = note.title;

    if (note.content.length > 100) {

        noteContent.textContent =
            note.content.substring(0, 100) + "...";

    } else {

        noteContent.textContent = note.content;

    }

    time.textContent = note.timestamp;

    delBtn.textContent = "Delete";
    editBtn.textContent = "Edit";

    article.style.backgroundColor = note.color;

    /* ---------- Delete Button ---------- */

    delBtn.addEventListener("click", function () {

        if (!confirm("Delete this note?")) {

            return;

        }

        notes = notes.filter(function (item) {

            return item.id !== note.id;

        });

        localStorage.setItem("notes", JSON.stringify(notes));

        renderNotes();

    });

    /* ---------- Edit Button ---------- */

    editBtn.addEventListener("click", function () {

        title.value = note.title;
        content.value = note.content;

        color.value = note.color;

        editId = note.id;

        addbtn.textContent = "Update Note";

    });

    /* ---------- Append Elements ---------- */

    action.append(delBtn, editBtn);

    article.append(
        noteTitle,
        noteContent,
        time,
        action
    );

    noteSection.appendChild(article);

}
/* ===================================
   THEME FUNCTION
=================================== */

function toggleTheme() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "☀️";

    } else {

        localStorage.setItem("theme", "light");
        themeBtn.textContent = "🌙";

    }

}

/* ===================================
   SORT FUNCTION
=================================== */

function sortNotes() {

    if (sort.value === "new") {

        notes.sort(function (a, b) {
            return b.id - a.id;
        });

    }

    else if (sort.value === "old") {

        notes.sort(function (a, b) {
            return a.id - b.id;
        });

    }

    else if (sort.value === "title") {

        notes.sort(function (a, b) {
            return a.title.localeCompare(b.title);
        });

    }

    localStorage.setItem("notes", JSON.stringify(notes));

    renderNotes();

}

/* ===================================
   ADD / UPDATE NOTE
=================================== */

function addOrUpdateNote(e) {

    e.preventDefault();

    if (title.value.trim() === "" || content.value.trim() === "") {

        alert("Please enter both title and content.");
        return;

    }

    if (editId === null) {

        const note = {

            id: Date.now(),
            title: title.value,
            content: content.value,
            timestamp: new Date().toLocaleString(),
            color: color.value

        };

        notes.push(note);

    }

    else {

        for (let i = 0; i < notes.length; i++) {

            if (notes[i].id === editId) {

                notes[i].title = title.value;
                notes[i].content = content.value;
                notes[i].timestamp = new Date().toLocaleString();
                notes[i].color = color.value;

            }

        }

        editId = null;
        addbtn.textContent = "Add Notes";

    }

    localStorage.setItem("notes", JSON.stringify(notes));

    renderNotes();

    title.value = "";
    content.value = "";

}

/* ===================================
   SEARCH FUNCTION
=================================== */

function searchNotes() {

    let keyword = searchitem.value.toLowerCase().trim();

    noteSection.innerHTML = "";

    let found = false;

    for (let i = 0; i < notes.length; i++) {

        if (

            notes[i].title.toLowerCase().includes(keyword) ||
            notes[i].content.toLowerCase().includes(keyword)

        ) {

            displayNote(notes[i]);
            found = true;

        }

    }

    if (!found) {

        let message = document.createElement("h2");

        message.textContent = "No Notes Found";
        message.classList.add("empty-message");

        noteSection.appendChild(message);

    }

}
themeBtn.addEventListener("click", toggleTheme);

sort.addEventListener("change", sortNotes);

addbtn.addEventListener("click", addOrUpdateNote);

searchitem.addEventListener("input", searchNotes);