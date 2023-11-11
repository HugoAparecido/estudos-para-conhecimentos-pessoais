import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://playground-86352-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const moviesInDB = ref(database, "movies")
console.log(app)
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value
    push(moviesInDB, inputValue)
    console.log(`${inputValue} added to database`)
})