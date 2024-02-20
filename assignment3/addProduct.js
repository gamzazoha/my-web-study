const ulNode = document.getElementById("item-box");
const priceP = document.querySelector(".bill");
let price = 0;

dataOfItem = JSON.parse(localStorage.getItem("itemList"));

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
            const newLi = document.createElement("li");
            newLi.className = `item ${result.price}`;
            const newBtn = document.createElement("button");
            newBtn.className = "delete";
            const newIcon = document.createElement("span");
            newIcon.className = "material-symbols-outlined";
            newIcon.textContent = "close";

            newBtn.appendChild(newIcon);
            divNode.appendChild(newImg);
            divNode.appendChild(newLi);
            divNode.appendChild(newBtn);
            ulNode.appendChild(divNode);

            price = price + Number(result.price);
            console.log(price);
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

const deleteBtn = document.getElementsByClassName("delete");
const parentUl = document.getElementById("item-box");
const childLi = document.getElementsByClassName("item");

function Delete() {
    const parentDiv = this.parentElement;
    const priceValue = parentDiv.querySelector(".item");
    const delPrice = priceValue.classList[1];
    console.log(delPrice);

    let ListOFItem = JSON.parse(localStorage.getItem("itemList"));
    let updateItem;

    ListOFItem.splice($(this.parentElement).index(), 1);
    localStorage.setItem("itemList", JSON.stringify(ListOFItem));

    price = price - delPrice;
    priceP.textContent = price + "원";
    parentDiv.remove();
};

parentUl.addEventListener(("mousemove"), (e) => {
    for(let i=0;i<childLi.length;i++){
        const childElement = e.currentTarget.children[i].querySelector(".delete");

        childElement.addEventListener("click", Delete);
    }
});