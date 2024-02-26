let end;

function renderProducts(startIndex) {
    $.ajax({
        url: "http://43.203.50.204:8080/api/books/list",
        method: "GET",
        success: function (result) {
            end = result.length;
            // console.log(result);
            for (let i = startIndex; i < startIndex + 3; i++) {
                if(i >= end){ //요소가 없으면 더 이상 저장하지 않음
                    break;
                }

                const product = $(".product").eq(i);
                product.addClass(`${result[i].id}`);
                product.find("img").attr("src", result[i].imagePath);
                product.find(".title").text(result[i].title);
                product.find(".author").text("저자 : " + result[i].author);
                product.find(".price").text("₩" + result[i].price);
            }
        },
        error: function(error) {
            console.log("Error :", error);
        }
    });
}

let start = 0;
renderProducts(start);

const addBtn = document.getElementsByClassName("add");

addBtn[0].addEventListener("click", () => {
    for(let i=start; i<start+3; i++){
        if(i >= end-3){ //data가 없으면 요소 생성을 중단
            break;
        }
        const productContainerNode = document.getElementById("products-container");
        
        const newDiv = document.createElement("div");
        newDiv.className = "product";
        const newImg = document.createElement("img");

        newDiv.appendChild(newImg);

        const aNode = document.createElement("a");
        aNode.className = "book-info-page";
        const titleP = document.createElement("p");
        titleP.className = "title";

        aNode.appendChild(titleP);
        newDiv.appendChild(aNode);

        const authorP = document.createElement("p");
        authorP.className = "author";

        newDiv.appendChild(authorP);

        //buy div
        const buyDiv = document.createElement("div");
        buyDiv.className = "buy";
        const priceP = document.createElement("p");
        priceP.className = "price";

        buyDiv.appendChild(priceP);

        const btnButton = document.createElement("button");
        btnButton.className = "button"
        const iconSpan = document.createElement("span");
        iconSpan.className = "material-symbols-outlined";
        iconSpan.textContent = "shopping_cart";

        btnButton.appendChild(iconSpan);

        const newText = document.createTextNode("장바구니");
        btnButton.appendChild(newText);

        buyDiv.appendChild(btnButton);
        newDiv.appendChild(buyDiv);

        productContainerNode.appendChild(newDiv);
    }

    start = start + 3;
    if(start >= end){   //data가 없으면 start의 증가도 중지
        start = end;
    }
    renderProducts(start);
});

//cart add
const cartBtn = document.getElementsByClassName("button");
let numberOfBook = 0;
let itemID = [];

function cartAdd() {
    const getElementId = this.parentNode.parentNode;
    let id = getElementId.classList[1];

    if(localStorage.itemList == undefined){
        itemID.push(id);
        localStorage.setItem("itemList", JSON.stringify(itemID));
    }
    else {
        let itemID = JSON.parse(localStorage.getItem("itemList"));
        itemID.push(id);
        localStorage.setItem("itemList", JSON.stringify(itemID));
    }
};

//dynamic binding
const staticParent = document.querySelector("#products-container");
const dynamicChild = document.getElementsByClassName("product");

staticParent.addEventListener(("mousemove"), (e) => {
    for(let i=0;i<dynamicChild.length;i++){
        //상세 페이지 이동
        const detailFunctionAdd = e.currentTarget.children[i].querySelector(".title");
        detailFunctionAdd.addEventListener("click", function() {
            const getElement = this.parentNode.parentNode;
            let bookID = getElement.classList[1];
            movePage(bookID);
        });
        //장바구니
        const cartFunctionAdd = e.currentTarget.children[i].querySelector(".button");
        cartFunctionAdd.addEventListener("click", cartAdd);
        cartFunctionAdd.addEventListener("click",() => {
            // modal 보이기
            modalFlag = 1;
            modal.style.display = "flex";
        });
    }
});

//page move
const movePage = function(page) {
    const URLSearch = new URLSearchParams();
    URLSearch.set('book', String(page));
    const newParam = URLSearch.toString();

    window.location.href = "detail.html?" + newParam;
}

//modal
const modal = document.querySelector(".cart-modal-container");
const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
let modalFlag = 0;

function cartMove() {
    // modal 가리기
    modalFlag = 0;
    modal.style.display = '';
    modal.style.display = "none";
};

noBtn.addEventListener("click", cartMove);
yesBtn.addEventListener("click", cartMove);