var Record = function (name, city, category, accu, discount, expiry, num) {
  this.name = name;
  this.city = city;
  this.category = category;
  this.accu = accu;
  this.discount = discount;
  this.expiry = expiry;
  this.num = num;
}

var john = new Record('Georgi Karapeev', 'Mezek', 'Services', 'No', 50, new Date (2019, 3, 5), 2120030419);

var row = [];

// Fill "row" with the values of "record"
for (cell in john) {
  row.push(john[cell]);
}

var doc_row_1 = document.getElementsByClassName('record-row').item(1);

var newHTML = `<div class="record-field name">${row[0]}</div>
<div class="record-field city">${row[1]}</div>
<div class="record-field category">${row[2]}</div>
<div class="record-field accumulation">${row[3]}</div>
<div class="record-field d-percent">${row[4]}%</div>
<div class="record-field exp-date">${row[5]}</div>
<div class="record-field card-num">${row[6]}</div>
<div class="record-field modify">
  <div class="button button-edit">Edit</div>
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
</div>`;

doc_row_1.innerHTML = newHTML;


console.log(row);
