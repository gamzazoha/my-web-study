const form = document.getElementById("book-post-form");

form.onsubmit = function(event) {
    // event.preventDefault();

    //modal 띄우기
    modal.style.display = "flex";
};

//modal 닫기
const modal = document.querySelector(".book-modal-container");
const yesBtn = document.getElementById("yes");

yesBtn.addEventListener("click", () => {
    modal.style.display = "none";
});