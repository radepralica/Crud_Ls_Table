'use strict';
let mode = 'create';
let row = null;
let tmpId;
const btnAdd = document.getElementById('btnAdd');
const btnClear = document.getElementById('clearFields');
const frmPripravnost = document.getElementById('frmPripravnost');
const tBody = document.getElementById('tBody');
const eksport = document.getElementById('eksport');
const deleteTable = document.getElementById('deleteTable');
const table = document.getElementById('tblData');
const clearFieldes = document.getElementById('clearFields');
let arrPripravnost = [];

const korisnik = document.getElementById('korisnik');
const problem = document.getElementById('problem');
const radnja = document.getElementById('radnja');
const kolega = document.getElementById('kolega');
const komentar = document.getElementById('komentar');
const brOper = document.getElementById('brOper');
const datum = document.getElementById('datum');
const optRadnik = document.getElementById('optRadnik');

if (localStorage.getItem('items') == null) {
  arrPripravnost = [];
} else {
  arrPripravnost = JSON.parse(localStorage.getItem('items'));
  displayTable();
}

frmPripravnost.addEventListener('submit', function (e) {
  e.preventDefault();
  if (mode === 'create') {
    const priprObj = {
      korisnik: korisnik.value,
      problem: problem.value,
      radnja: radnja.value,
      kolega: kolega.value,
      komentar: komentar.value,
      brOper: brOper.value,
      datum: datum.value,
      optRadnik: optRadnik.value,
    };
    arrPripravnost.push(priprObj);
    setLs();
    displayTable();
    clearFields();
  } else {
    btnAdd.innerHTML = 'Izmijeni';
    updateRow(tmpId); //!Edit
    displayTable();
    btnAdd.innerHTML = 'Dodaj';
    mode = 'create';
  }
  korisnik.focus();
});

function displayTable() {
  let tbl = '';
  for (let i = 0; i < arrPripravnost.length; i++) {
    tbl += `
      <tr>
              <td>${i + 1}</td>
              <td>${arrPripravnost[i].korisnik}</td>
              <td>${arrPripravnost[i].problem}</td>
              <td>${arrPripravnost[i].radnja}</td>
              <td>${arrPripravnost[i].kolega}</td>
              <td>${arrPripravnost[i].komentar}</td>
              <td>${arrPripravnost[i].brOper}</td>
              <td>${arrPripravnost[i].datum}</td>
              <td>${arrPripravnost[i].optRadnik}</td>
          
              <div class="container-fluid">
              <td>
            <button class="btn btn-sm btn-warning edit" onclick="updateRow(${i})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteRow(${i})">Delete</button>
           </td>
           </div>
            </tr> 
      
      `;
  }
  tBody.innerHTML = tbl;
}

//!Brisanje reda
function deleteRow(id) {
  arrPripravnost.splice(id, 1);
  setLs();
  displayTable();
}

function updateRow(id) {
  tmpId = id;
  mode = 'update';
  btnAdd.textContent = 'Izmijeni';

  const priprObj = {
    korisnik: korisnik.value,
    problem: problem.value,
    radnja: radnja.value,
    kolega: kolega.value,
    komentar: komentar.value,
    brOper: brOper.value,
    datum: datum.value,
    optRadnik: optRadnik.value,
  };
  korisnik.value = arrPripravnost[id].korisnik;
  problem.value = arrPripravnost[id].problem;
  radnja.value = arrPripravnost[id].radnja;
  kolega.value = arrPripravnost[id].kolega;
  komentar.value = arrPripravnost[id].komentar;
  brOper.value = arrPripravnost[id].brOper;
  datum.value = arrPripravnost[id].datum;
  optRadnik.value = arrPripravnost[id].optRadnik;
  arrPripravnost[tmpId] = priprObj;
  setLs();
}

tBody.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('edit')) {
    row = e.target.parentElement.parentElement;

    korisnik.value = row.children[1].textContent;
    problem.value = row.children[2].textContent;
    radnja.value = row.children[3].textContent;
    kolega.value = row.children[4].textContent;
    komentar.value = row.children[5].textContent;
    brOper.value = row.children[6].textContent;
    datum.value = row.children[7].textContent;
    optRadnik.value = row.children[8].textContent;

    btnAdd.textContent = 'Izmijeni';
  }
});

const setLs = function () {
  localStorage.setItem('items', JSON.stringify(arrPripravnost));
};

function clearFields() {
  korisnik.value = '';
  problem.value = '';
  radnja.value = '';
  kolega.value = '';
  komentar.value = '';
  brOper.value = '';
  datum.value = '';
  optRadnik.value = '';
}

function exportToExcel(tableID, filename = '') {
  var downloadLink;
  var dataType = 'application/vnd.ms-excel';
  var tableSelect = document.getElementById(tableID);
  var tableHtml = tableSelect.outerHTML.replace(/ /g, '%20');

  //Specify file name

  filename = filename ? filename + '.xls' : 'excel_data.xls';

  ///Create download link

  downloadLink = document.createElement('a');
  document.body.appendChild(downloadLink);
  if (navigator.msSaveOrOpenBlob) {
    var blob = new Blob(['\ufeff', tableHtml], {
      type: dataType,
    });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    downloadLink.href = 'data:' + dataType + ', ' + tableHtml;

    //Setting filename
    downloadLink.download = filename;
    //Trigering function
    downloadLink.click();
  }
}

eksport.addEventListener('click', function (e) {
  e.preventDefault;
  exportToExcel('tblData', 'Pripravnost');
});

deleteTable.addEventListener('click', function (e) {
  e.preventDefault();
  table.innerHTML = '';
  localStorage.clear();
});
clearFieldes.addEventListener('click', clearFields);
