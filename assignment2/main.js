let end;

function renderProducts(startIndex) {
    $.ajax({
        url: "https://shopping-mall-rzdwe.run.goorm.site/books/",
        method: "GET",
        success: function (result) {
            end = result.length;
            console.log(result);
            for (let i = startIndex; i < startIndex + 3; i++) {
                if(i >= end){ //요소가 없으면 더 이상 저장하지 않음
                    break;
                }
                
                const product = $(".product").eq(i);
                product.find("img").attr("src", result[i].imageNum);
                product.find(".title").text(result[i].title);
                product.find(".author").text("저자 : " + result[i].author);
                product.find(".price").text("₩" + result[i].price);
            }
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
        newDiv.className = "product"
        const newImg = document.createElement("img");

        newDiv.appendChild(newImg);

        const aNode = document.createElement("a");
        const titleP = document.createElement("p");
        titleP.className = "title"

        aNode.appendChild(titleP);
        newDiv.appendChild(aNode);

        const authorP = document.createElement("p");
        authorP.className = "author";

        newDiv.appendChild(authorP);

        //buy div
        const buyDiv = document.createElement("div");
        buyDiv.className = "buy"
        const priceP = document.createElement("p");
        priceP.className = "price"

        buyDiv.appendChild(priceP);

        const btnButton = document.createElement("button");
        btnButton.className = "button"
        const iconSpan = document.createElement("span");
        iconSpan.className = "material-symbols-outlined";
        iconSpan.textContent = "shopping_cart";

        btnButton.appendChild(iconSpan);

        var newText = document.createTextNode("장바구니");
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
var numberOfBook = 0;

function cartAdd() {
    var title = this.querySelector(".title").textContent;
    var author = this.querySelector(".author").textContent;
    var price = this.querySelector(".price").textContent;
    localStorage.setItem(`item${numberOfBook}`,
        JSON.stringify({title: title, author: author, price: price})
    );
    numberOfBook = numberOfBook + 1;
};

//dynamic binding
const staticParent = document.querySelector("#products-container");
const dynamicChild = document.getElementsByClassName("product");

staticParent.addEventListener(("mousemove"), (e) => {
    console.log(dynamicChild.length);
    for(let i=dynamicChild.length - 3;i<=dynamicChild.length;i++){
        e.currentTarget.children[i].addEventListener("click", cartAdd);
    }
});