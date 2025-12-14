var allpages = document.querySelectorAll(".page");
var alltopics = document.querySelectorAll(".topic");
var menubuttons = document.querySelectorAll(".menubutton");
//var pagesbtn = document.querySelector("#pagesbtn");

var contentimgs = document.querySelectorAll(".contentimg");

var raingames = document.querySelectorAll(".raingame>.displayholder>.display");
var activeraingame = 0;

//select all subtopic pages

hideall();
function hideall() {
    for (var onepage of allpages) { //go through all subtopic pages
        onepage.style.display = "none"; //hide it
    }
    for (var onetopic of alltopics) {
        onetopic.style.display = "none";
    }

    if (scaledImage != null) {
        scaledownImage(scaledImage, true);
        scaledImage = null;
    }
}


function show(pgno) {
    hideall();

    //select the page based on the parameter passed in
    var onepage = document.querySelector("#page" + pgno);

    for (var onebtn of menubuttons) {
        onebtn.style.backgroundColor = 'rgb(80, 80, 80)';
    }

    menubuttons[pgno - 1].style.backgroundColor = 'rgb(150, 150, 150)';

    //show the page
    onepage.style.display = "block";
    alltopics[pgno - 1].style.display = "block";

    hideMenuButtons();
}


function smoothMove(element, x, y, duration, percent) {

    const startTime = performance.now();

    var elementX = 0;
    var elementY = 0;
    //get the x and y position of the element
    if (percent == true) {
        elementY = parseFloat(window.getComputedStyle(element).top) / window.innerHeight * 100;
        elementX = parseFloat(window.getComputedStyle(element).left) / window.innerWidth * 100;
    }
    else
    {
        elementY = parseFloat(window.getComputedStyle(element).top);
        elementX = parseFloat(window.getComputedStyle(element).left);
    }

    //move the element to its target destination across a duration
    function animate(currentTime) {

        var elapsedTime = currentTime - startTime;
        var progress = Math.min(elapsedTime / duration, 1);

        if (percent == true) {
            element.style.top = elementY + y * progress + '%';
            element.style.left = elementX + x * progress + '%';
        }
        else {
            element.style.top = elementY + y * progress + 'px';
            if (x > 0) {
                element.style.left = elementX + x * progress + 'px';
            }
        }

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
        else if (percent == false) {
            element.style.top = elementY + y + 'px';
            if (x > 0) {
                element.style.left = elementX + x + 'px';
            }
        }

    }

    requestAnimationFrame(animate);

}
function showMenuButtons() {

    if (menubuttons[0].style.display == "block") {
        hideMenuButtons();
        return;
    }

    let btn2top = window.getComputedStyle(pagesbtn).top;
    let btn2left = window.getComputedStyle(pagesbtn).left;

    for (let onebtn of menubuttons) {
        onebtn.style.display = "block";
        onebtn.style.top = btn2top;
        onebtn.style.left = parseFloat(btn2left) / window.innerWidth * 100;

    }

    smoothMove(menubuttons[0], 0, 70, 100, false);
    smoothMove(menubuttons[1], 0, 140, 100, false);
    
}

var scaledImage = null;
function hideMenuButtons() {

    for (var onebtn of menubuttons) {
        onebtn.style.display = "none";

    }

}


function enlargeImage(img) {

    if (scaledImage != null) {
        scaledownImage(scaledImage);
        scaledImage = null;
    }

    const clonedimg = img.cloneNode(true);
    //clonedimg.classList.toggle('enlarged');
    clonedimg.style.position = "absolute";
    clonedimg.style.transition = "width 0.3s ease, max-height 0.3s ease";

    img.parentElement.style.zIndex = "1000";
    img.parentElement.appendChild(clonedimg);

    setTimeout(function () {
        clonedimg.style.width = "100%";
        clonedimg.style.maxHeight = "50vh";
    }, 10);

    clonedimg.addEventListener('transitionend', function onTransitionEnd() {
        clonedimg.style.transition = ""; // Prevent further transitions
        clonedimg.removeEventListener('transitionend', onTransitionEnd); // Clean up event listener
    });

    clonedimg.addEventListener('click', downscalefunc);

    scaledImage = clonedimg;

}

function scaledownImage(img, instant = false) {

    if (instant == true) {
        img.removeEventListener('click', downscalefunc);
        img.parentElement.style.zIndex = "0";
        img.remove();
    }

    img.removeEventListener('click', downscalefunc);
    img.style.transition = "width 0.3s ease, max-height 0.3s ease";
    
    

    setTimeout(function () {
        img.style.width = "30vw";
        img.style.maxHeight = "30vh";
    }, 10);

    img.addEventListener('transitionend', function onTransitionEnd() {
        img.style.transition = ""; // Prevent further transitions
        img.parentElement.style.zIndex = "0";
        img.removeEventListener('transitionend', onTransitionEnd); // Clean up event listener
        img.remove();
    });

    scaledImage = null;
}

show(1);
//hideMenuButtons();
//menubuttons[0].addEventListener("click", function () { show(1); });
//menubuttons[1].addEventListener("click", function () { show(2); });
//pagesbtn.addEventListener("click", function () { showMenuButtons(); });

//var enlargeimgfunc = function () { enlargeImage(this); };
//var downscalefunc = function () { scaledownImage(this); };
//for (const oneimg of contentimgs) {
//    oneimg.addEventListener("click", enlargeimgfunc);
//}