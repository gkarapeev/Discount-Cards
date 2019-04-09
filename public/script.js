// GLOBAL VARIABLES ************************************************************
// 1. FILTERS
// 1.1 Filters - Percent Checkboxes
var checkBox_5 = document.getElementById('percent-5');
var checkBox_10 = document.getElementById('percent-10');
var checkBox_20 = document.getElementById('percent-20');
var checkBox_30 = document.getElementById('percent-30');

// 1.2 Filters - Category Checkboxes
var cosmetics = document.getElementById('cosmetics')
var books = document.getElementById('books')
var accessories = document.getElementById('accessories')
var services = document.getElementById('services')

// 1.3 Filters - Date Inputs
var date_from = document.getElementById('from');
var date_to = document.getElementById('to');

// 1.4 Filters - Search Box
var search_box = document.getElementById('search-box');

// 2. RECORDS
var record_cont = document.querySelector('.container-records');
var row_list = document.getElementsByClassName('record-row');

// RECORD OBJECT CONSTRUCTOR ***************************************************
var myDateFormat = {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
}

var Record = function (name, city, category, accu, discount, expiry, num) {
  this.name = name;
  this.city = city;
  this.category = category;
  this.accu = accu;
  this.discount = discount;
  this.expiry = expiry.toLocaleDateString('en-GB', myDateFormat);
  this.num = num;
}

// INITIALIZE DATABASE *********************************************************
// 1. Check if it exists in localStorage
if (localStorage.discountCards) {
  var recordData = JSON.parse(localStorage.discountCards);
// 2. If not, generate some example data and store it locally
} else {
  var georgi = new Record('Georgi Karapeev', 'Sofia', 'Books', 'No', 5, new Date(2019, 3, 5), 2005050419);
  var marko = new Record('Marko Popovic', 'Niš', 'Cosmetics', 'Yes', 30, new Date(2019, 4, 5), 1130050519);
  var vlada = new Record('Vladan Petrovic', 'Niš', 'Services', 'No', 10, new Date(2019, 5, 5), 4010050619);
  var tsvyatko = new Record('Tsvyatko Ivanov', 'Plovdiv', 'Accessories', 'Yes', 20, new Date(2019, 6, 5), 3120050719);
  var recordData = [georgi, marko, vlada, tsvyatko];
  
  localStorage.discountCards = JSON.stringify(recordData);
}

// GENERATE HTML ELEMENTS FROM THE DATA ****************************************
function showList(array) {

  // Clear any content before populating with new
  record_cont.innerHTML = '';

  for (let i = array.length - 1; i >= 0; i--) {
    let rowData = [];

    for (field in array[i]) {
      rowData.push(recordData[i][field]);
    }

    let html = `<div class="record-row" onclick="setActive(this);">
                  <div class="record-field name">${rowData[0]}</div>
                  <div class="record-field city">${rowData[1]}</div>
                    <div class="record-field category">${rowData[2]}</div>
                    <div class="record-field accumulation">${rowData[3]}</div>
                    <div class="record-field d-percent">${rowData[4]}%</div>
                    <div class="record-field exp-date">${rowData[5]}</div>
                    <div class="record-field card-num">${rowData[6]}</div>
                    <div class="record-field modify">
                      <div class="button button-edit" onclick="editRow(this);">Edit</div>
                      <div class="button button-del" onclick="deleteRow(this);">
                          <svg version="1.1" class="bin-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 32 32" xml:space="preserve">
                            <style type="text/css">
                            .st0{fill:#F5F5F5;}
                            </style>
                            <g id="trash">
                              <path class="st0" d="M30,6.8C29.9,5.2,28.6,4,27,4h-3V3l0,0c0-1.7-1.3-3-3-3H11C9.3,0,8,1.3,8,3l0,0v1H5C3.4,4,2.1,5.2,2,6.8l0,0V8
                                v1c0,1.1,0.9,2,2,2l0,0v17c0,2.2,1.8,4,4,4h16c2.2,0,4-1.8,4-4V11l0,0c1.1,0,2-0.9,2-2V8V6.8L30,6.8z M10,3c0-0.6,0.4-1,1-1h10
                                c0.6,0,1,0.4,1,1v1H10V3z M26,28c0,1.1-0.9,2-2,2H8c-1.1,0-2-0.9-2-2V11h20V28z M28,8v1H4V8V7c0-0.6,0.4-1,1-1h22c0.6,0,1,0.4,1,1
                                V8z"/>
                            </g>
                          </svg>
                      </div>
                    </div>
                  </div>`;

    // Insert the HTML
    record_cont.insertAdjacentHTML('afterbegin', html);

  }
}

showList(recordData);

// CREATE RECORD ***************************************************************
function insertRow() {

  // Remove the active state from any other active elements
  removeActive();

  // Define the HTML content of the new row
  var newRow = `<div class="record-row row-edit record-row-active" onclick="setActive(this);">
                  <form name="edit-form" onsubmit="preventDefault();">
                    <div class="record-field name"><input type="text" value=""></div>
                    <div class="record-field city"><input type="text" value=""></div>
                    <div class="record-field category"><input type="text" value=""></div>
                    <div class="record-field accumulation"><input type="text" value=""></div>
                    <div class="record-field d-percent"><input type="text" value=""></div>
                    <div class="record-field exp-date"><input type="text" value=""></div>
                    <div class="record-field card-num"><input type="text" value=""></div>
                    <div class="record-field modify">
                      <div class="button button-edit button-save" onclick="saveRow(this, true);">OK</div>
                      <div class="button button-del">
                          <svg version="1.1" class="bin-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 32 32" xml:space="preserve">
                            <style type="text/css">
                            .st0{fill:#F5F5F5;}
                            </style>
                            <g id="trash">
                              <path class="st0" d="M30,6.8C29.9,5.2,28.6,4,27,4h-3V3l0,0c0-1.7-1.3-3-3-3H11C9.3,0,8,1.3,8,3l0,0v1H5C3.4,4,2.1,5.2,2,6.8l0,0V8
                                v1c0,1.1,0.9,2,2,2l0,0v17c0,2.2,1.8,4,4,4h16c2.2,0,4-1.8,4-4V11l0,0c1.1,0,2-0.9,2-2V8V6.8L30,6.8z M10,3c0-0.6,0.4-1,1-1h10
                                c0.6,0,1,0.4,1,1v1H10V3z M26,28c0,1.1-0.9,2-2,2H8c-1.1,0-2-0.9-2-2V11h20V28z M28,8v1H4V8V7c0-0.6,0.4-1,1-1h22c0.6,0,1,0.4,1,1
                                V8z"/>
                            </g>
                          </svg>
                      </div>
                    </div>
                  </form>
                </div>`;

  // Insert the HTML
  record_cont.insertAdjacentHTML('afterbegin', newRow);

  enableSaveOnEnter();

}

// DELETE RECORD ***************************************************************
function deleteRow(button) {

  let confirmed = confirm('Confirm record deletion?');
  if (confirmed) {
    let row = button.parentNode.parentNode;
    let rows = Array.prototype.slice.call(record_cont.children); // No bloody clue how this gets the count of children elements, but YOLO, I need to get things done!

    // Updating the database  
    // First, update the recordData
    recordData.splice(rows.indexOf(row), 1);
    // Second, update the localStorage
    localStorage.discountCards = JSON.stringify(recordData);

    //Finally, remove it from the HTML
    row.parentNode.removeChild(row);
  }
}

// EDIT RECORD *****************************************************************
function editRow(button) {

  let row = button.parentNode.parentNode;
  let rows = Array.prototype.slice.call(record_cont.children); // No bloody clue how this gets the count of children elements, but YOLO, I need to get things done!
  let thisRecord = recordData[rows.indexOf(row)]; // making an object which is identical to the database entry with the same index as the index of this row in the table. I'll need to actually generate unique record ID's if I don't do this, but I'm not ready to go there yet! :D

  let editForm = `<form name="edit-form" onsubmit="event.preventDefault();"><div class="record-field name"><input type="text" value="${thisRecord.name}"></div>
                    <div class="record-field city"><input type="text" value="${thisRecord.city}"></div>
                    <div class="record-field category"><input type="text" value="${thisRecord.category}"></div>
                    <div class="record-field accumulation"><input type="text" value="${thisRecord.accu}"></div>
                    <div class="record-field d-percent"><input type="text" value="${thisRecord.discount}"></div>
                    <div class="record-field exp-date"><input type="text" value="${thisRecord.expiry}"></div>
                    <div class="record-field card-num"><input type="text" value="${thisRecord.num}"></div>
                    <div class="record-field modify">
                      <div class="button button-edit button-save" onclick="saveRow(this);">OK</div>
                      <div class="button button-del" onclick="deleteRow(this);">
                          <svg version="1.1" class="bin-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 32 32" xml:space="preserve">
                            <style type="text/css">
                            .st0{fill:#F5F5F5;}
                            </style>
                            <g id="trash">
                              <path class="st0" d="M30,6.8C29.9,5.2,28.6,4,27,4h-3V3l0,0c0-1.7-1.3-3-3-3H11C9.3,0,8,1.3,8,3l0,0v1H5C3.4,4,2.1,5.2,2,6.8l0,0V8
                                v1c0,1.1,0.9,2,2,2l0,0v17c0,2.2,1.8,4,4,4h16c2.2,0,4-1.8,4-4V11l0,0c1.1,0,2-0.9,2-2V8V6.8L30,6.8z M10,3c0-0.6,0.4-1,1-1h10
                                c0.6,0,1,0.4,1,1v1H10V3z M26,28c0,1.1-0.9,2-2,2H8c-1.1,0-2-0.9-2-2V11h20V28z M28,8v1H4V8V7c0-0.6,0.4-1,1-1h22c0.6,0,1,0.4,1,1
                                V8z"/>
                            </g>
                          </svg>
                      </div>
                    </div>
                  </form>`;

  row.innerHTML = editForm;

  row.classList.add("row-edit");

  enableSaveOnEnter();
}

// Trigger the saveRow() also by pressing Enter
function enableSaveOnEnter() {
  let edit_fields = document.getElementsByName('edit-form')[0].getElementsByTagName('input');

  for (let i = 0; i < edit_fields.length; i++) {
    edit_fields[i].addEventListener("keyup", function (event) {
      event.preventDefault();
      if (event.keyCode == 13) {
        document.getElementsByClassName("button-save")[0].click();
      }
    })
  }
}

// SAVE RECORD
function saveRow(button, isNew) {
  let row = button.parentNode.parentNode;
  let rows = Array.prototype.slice.call(record_cont.children); // No bloody clue how this gets the count of children elements, but YOLO, I need to get things done!
  let newValues = [];

  // Write the new values to an array
  for (let i = 0; i < row.children.length; i++) {
    newValues.push(row.children[i].children[0].value);
  }

  // Write the values of newValues to an object
  let newRecord = {
    'name': newValues[0],
    'city': newValues[1],
    'category': newValues[2],
    'accu': newValues[3],
    'discount': newValues[4],
    'expiry': newValues[5],
    'num': newValues[6]
  }

  // Update the corresponding recordData entry

  if (isNew) {
    recordData.unshift(newRecord);
    localStorage.discountCards = JSON.stringify(recordData);
  } else {
    recordData[rows.indexOf(row.parentNode)] = newRecord;
    localStorage.discountCards = JSON.stringify(recordData);
  }

  row.parentNode.classList.remove("row-edit");

  // Finally, update the HTML with the new data and revert to standard view
  row.parentNode.innerHTML = `<div class="record-field name">${newValues[0]}</div>
                              <div class="record-field city">${newValues[1]}</div>
                              <div class="record-field category">${newValues[2]}</div>
                              <div class="record-field accumulation">${newValues[3]}</div>
                              <div class="record-field d-percent">${newValues[4]}%</div>
                              <div class="record-field exp-date">${newValues[5]}</div>
                              <div class="record-field card-num">${newValues[6]}</div>
                              <div class="record-field modify">
                                <div class="button button-edit" onclick="editRow(this);">Edit</div>
                                <div class="button button-del" onclick="deleteRow(this);">
                                    <svg version="1.1" class="bin-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                      viewBox="0 0 32 32" xml:space="preserve">
                                      <style type="text/css">
                                      .st0{fill:#F5F5F5;}
                                      </style>
                                      <g id="trash">
                                        <path class="st0" d="M30,6.8C29.9,5.2,28.6,4,27,4h-3V3l0,0c0-1.7-1.3-3-3-3H11C9.3,0,8,1.3,8,3l0,0v1H5C3.4,4,2.1,5.2,2,6.8l0,0V8
                                          v1c0,1.1,0.9,2,2,2l0,0v17c0,2.2,1.8,4,4,4h16c2.2,0,4-1.8,4-4V11l0,0c1.1,0,2-0.9,2-2V8V6.8L30,6.8z M10,3c0-0.6,0.4-1,1-1h10
                                          c0.6,0,1,0.4,1,1v1H10V3z M26,28c0,1.1-0.9,2-2,2H8c-1.1,0-2-0.9-2-2V11h20V28z M28,8v1H4V8V7c0-0.6,0.4-1,1-1h22c0.6,0,1,0.4,1,1
                                          V8z"/>
                                      </g>
                                    </svg>
                                </div>
                              </div>`;
}

// ACTIVE STATE ****************************************************************
function removeActive() {
  let active_element = document.querySelector('.record-row-active');
  if (active_element) {
    active_element.classList.remove('record-row-active');
  }
}

function setActive(row) {
  removeActive(); // Removing the 'active' state from any element that may currently have it
  row.classList.add('record-row-active');
}

// Remove active state by clicking anywhere other than .record-row or .new-record
document.addEventListener('click', function () {
  if ((event.target.closest('.record-row')) || (event.target.closest('.new-record')) || (event.target.closest('.button-edit'))) return;
  else removeActive();
});

// FILTER **********************************************************************
// An object that holds the current state of ALL filters
var filterCriteria = {
  'percentage': [false, false, false, false],
  'category': [false, false, false, false],
  'expiry': [],
  'term': ''
}

// Triggered whenever a percent checkbox is changed
function loadPercent() {

  let show_5 = checkBox_5.checked;
  let show_10 = checkBox_10.checked;
  let show_20 = checkBox_20.checked;
  let show_30 = checkBox_30.checked;

  filterCriteria.percentage[0] = show_5;
  filterCriteria.percentage[1] = show_10;
  filterCriteria.percentage[2] = show_20;
  filterCriteria.percentage[3] = show_30;
}

// Triggered whenever a percent checkbox is changed
function loadCategory() {

  let showCosmetics = cosmetics.checked;
  let showBooks = books.checked;
  let showAccessories = accessories.checked;
  let showServices = services.checked;

  filterCriteria.category[0] = showCosmetics;
  filterCriteria.category[1] = showBooks;
  filterCriteria.category[2] = showAccessories;
  filterCriteria.category[3] = showServices;
}

// Triggered whenever a date input is changed
function loadDates() {
  let from_raw = new Date(date_from.value);
  let to_raw = new Date(date_to.value);

  // let from = from_raw.toLocaleDateString('en-GB', myDateFormat);
  // let to = to_raw.toLocaleDateString('en-GB', myDateFormat);

  filterCriteria.expiry[0] = from_raw;
  filterCriteria.expiry[1] = to_raw;
}

// Triggered whenever a letter is typed in/ deleted from the search box
function loadTerm() {
  let searchTerm = search_box.value.toLowerCase();
  filterCriteria.term = searchTerm;
}

// Triggered on EVERY change of state of EVERY filter option
function applyFilter() {

  for (let i = 0; i < recordData.length; i++) {
    let row = recordData[i];
    let show = true;

    // DISCOUNT PERCENTAGE
    // 0. If there is a checked box, perform the check, otherwise ignore it
    if (filterCriteria.percentage.some(state => state === true)) {

      // 1. Determine how many percent this entry has
      // 2. For each case, see if this percentage should be visible and if not - set "show" to false
      switch (row.discount) {
        case 5:
          show = filterCriteria.percentage[0];
          break;

        case 10:
          show = filterCriteria.percentage[1];
          break;

        case 20:
          show = filterCriteria.percentage[2];
          break;

        case 30:
          show = filterCriteria.percentage[3];
          break;

        default:
          break;
      }
    }

    // CATEGORY
    // 0. If there is a checked box, perform the check, otherwise ignore it
    if (filterCriteria.category.some(state => state === true)) {

      // 1. Determine what category this row has
      // 2. For each case, see if this category should be visible and if not - set "show" to false
      switch (row.category.toLowerCase()) {
        case 'cosmetics':
          if (filterCriteria.category[0] === false) {
            show = false;
          }
          break;

        case 'books':
          if (filterCriteria.category[1] === false) {
            show = false;
          }
          break;

        case 'accessories':
          if (filterCriteria.category[2] === false) {
            show = false;
          }
          break;

        case 'services':
          if (filterCriteria.category[3] === false) {
            show = false;
          }
          break;

        default:
          break;
      }
    }

    // DATE
    // 1. Obtain a date object with the date of this row
    let date = new Date(row.expiry);

    // 2. Check if the expiry date in the filterCriteria object is valid
    if (!isNaN(filterCriteria.expiry[0])) {
      // 3. Check if the date on this row satisfies the criteria
      if (date <= filterCriteria.expiry[0]) {
        show = false;
      }
    }
    // Repeat the same steps 2. and 3. for the second date
    if (!isNaN(filterCriteria.expiry[1])) {
      if (date >= filterCriteria.expiry[1]) {
        show = false;
      }
    }

    // SEARCH TERM

    let name = row.name.toLowerCase();
    let city = row.city.toLowerCase();
    let number = row.num.toString();

    let matchName = name.indexOf(filterCriteria.term) > -1;
    let matchCity = city.indexOf(filterCriteria.term) > -1;
    let matchNumber = number.indexOf(filterCriteria.term) > -1;

    if (!(matchName || matchCity || matchNumber)) {
      show = false;
    }

    // FINALLY, if ANY of the filters excluded the row, set its "display" to "none", otherwise set it to "grid"
    if (show) {
      row_list[i].style.display = 'grid';
    } else {
      row_list[i].style.display = 'none';
    }
  }
}

// SORT ************************************************************************
// First, before making ANY mess, let's make a function that will take care of it.
// More specifically, a function that resets the order of recordData to its default.



// function yanko() {let sortedData = recordData;

// let tempElem = sortedData[3];
// sortedData[3] = sortedData[0];
// sortedData[0] = tempElem;

// recordData = sortedData;
// showList(recordData);}
