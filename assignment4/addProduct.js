const ulNode = document.getElementById("item-box");
const priceP = document.querySelector(".bill");
let price = 0;

dataOfItem = JSON.parse(localStorage.getItem("itemList"));

// 장바구니에 들어왔을때 상품이 없으면 문구 생성
if(dataOfItem == null || dataOfItem.length == 0){
    const noItemP = document.createElement("p");
    noItemP.id = "noItem";
    noItemP.innerText = "아직 고른 책이 없어요.";

    console.log(noItemP);

    const productsContainer = document.querySelector(".products-container");
    productsContainer.appendChild(noItemP);
}

if(dataOfItem != null){
    for(let i=0;i<dataOfItem.length;i++){
        $.ajax({
            url: "http://43.203.50.204:8080/api/books?id=" + dataOfItem[i],
            method: "GET",
            async:false,
            success: function (result) {
                const divNode = document.createElement("div");
                divNode.className = `product-box ${dataOfItem[i]}`;
                const newImg = document.createElement("img");
                newImg.className = "product-img";
                newImg.src = result.imagePath;
    
                const infoDiv = document.createElement("div");
                infoDiv.className = "info-box";
    
                const newLi = document.createElement("li");
                newLi.className = `item ${result.price}`;
                const newBtn = document.createElement("button");
                newBtn.className = "delete";
                const newIcon = document.createElement("span");
                newIcon.className = "material-symbols-outlined";
                newIcon.textContent = "close";
    
                newBtn.appendChild(newIcon);
                divNode.appendChild(newImg);
                infoDiv.appendChild(newLi);
                infoDiv.appendChild(newBtn);
                divNode.appendChild(infoDiv);
                ulNode.appendChild(divNode);
    
                price = price + Number(result.price);
                newLi.textContent = result.title + " - " + result.author + ", ₩" + result.price;
            },
            error: function(error) {
                console.log("Error :", error);
            }
        });
    
        if(i == (dataOfItem.length - 1)){
            priceP.textContent = price + "원";
        }
    };
};

const deleteBtn = document.getElementsByClassName("delete");
const parentUl = document.getElementById("item-box");
const childLi = document.getElementsByClassName("item");

function Delete() {
    const parentDiv = this.parentElement.parentElement;
    const priceValue = parentDiv.querySelector(".item");
    const delPrice = priceValue.classList[1];

    let ListOFItem = JSON.parse(localStorage.getItem("itemList"));
    ListOFItem.splice($(this.parentElement.parentElement).index(), 1);
    localStorage.setItem("itemList", JSON.stringify(ListOFItem));

    price = price - delPrice;
    priceP.textContent = price + "원";
    parentDiv.remove();

    //상품을 삭제했을때 더 이상 상품이 없으면 문구 생성
    if(childLi.length == 0){
        const noItemP = document.createElement("p");
        noItemP.id = "noItem";
        noItemP.innerText = "아직 고른 책이 없어요.";
    
        console.log(noItemP);
    
        const productsContainer = document.querySelector(".products-container");
        productsContainer.appendChild(noItemP);
    }
};

parentUl.addEventListener(("mousemove"), (e) => {
    for(let i=0;i<childLi.length;i++){
        const childElement = e.currentTarget.children[i].querySelector(".delete");

        childElement.addEventListener("click", Delete);
    }
});