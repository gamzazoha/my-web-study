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

//no move
const bookPostForm = document.querySelector("#book-post-form");

$(document).ready(function() {
    bookPostForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let formData = new FormData(this);

        $.ajax({
            type: "POST",
            url: "http://43.203.50.204:8080/api/books",
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                console.log("success.");
            },
            error: function(response) {
                console.log("fail.");
            }
        });
    });
});