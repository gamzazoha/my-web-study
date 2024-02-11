const ulNode = document.getElementById("item-box");
const priceP = document.querySelector(".bill");
let price = 0;
// const 가격바꾸기

for(let i=0;i<window.localStorage.length;i++){
    const key = window.localStorage.key(i);
    
    const newLi = document.createElement("li");
    newLi.className = "item";
    const divNode = document.createElement("div");
    divNode.className = "product-box";
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
    if(i == window.localStorage.length - 1){
        priceP.textContent = price + "원";
    }
};

// const deleteBtn = document.getElementsByClassName("delete");
// const parentUl = document.getElementById("item-box");
// const childLi = document.getElementsByClassName("item");

// function Delete() {
//     const parentDiv = this.parent.parent;
//     parentDiv.remove;
// };

// parentUl.addEventListener(("mousemove"), (e) => {
//     console.log(childLi.length);
//     for(let i=0;i<=childLi.length;i++){
//         console.log(e.currentTarget.children.children);
//         // e.currentTarget.children.children.next.addEventListener("click", Delete);
//     }
// });