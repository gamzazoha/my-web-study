// progress chart
fetch('https://shopping-mall-rzdwe.run.goorm.site/data')
    .then((response)=>response.json())
    .then((data)=>{
    console.log(data);
    var progressNum=document.getElementsByClassName("number");
    var barSize=document.getElementsByClassName("percent-bar");

    for(var i=0; i<data.progress.length; i++){
        progressNum[i].innerHTML=data.progress[i]+"%";
        barSize[i].style.width=data.progress[i]+"%";
        barSize[i].style.setProperty("--size",data.progress[i]+"%");
    }
});

// toggle menu
var toggleBtnClk=document.getElementById("drop-btn");

function menu(){
    let click=document.getElementById("drop-content");
    click.classList.toggle("hidden");

    // click.classList.remove("dropDown-effect");
    // void click.offsetWidth;
    // click.classList.add("dropDown-effect");
}

toggleBtnClk.addEventListener('click', menu);

var dropContent=document.getElementById("drop-content");
var menuItems=dropContent.getElementsByTagName("a");

var maxHeight=Array.from(menuItems).reduce(function(maxHeight, menuItems) {
    return maxHeight + menuItems.offsetHeight;
}, 0);

dropContent.style.setProperty("maxHeight", maxHeight+"px")

// new carousel
var arrow=document.getElementsByClassName("arrow");
var size=document.getElementsByClassName("slide");
var page=document.getElementsByClassName("frame")[0];
var pageIdx=1; var n;

function plusSlides() {
    if(this.classList.contains("prev")){
        n=-1;
    }
    if(this.classList.contains("next")){
        n=1;
    }
    move(pageIdx+=n);
}

function move() {
    if(pageIdx>=size.length){
        pageIdx=size.length;
    }
    if(pageIdx<=0){
        pageIdx=1;
    }

    var translationValue = ((-20) * (pageIdx - 1)) + '%';
    // console.log(translationValue);
    page.style.transform = `translate(${translationValue})`;    
}

arrow[0].addEventListener('click', plusSlides);
arrow[1].addEventListener('click', plusSlides);

// color button
var btnClk=document.getElementsByClassName("btn");
var area=document.getElementById("color-window");

let options={
    fill: "forwards"
};

function changeColor(event){
    var t=event.target;

    if(t.classList.contains("red")){
        area.style.backgroundColor="rgba(255, 0, 0, 0.4)";
        area.innerHTML="빨간 버튼입니다."
    }
    if(t.classList.contains("green")){
        area.style.backgroundColor="rgba(34, 139, 34, 0.4)";
        area.innerHTML="초록 버튼입니다."
    }
    if(t.classList.contains("blue")){
        area.style.backgroundColor="rgba(0, 0, 255, 0.4)";
        area.innerHTML="파란 버튼입니다."
    }

    area.classList.remove("pop-effect");
    void area.offsetWidth;
    area.classList.add("pop-effect");
}

for(var i=0; i<btnClk.length; i++){
    btnClk[i].addEventListener('click', changeColor);
}