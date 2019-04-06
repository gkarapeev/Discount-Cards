// GLOBAL VARIABLES ***************************************************
var record_cont = document.querySelector('.container-records');

// Define a Record object constructor with an expression
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

// EXAMPLE DATA OBJECT ***********************************************
// var georgi = new Record('Georgi Karapeev', 'Sofia', 'Services', 'No', 50, new Date(2019, 3, 5), 4050030519);

// BUILD HTML FROM EXISTING RECORDS ***********************************

if (localStorage.discountCards) {
  var recordData = JSON.parse(localStorage.discountCards);
}

for (let i = recordData.length - 1; i >= 0; i--) {
  let rowData = [];

  for (field in recordData[i]) {
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

// CREATE *************************************************************
function insertRow() {

  // Remove the active state from any other active elements
  removeActive();

  // Define the HTML content of the new row
  var newRow = `<div class="record-row record-row-active" onclick="setActive(this);">
                  <div class="record-field name"></div>
                  <div class="record-field city"></div>
                    <div class="record-field category"></div>
                    <div class="record-field accumulation"></div>
                    <div class="record-field d-percent"></div>
                    <div class="record-field exp-date"></div>
                    <div class="record-field card-num"></div>
                    <div class="record-field modify">
                      <div class="button button-edit">Edit</div>
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
  record_cont.insertAdjacentHTML('afterbegin', newRow);
}

// DELETE *************************************************************
function deleteRow(row) {
  row.parentNode.parentNode.parentNode.removeChild(row.parentNode.parentNode);
}

// EDIT *************************************************************
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


  // Trigger the saveRow() also by pressing Enter
  let edit_fields = document.getElementsByName('edit-form')[0].getElementsByTagName('input');
  
  for (let i = 0; i < edit_fields.length; i++) {  edit_fields[i].addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode == 13) {
        document.getElementsByClassName("button-save")[0].click();
      }
    })
  }


}

function saveRow(button) {
  console.log('yo!');
}


// ACTIVE STATE *******************************************************
function removeActive() {
  let active_element = document.querySelector('.record-row-active');
  if (active_element) {
    active_element.classList.remove('record-row-active');
  }
}

function setActive(row) {
  removeActive();
  row.classList.add('record-row-active');
}

// Remove active state by clicking anywhere other than .record-row or .new-record
document.addEventListener('click', function() {
  if ((event.target.closest('.record-row')) || (event.target.closest('.new-record')) || (event.target.closest('.button-edit'))) return;
  else removeActive();
});



// LOCALSTORAGE *******************************************************

// localStorage.discountCards = JSON.stringify(recordData);