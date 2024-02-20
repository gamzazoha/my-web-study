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
        product.find("#author").text(result.author);
        product.find("#price").text(result.price+"원");
        product.find("#info").text(result.description);
    },
    error: function(error) {
        console.log("Error :", error);
    }
});