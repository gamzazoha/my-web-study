let end;
let products = [];

function fetchProducts() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://43.203.50.204:8080/api/books/list",
            method: "GET",
            async: false,
            success: function (result) {
                resolve(result);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

fetchProducts()
    .then((result) => {
        end = result.length;
        products = result.map(book => ({
            id: book.id,
            imagePath: book.imagePath,
            title: book.title,
            author: book.author,
            price: book.price
        }));

        renderProducts(3);
    })
    .catch((error) => {
        console.log("Error :", error);
    });

function renderProducts(endIndex) {
    for (let i = 0; i < endIndex; i++) {
        if(i >= end){ //요소가 없으면 더 이상 저장하지 않음
            break;
        }

        const product = document.querySelectorAll(".product");
        product[i].classList = "product";
        product[i].classList.add(`${products[i].id}`);
        product[i].querySelector("img").src = products[i].imagePath;
        product[i].querySelector(".title").textContent = products[i].title;
        product[i].querySelector(".author").textContent = "저자 : " + products[i].author;
        product[i].querySelector(".price").textContent = "₩" + products[i].price;
    }
}

// div 동적 생성
let start = 0;
const addBtn = document.getElementsByClassName("add");
const productContainerNode = document.getElementById("products-container");
addBtn[0].addEventListener("click", () => {
    for(let i=start; i<start+3; i++){
        if(i >= end-3){ //data가 없으면 요소 생성을 중단
            break;
        }
        
        const newDiv = document.createElement("div");
        newDiv.className = "product";
        
        newDiv.innerHTML = `
            <img>
            <a class="book-info-page" href="#none"><p class="title">title</p></a>
            <p class="author"></p>
            <div class="buy">
                <p class="price">$1000</p>
                <button type="button" class="button">
                    <span class="material-symbols-outlined">
                        shopping_cart
                    </span>
                    장바구니
                </button>
            </div>
        `

        productContainerNode.appendChild(newDiv);
    }

    start = start + 3;
    if(start >= end){   //data가 없으면 start의 증가도 중지
        start = end;
    }
    renderProducts(start+3); // end index가 들어감
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

function cartMove() {
    // modal 가리기
    modal.style.display = '';
    modal.style.display = "none";
};

noBtn.addEventListener("click", cartMove);
yesBtn.addEventListener("click", cartMove);

// sort product
const bookSortForm = document.querySelector(".book-sort-form");
const bookSort = document.querySelector(".book-sort");

bookSort.addEventListener("change", () => {
    let productsContainer = document.querySelector("#products-container");
    
    if(bookSort.value == "normal") {
        products.sort(function(a, b) {
            return a.id - b.id;
        });
    } else if(bookSort.value == "descending-order") {
        products.sort(function(a, b) {
            return a.price - b.price;
        });
    } else if(bookSort.value == "ascending-order") {
        products.sort(function(a, b) {
            return a.price - b.price;
        });
        products.reverse();
    } else if(bookSort.value == "a-to-z") {
        products.sort(function(a, b) {
            return a.title.localeCompare(b.title);
        });
    } else if(bookSort.value == "z-to-a") {
        products.sort(function(a, b) {
            return a.title.localeCompare(b.title);
        });
        products.reverse();
    }

    renderProducts(start+3);
});