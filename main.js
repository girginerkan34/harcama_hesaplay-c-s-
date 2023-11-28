//!HTML den gelen elemanlar.
const nameInput = document.getElementById('name-input');
const priceInput = document.getElementById('price-input');
const addBtn = document.querySelector('#add-btn');
const listArea = document.getElementById('list');
const statusCheckbox = document.getElementById('status-check');
const sumInfo = document.getElementById('sum-info');
const deleteBtn = document.getElementById('delete');
const userInput = document.getElementById('user-input');
const select = document.querySelector('select');

//! İzlediğimiz olaylar
addBtn.addEventListener('click', addExpense);
listArea.addEventListener("click" ,handleUpdate);
userInput.addEventListener('input', saveUser);
document.addEventListener('DOMContentLoaded', getUser);
select.addEventListener("change" , handleFilter)

// toplamın değerini burada tutacağız
let sum = 0;

function updateSum(price){
  // js'deki toplam değerini günceller
 sum +=  Number(price);
//  html deki toplam bilgi alanını güncelleme
sumInfo.innerHTML = sum;

}


//eventtListener ile  çalıştırılan fonkiyonlar
// olay hakkında bilgileri içeren bir parametre gider
function addExpense(event) {
    //Sayfayı yenilemesini engelleme
    event.preventDefault();

    // 1- İnputların değeri boşsa: alert ver ve fonksiyonu durdur.
    if(!nameInput.value || !priceInput.value){
        alert("Lütfen formu doldurunuz..");
        return;
    }
    // 2- İnputlar doluysa bir kart oluştur ve html gönder.

    // a- div oluşturma
    const expenseDiv = document.createElement("div");

    // b-div e klas ekleme
    expenseDiv.classList.add('expense');

    //Eğerki ödendi checkbox'ına tıklandıysa ödendi class ı ekle
    if(statusCheckbox.checked === true) {
      expenseDiv.classList.add('payed');
    }

    //c- içerisinde HTML'i belirleme.
    expenseDiv.innerHTML = `
          <h2 class="name">${nameInput.value}</h2>
          <h2 class="price">${priceInput.value}</h2>
          <div class="btns">
            <img id= "edit" src="images/pay-icon.png.png">
            <img id="delete" src="images/delete-icon.png.png">
          </div>
    `;
    //d- Oluşan elemanı HTML'ye gönderme
    listArea.appendChild(expenseDiv);

    // toplam alanının  güncelleme
    updateSum(priceInput.value)
    //formu temizleme
    nameInput.value = '';
    priceInput.value = '';
    statusCheckbox.checked = false;
console.dir(listArea);
    
}

// listedeki bir elemana tıklayınca çalışır
function handleUpdate(event){
  // tıklanılan elemn
  const eleman = event.target;

  // Silme resminin kapsayıcısına erişme 
  const parent = eleman.parentElement.parentElement;

  //sadece silme işleminde çalışacak kod 
  if (eleman.id === 'delete') {
  
// elementi silme
  parent.remove();

  // toplam bigisini güncelleme
  const price = parent.querySelector('.price').textContent;
  updateSum(Number(price) * -1);
  
  }

  // yanlızca silme resmine tıklanınca çalışacak
  if(eleman.id === "payed"){

  }


  // tıklanılan elemanın id'si edit ise harcamanın payed classı varsa çıkar yoksa ekle
  if(eleman.id === 'edit'){
    parent.classList.toggle('payed');

  }
} 

// kullanıcıyı local'e kaydetme
function saveUser(event){
    localStorage.setItem('username', event.target.value);
}

// kullanıcı local'de varsa onnu alma
function getUser() {
  // local'den ismi al iisim kaydedilmemişse nıll yerine "" olsun.
 const username = localStorage.getItem("username") || '' ;
//  kullanıcı ismini inputa aktar
userInput.value = username;

}

function handleFilter(event) {
  const selected = event.target.value;
  const items = list.childNodes;
  

// Bütün elemanlarıdönme
  items.forEach(item => {
     // selected alabileceği değerleri izleme
  switch(selected) {
    case 'all':
      // hepsi seçilirse
      item.style.display = 'flex';
      break;
      
      case 'payed':
        // eleman payed class'ına sashipse onu  göster değilse de gizle
        if(item.classList.contains('payed')){
          item.style.display = 'flex'
        }else{
          item.style.display = 'none';
        }
        break;
        

        case 'not-payed':
          // yanlızca ödenmeyenler
          if(!item.classList.contains('payed')){
            item.style.display = "flex";
          }else{
            item.style.display = 'none';
          }
          break;
  }
  });
 
}

