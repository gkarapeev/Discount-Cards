// GLOBAL VARIABLES ************************************************************
// 0. RECORD DATA
var recordData;
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
// 0. Enable creation of localStorage a entry
var createDB = function() {
  var georgi = new Record('Georgi Karapeev', 'Sofia', 'Books', 'No', 5, new Date(2019, 3, 5), 2005050419);
  var georgi_2 = new Record('Georgi Karapeev', 'Sofia', 'Cosmetics', 'Yes', 20, new Date(2019, 11, 7), 2120071220);
  var marko = new Record('Marko Popovic', 'Niš', 'Cosmetics', 'Yes', 30, new Date(2019, 4, 5), 1130050519);
  var marko_2 = new Record('Marko Popovic', 'Niš', 'Books', 'Yes', 5, new Date(2022, 8, 17), 2105170922);
  var vlada = new Record('Vladan Petrovic', 'Niš', 'Services', 'No', 10, new Date(2019, 5, 5), 4010050619);
  var vlada_2 = new Record('Vladan Petrovic', 'Niš', 'Services', 'Yes', 20, new Date(2020, 0, 1), 3120010120);
  var tsvyatko = new Record('Tsvyatko Ivanov', 'Plovdiv', 'Accessories', 'Yes', 20, new Date(2019, 6, 5), 3120050719);
  var tsvyatko_2 = new Record('Tsvyatko Ivanov', 'Plovdiv', 'Books', 'No', 30, new Date(2018, 1, 26), 2030260218);
  var ani = new Record('Anita Andreeva', 'Plovdiv', 'Books', 'No', 10, new Date(2018, 1, 10), 2010100218);
  var ani_2 = new Record('Anita Andreeva', 'Plovdiv', 'Cosmetics', 'No', 30, new Date(2016, 1, 28), 1030280216);
  var toni = new Record('Anton Cholakov', 'Plovdiv', 'Services', 'Yes', 10, new Date(2018, 3, 14), 4110140418);
  var toni_2 = new Record('Anton Cholakov', 'Plovdiv', 'Accessories', 'Yes', 20, new Date(2007, 1, 07), 3120070207);
  var peter = new Record('Peter Yochev', 'Plovdiv', 'Books', 'No', 30, new Date(2076, 6, 13), 2030130776);
  var peter_2 = new Record('Peter Yochev', 'Plovdiv', 'Services', 'No', 5, new Date(2019, 8, 21), 4005210919);
  recordData = [georgi, georgi_2, marko, marko_2, vlada, vlada_2, tsvyatko, tsvyatko_2, ani, ani_2, toni, toni_2, peter, peter_2];
  
  localStorage.discountCards = JSON.stringify(recordData);
}
// 1. Check if 'discountCards' exists in localStorage
if (localStorage.discountCards) {
  recordData = JSON.parse(localStorage.discountCards);
// 2. If not, generate it
} else {
  createDB();
  showList(recordData);
}
// 3. Reset function
var resetData = function() {
  localStorage.removeItem('discountCards');
  createDB();
  showList(recordData);
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
    // Because .children doesn't return an array as such. It returns a 'collection'.
    // slice() is then borrowed from the array prototype in order to cast
    // that collection into a regular array object.
    let rows = Array.prototype.slice.call(record_cont.children);

    // Updating the database  
    // First, update the recordData
    recordData.splice(rows.indexOf(row), 1);
    // Second, update the localStorage
    localStorage.discountCards = JSON.stringify(recordData);

    //Finally, remove it from the HTML
    row.parentNode.removeChild(row);
  }
}

// VALIDATE NAME AND CITY ******************************************************
let validate = function(field) {
  let pattern = /[$&+,:;=?@#|'<>.^*()%!0-9\{\}\[\]]/;

  if (field.value.match(pattern)) {
    field.classList.add('invalid');
  } else {
    field.classList.remove('invalid');
  }
}

// EDIT RECORD *****************************************************************
function editRow(button) {

  let row = button.parentNode.parentNode;
  let rows = Array.prototype.slice.call(record_cont.children);
  let thisRecord = recordData[rows.indexOf(row)]; // making an object which is identical to the database entry with the same index as the index of this row in the table. I'll need to actually generate unique record ID's if I don't do this, but I'm not ready to go there yet! :D

  // A way to generate UTC dates
  function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  }

  // Finding which values to select for the 'category' and 'percent' <select> elements
  // 1. Arrays to hold the 'selected' state of all 4 options for both elenents - initially all are blank
  let options_cat = ['', '', '', ''];
  let options_perc = ['', '', '', ''];
  // 2. Adding 'selected' state to the correct 'category' <select> element
  switch (thisRecord.category) {
    case 'Cosmetics':
      options_cat[0] = 'selected';
      break;
    
    case 'Books':
      options_cat[1] = 'selected';
      break;
    
    case 'Accessories':
      options_cat[2] = 'selected';
      break;
    
    case 'Services':
      options_cat[3] = 'selected';
      break;
    
    default:
    break;
  }
  // 3. Adding 'selected' state to the correct 'percent' <select> element
  switch (thisRecord.discount) {
    case 5:
      options_perc[0] = 'selected';
      break;
    
    case 10:
      options_perc[1] = 'selected';
      break;
    
    case 20:
      options_perc[2] = 'selected';
      break;
    
    case 30:
      options_perc[3] = 'selected';
      break;
    
    default:
    break;
  }

  // Setting the correct 'accumulation' checkbox value
  let checkbox_state;
  thisRecord.accu === 'Yes' ? checkbox_state = 'checked' : checkbox_state = '';

  // Generate the HTML
  let editForm = `<form name="edit-form" onsubmit="event.preventDefault();"><div class="record-field name"><input type="text" value="${thisRecord.name}" onfocusout="validate(this)"></div>
                    <div class="record-field city"><input type="text" value="${thisRecord.city}" onfocusout="validate(this)"></div>
                    <div class="record-field category">
                      <select onchange="refreshNum(this)">
                        <option value="Cosmetics" ${options_cat[0]}>Cosmetics</option>
                        <option value="Books" ${options_cat[1]}>Books</option>
                        <option value="Accessories" ${options_cat[2]}>Accessories</option>
                        <option value="Services" ${options_cat[3]}>Services</option>
                      </select>
                    </div>
                    <div id="edit-accu" class="record-field accumulation">
                      <label class="cbox-label" for="accumulation">
                        <input type="checkbox" id="accumulation" name="accumulation" ${checkbox_state} onclick="refreshNum(this.parentNode)"></input>
                        <div class="checkmark"></div>
                        Accu.
                      </label>
                    </div>
                    <div class="record-field d-percent">
                      <select onchange="refreshNum(this)">
                        <option value="5" ${options_perc[0]}>5%</option>
                        <option value="10" ${options_perc[1]}>10%</option>
                        <option value="20" ${options_perc[2]}>20%</option>
                        <option value="30" ${options_perc[3]}>30%</option>
                      </select>
                    </div>
                    <div class="record-field exp-date">
                      <input type="date" value="${createDateAsUTC(new Date(thisRecord.expiry)).toISOString().slice(0,10)}" onchange="refreshNum(this)">
                    </div>
                    <div class="record-field card-num"><span class="edit-number">${thisRecord.num}</span></div>
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

// GET ROW VALUES **************************************************************
function getRowValues(row) {
  let rowValues = [];
  
  for (let i = 0; i < row.children[0].children.length - 1; i++) { // length minus 1, because the last one is the card number, which we will generate later
    rowValues.push(row.children[0].children[i].children[0].value);

    // For the checkbox, gotta dig 1 element deeper and get the checkbox state
    if (i === 3) {
      let value = row.children[0].children[3].children[0].children[0].checked;
      // And overwrite the 'undefined' value which will have inevitably been written to newValues[3]
      rowValues[3] = value ? 'Yes' : 'No';
    }

    // For the percent field, cast the string from the element value to a number
    if (i === 4 ) {
      rowValues[4] = parseInt(row.children[0].children[4].children[0].value);
    }
  }

  return rowValues;
}

// GENERATE CARD NUMBER ********************************************************
function generateCardNum(values) {
  let cardNum = '';
  // 1. Category
  switch (values[2]) {
    case 'Cosmetics':
      cardNum += 1;
      break;
    case 'Books':
      cardNum += 2;
      break;
    case 'Accessories':
      cardNum += 3;
      break;
    case 'Services':
      cardNum += 4;
      break;
    default:
    break;
  }
  // 2. Accumulation
  values[3] === 'Yes' ? cardNum += 1 : cardNum += 0;
  // 3. Percentage
  // 3.1 Padding
  if (values[4] < 10) {
    cardNum += 0;
  }
  // 3.2 The percent ammount
  cardNum += values[4];
  // 4. Expiry Date
  cardNum += values[5].slice(8, 10); // Add the day
  cardNum += values[5].slice(5, 7); // Add the month
  cardNum += values[5].slice(2, 4); // Add the year
  return cardNum;
}

// REFRESH CARD NUMBER *********************************************************
function refreshNum(field) {
  let row = field.parentNode.parentNode.parentNode;
  let rowValues = getRowValues(row);
  let cardNumberField = row.children[0].children[6];

  cardNumberField.children[0].innerHTML = generateCardNum(rowValues);
}

// SAVE RECORD *****************************************************************
function saveRow(button, isNew) {
  let form = button.parentNode.parentNode;
  let rows = Array.prototype.slice.call(record_cont.children);

  // Write the new values to an array
  let newValues = getRowValues(form.parentNode);

  // Format the date properly
  let dateArr = newValues[5].split('-');
  dateArr[1] = parseInt(dateArr[1]) - 1;
  let tempDate = new Date(...dateArr);
  let theDate = tempDate.toLocaleDateString('en-GB', myDateFormat);

  // Write the values of newValues to an object
  let newRecord = {
    'name': newValues[0],
    'city': newValues[1],
    'category': newValues[2],
    'accu': newValues[3],
    'discount': newValues[4],
    'expiry': theDate,
    'num': generateCardNum(newValues)
  }

  // If it's a new record, insert it at the fron of recordData
  if (isNew) {
    recordData.unshift(newRecord);
    localStorage.discountCards = JSON.stringify(recordData);
  } else {
    // Else overwrite the corresponding index of recordData
    recordData[rows.indexOf(form.parentNode)] = newRecord;
    // And update localStorage to match
    localStorage.discountCards = JSON.stringify(recordData);
  }

  form.parentNode.classList.remove("row-edit");

  // Finally, update the HTML with the new data and revert to standard view
  form.parentNode.innerHTML = `<div class="record-field name">${newValues[0]}</div>
                              <div class="record-field city">${newValues[1]}</div>
                              <div class="record-field category">${newValues[2]}</div>
                              <div class="record-field accumulation">${newValues[3]}</div>
                              <div class="record-field d-percent">${newValues[4]}%</div>
                              <div class="record-field exp-date">${theDate}</div>
                              <div class="record-field card-num">${generateCardNum(newValues)}</div>
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

// ROW ACTIVE STATE ************************************************************
function removeActive() {
  let active_element = document.querySelector('.record-row-active');
  if (active_element) {
    active_element.classList.remove('record-row-active');
  }
}

function setActive(row) {
  // Remove the 'active' state from any row that may currently have it
  removeActive(); 
  // Add the active state to this row
  row.classList.add('record-row-active');
}

// SORT WORD ACTIVE STATE ******************************************************


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

// Restoring the original order of the data. Called after each sort.
function restoreOrder() {
  recordData = JSON.parse(localStorage.discountCards);
}

// Initialize sort direction counters
let sortCounters = {
  name: 0,
  city: 0,
  category: 0,
  accu: 0,
  discount: 0,
  expiry: 0,
  num: 0
}

// The sort function
let sortData = function(colTitle, criteria) {

  // 1. Reset other sort-direction counters to zero

  // 1.1 List all the counters
  let allCounters = ['name', 'city', 'category', 'accu', 'discount', 'expiry', 'num'];

  // 1.2 Remove the one we're sorting by and obtain a list of the irrelevant counters
  let otherCounters = allCounters.filter(cName => cName !== criteria);

  // 1.3 Set them all to zero
  for (let k = 0; k < otherCounters.length; k++) {
    sortCounters[otherCounters[k]] = 0;
  }

  // 2. Increment the counter
  sortCounters[criteria]++;

  // 3. Loop the counter if needed
  if (sortCounters[criteria] === 3) {
    sortCounters[criteria] = 0;
  }

  // 4. Display sort indication via CSS classes
  // 4.1 Remove active class from all column titles
  let allTitles = colTitle.parentNode.parentNode.children;

  for (let c = 0; c < allTitles.length - 1; c++) {
    allTitles[c].firstChild.classList.remove('sort-word-active');
    allTitles[c].firstChild.classList.remove('sort-word-inverted');
  }

  // 4.2 Add the class to the row being sorted, based on counter index
  if (sortCounters[criteria] !== 0) {
    colTitle.classList.add('sort-word-active');

    //4.3 
    if (sortCounters[criteria] === 2) {
      colTitle.classList.add('sort-word-inverted');
    }
  }

  // 5. Define the sort direction based on counter value
  let direction = (sortCounters[criteria] === 2) ? -1 : 1;

  // 6. Define how the objects will be sorted
  function compare(a, b) {

    // 6.1 If it's a date field, cast the strings into Date objects
    if (criteria === 'expiry') {
      let date_a = new Date(a[criteria]);
      let date_b = new Date(b[criteria]);

      if (date_a < date_b) {
        return -1 * direction;
      }

      if (date_a > date_b) {
        return 1 * direction;
      }

    } else {
    // 6.2 Else, just take the values as they are
      if (a[criteria] < b[criteria]) {
        return -1 * direction;
      }

      if (a[criteria] > b[criteria]) {
        return 1 * direction;
      }
    }

    return 0;
  }
  
  // 7. If counter isn't ZERO, perform the sort
  if (sortCounters[criteria] !== 0) {
    recordData.sort(compare);

    // 7.1 Display the sorted result
    showList(recordData);

    // 7.2 Apply any active filters
    applyFilter();

  } else {
    // 8.1 Else, restore the recordData to its original order
    restoreOrder();

    // 8.2 Display the UNsorted result
    showList(recordData);

    // 8.3 Apply any active filters
    applyFilter();
  }
}

// Sort by name on startup so that a sort indicator is visible
sortData(document.querySelector('.container-sort').children[0].children[0], 'name');