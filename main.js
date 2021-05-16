const priceEle = document.querySelector("#input-price"), 
descEle = document.querySelector("#input-desc"),
addBtnEle = document.querySelector("#btn-add"),
listEle = document.querySelector("#list-group"),
totalEle = document.querySelector("#txt-total"),
toastMessageEle = document.querySelector("#toast-message")

const manageAddBtn = () => {
    addBtnEle.disabled = descEle.value.length > 0 && priceEle.value.length > 0 && priceEle.value > 0 ? false: true
}
manageAddBtn();

let expenseArr = [];
let totalExpense=0;
if(localStorage.getItem("expenseArr") !== null && localStorage.getItem("totalExpense") !== null){
    expenseArr = JSON.parse(localStorage.getItem("expenseArr"))
    totalExpense = JSON.parse(localStorage.getItem("totalExpense"))
}

function setItemInLocalStorage(array, total){
    localStorage.setItem("expenseArr", JSON.stringify(array))
    localStorage.setItem("totalExpense", JSON.stringify(total))
}

function getTotalExpense(array) {
    return array.reduce((sum, {price}) => (sum+price), 0);
}

addBtnEle.addEventListener("click", () => {
    const priceText = priceEle.value;
    const price = parseInt(priceText, 10);
    const desc = descEle.value;
    const momentDate = new Date();
    const moment = momentDate.toLocaleDateString();
    const expense = {id: expenseArr.length, price: price, desc: desc, moment: moment}
    expenseArr.push(expense);
    renderList(expenseArr);
    totalExpense = getTotalExpense(expenseArr);    totalExpense>0 && renderTotalExpense(totalExpense);
    setItemInLocalStorage(expenseArr, totalExpense)

    priceEle.value = null
    descEle.value = null
}, false)

// function removeItem(_id) {
//     newArr = expenseArr.filter(({id}) => id !== _id) 
//     renderList(newArr);
//     totalExpense = getTotalExpense(newArr)
//     totalExpense>0 && renderTotalExpense(totalExpense);
//     setItemInLocalStorage(newArr, totalExpense)
// }


const listTemplate = ({id, price, desc, moment}) => {
    return(`<li class="list-group-item d-flex justify-content-between">
    <div class="d-flex flex-column">
        ${desc}
        <small class="text-muted">${moment}</small>
    </div>
    <div>
        <span class="px-5">
        ₹${price}
        </span>
        <button type="button" class="btn btn-outline-danger btn-sm" 
        
        >
            <i class="fas fa-trash-alt"></i>
        </button>
    </div>
</li>`)
}


const renderList = (expenseArr) => {
    listEle.innerHTML = expenseArr.reverse().map(expense => listTemplate(expense)).join("");
}

const renderTotalExpense = (totalExpense) => {
    totalEle.innerHTML = `Total Amount: ₹${totalExpense}`
}

renderList(expenseArr);
totalExpense>0 && renderTotalExpense(totalExpense);