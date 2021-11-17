let myLeads = [];

// myLeads = JSON.parse(myLeads);

// myLeads.push("www.youtube.com");
// myLeads = JSON.stringify(myLeads);

// console.log(typeof myLeads);

const inputEl = document.getElementById("input-el");
const saveLeadBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-El");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("save-tab");

// console.log(leadsFromStorage);

if (leadsFromStorage) {
  myLeads = leadsFromStorage;
  render(myLeads);
}

deleteBtn.addEventListener("dblclick", function () {
  // console.log("Double Click!");
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

saveLeadBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  // console.log(myLeads);
  inputEl.value = "";
  // myLeadsVal = JSON.stringify(myLeads);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
  console.log(localStorage.getItem("myLeads"));
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listitems = "";
  for (let i = 0; i < leads.length; i++) {
    //   console.log(myLeads[i]);
    listitems += `<li>
                    <a href=${leads[i]} target="_blank">
                        ${leads[i]}
                    </a>
                  </li>`;

    // ulEl.innerHTML += "<li>" + myLeads[i] + "</li>";
    // const li = document.createElement("li");
    // li.textContent = myLeads[i];
    // ulEl.append(li);
  }
  ulEl.innerHTML = listitems;
}
