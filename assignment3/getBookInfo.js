//책 정보 가져오기
const URLSearch = new URLSearchParams(location.search);
const id = URLSearch.get("book");

$.ajax({
    url: "http://43.203.50.204:8080/api/books?id=" + id,
    method: "GET",
    success: function (result) {
        document.title = result.title; // 페이지 제목 바꾸기

        const product = $(".detail-container");

        product.find("img").attr("src", result.imagePath);
        product.find("#title").text(result.title);
        product.find("#author").text(result.author+" (저자)");
        product.find("#regular-price").text(parseInt(result.price*1.1)+"원");
        product.find("#price").text(result.price+"원 (10% 할인)");
        product.find("#info").text(result.description);
    },
    error: function(error) {
        console.log("Error :", error);
    }
});

//장바구니 추가
const cartAddBtn = document.querySelector("#add-cart-btn");
let items = []

cartAddBtn.addEventListener("click", () => {
    if(localStorage.itemList == undefined){
        items.push(id);
        localStorage.setItem("itemList", JSON.stringify(items));
    }
    else {
        let items = JSON.parse(localStorage.getItem("itemList"));
        items.push(id);
        localStorage.setItem("itemList", JSON.stringify(items));
    }
});
cartAddBtn.addEventListener("click",() => {
    // modal 보이기
    modalFlag = 1;
    modal.style.display = "flex";
});

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