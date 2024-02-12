const ulNode = document.getElementById("item-box");
const priceP = document.querySelector(".bill");
let price = 0;
// const 가격바꾸기

for(let i=0;i<window.localStorage.length;i++){
    const key = window.localStorage.key(i);
    
    const divNode = document.createElement("div");
    divNode.className = "product-box";
    const newLi = document.createElement("li");
    newLi.className = "item";
    const newBtn = document.createElement("button");
    newBtn.className = "delete";
    const newIcon = document.createElement("span");
    newIcon.className = "material-symbols-outlined";
    newIcon.textContent = "close";

    newBtn.appendChild(newIcon);
    divNode.appendChild(newLi);
    divNode.appendChild(newBtn);
    ulNode.appendChild(divNode);

    //total price
    const info = JSON.parse(localStorage.getItem(key));
    const tmp = info.price;
    price = price + Number(tmp.substring(1,));
    newLi.textContent = info.title + ", " + info.author + ", " + info.price;
    
    divNode.classList = divNode.classList + " " + key;

    if(i == window.localStorage.length - 1){
        priceP.textContent = price + "원";
    }
};

const deleteBtn = document.getElementsByClassName("delete");
const parentUl = document.getElementById("item-box");
const childLi = document.getElementsByClassName("item");

function Delete() {
    const parentDiv = this.parentElement;
    const keyValue = parentDiv.classList[1];
    const info = JSON.parse(localStorage.getItem(keyValue));
    const delPrice = Number(info.price.substring(1,));

    price = price - delPrice;
    priceP.textContent = price + "원";
    window.localStorage.removeItem(keyValue);
    parentDiv.remove();
};

parentUl.addEventListener(("mousemove"), (e) => {
    for(let i=0;i<childLi.length;i++){
        const key = window.localStorage.key(i);
        const childElement = e.currentTarget.children[i].querySelector(".delete");

        childElement.addEventListener("click", Delete);
    }
});