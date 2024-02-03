// get data

$.ajax({
    url: "https://shopping-mall-rzdwe.run.goorm.site/books/",
    method: "GET",
    // async: true, /* ??? */
    success : function(result) {
        console.log(result);
        for(let i=0;i<result.length;i++){
            // $(".product").eq(i).find("img").attr("src", "https://shopping-mall-rzdwe.run.goorm.site/books/image/"+result[i].imageNum+".jpeg");
            $(".product").eq(i).find("img").attr("src", result[i].imageNum);
            $(".product").eq(i).find(".title").text(result[i].title);
            $(".product").eq(i).find(".price").text(result[i].price+"₩");
        }
    }
});