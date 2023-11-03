let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let tbody = document.getElementById('tbody');
let deleteAllBtn = document.getElementById('deleteAllBtn');
let search = document.getElementById('search');
let tmp;
let mod = 'create';
// console.log(title, price, taxes, ads, discount, total, count, category, submit);

function getTotal() {
    if (price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
        total.innerHTML = result;
        total.style.backgroundColor = 'green';
    }
    else {
        total.innerHTML = 0;
        total.style.backgroundColor = 'red';
    }
}
let  dataPro;
// creat product 
if(localStorage.product != null){
    
        dataPro = JSON.parse(localStorage.product);
}else{
        dataPro = [];
}

submit.onclick  = function() {
    // console.log(title, price, taxes, ads, discount, total, count, category, submit);
    let newPro = {
        title :title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category: category.value
    }
    if(mod === 'create'){
        if(newPro.count > 1){
            for (let i = 0 ; i < newPro.count; i++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
       
    }else{
        dataPro[tmp] = newPro;
        mod = 'create';
        submit.innerHTML = 'create';
        count.style.display = "block";
    }
    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData();
    showData();
    // console.log(dataPro);
}
showData();

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
    total.style.backgroundColor = 'red'
}

function showData(){

    let table = '';
    for(let i = 0; i < dataPro.length; i++){
         table += `
         <tr>
         <td>${i}</td>
         <td>${dataPro[i].title}</td>
         <td>${dataPro[i].price}</td>
         <td>${dataPro[i].taxes}</td>
         <td>${dataPro[i].ads}</td>
         <td>${dataPro[i].discount}</td>
         <td>${dataPro[i].total}</td>
         <td>${dataPro[i].category}</td>
         <td><button onclick ="updateData(${i})" id="update">update</button></td>
         <td><button onclick = deleteData(${i}) id="delete">delete</button></td>
     </tr>`
    }

    tbody.innerHTML = table;
    if (dataPro.length > 0){
        deleteAllBtn.innerHTML = 
        `<button onclick = "deleteAll()" >delete all (${dataPro.length})</button>` ;
        deleteAllBtn.style.display = 'block';
    }
}

 function deleteData(i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
    // console.log(i);
 }

 function deleteAll () {
    dataPro.splice(0);
    localStorage.clear();
    deleteAllBtn.style.display = 'none';
    showData();

 }

 function updateData (i) {
    title.value =  dataPro[i].title;
    price.value =  dataPro[i].price;
    taxes.value =  dataPro[i].taxes;
    ads.value =  dataPro[i].ads;
    discount.value =  dataPro[i].discount;
    category.value =  dataPro[i].category;
    total.innerHTML = dataPro[i].total;
    total.style.backgroundColor = 'green';
    count.style.display = 'none';
    submit.innerHTML = 'update';
    mod = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
    }

    let searchMood = 'title';
function getSearchMood (id) {
   if (id == 'searchTitle') {
        searchMood = 'title';
    }
    else {
        searchMood = 'category';  
    }
    search.placeholder = 'Search by ' + searchMood ;
    search.focus();
 } 

function searchData(value) {
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
    if(searchMood == 'title'){
            if(dataPro[i].title.toLowerCase.includes(value.toLowerCase)){
                table += `
                        <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick ="updateData(${i})" id="update">update</button></td>
                        <td><button onclick = deleteData(${i}) id="delete">delete</button></td>
                        </tr>`
            }
        }else{
            if(dataPro[i].category.includes(value)){
                table += `
                        <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick ="updateData(${i})" id="update">update</button></td>
                        <td><button onclick = deleteData(${i}) id="delete">delete</button></td>
                        </tr>`
            }
        }
    }
    tbody.innerHTML = table;
}
    