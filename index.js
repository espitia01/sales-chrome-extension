
const saveEl = document.getElementById('input-btn');
let myLeads = [];
const inputEl = document.getElementById("input-field");
let ulEl = document.getElementById("ul-el");
let deleteEl = document.getElementById("delete-btn");
let tabEl = document.getElementById("save-tab-btn");

function renderLeads(leads) {
    let listItems = "";

    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li class="bg-blue-100 px-4 py-2 mb-2 rounded-lg">
                <a href="${leads[i]}" target="_blank" class="text-sm">${leads[i]}</a>
            </li>
        `;
    }

    ulEl.innerHTML = listItems;
}

function saveInput() {
    if (inputEl.value !== "") {
        myLeads.push(inputEl.value);
        inputEl.value = "";
        localStorage.setItem("myLeads", JSON.stringify(myLeads));  
        renderLeads(myLeads);
        console.log(localStorage.getItem("myLeads"));
        
    }
}

function deleteInput() {
    localStorage.clear();
    myLeads = [];
    ulEl.innerHTML = "";
}

function tab(arr) {
    myLeads.push(arr[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
}


saveEl.addEventListener("click", saveInput);
deleteEl.addEventListener("click", deleteInput);
tabEl.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderLeads(myLeads)
    })
    
});

inputEl.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        saveInput();
    }
});

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLeads(myLeads);
}


