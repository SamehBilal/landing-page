/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 *
*/
var ul = document.querySelector("#navbar__list");
var sections = document.querySelectorAll('section');
var countSections = sections.length;
var i = 1;
var scrollTopButton = document.getElementById("scrollTopButton");

/**
 * End Global Variables
 * Start Helper Functions
 *
*/


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function sectionAppending(){
    for ( i; i <= countSections; i++)
    {
        var li = document.createElement("li");
        var a = document.createElement("a");
        li.className = "section"+i;
        a.className = "menu__link";
        a.setAttribute("onclick", "scrollToSection("+i+")"); // add scroll to ID function
        a.appendChild(document.createTextNode("Section"+i));
        ul.appendChild(li);
        li.appendChild(a);
    }
}

// Add class 'active' to section when near top of viewport

// Viewport detection
function viewPort(element) {
    var bounding    = element.getBoundingClientRect();
    var Width       = window.innerWidth || document.documentElement.clientWidth;
    var Height      = window.innerHeight || document.documentElement.clientHeight;
    elementFrom     = function (x, y) { return document.elementFromPoint(x - 20, y - 20) };

    if (bounding.right < 0 || bounding.bottom < 0 || bounding.left > Width || bounding.top > Height)
    {
        return false;
    }else{
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            return true;
        }else{
            return (
                element.contains(elementFrom(bounding.left,  bounding.top)) ||  element.contains(elementFrom(bounding.right, bounding.top)) ||  element.contains(elementFrom(bounding.right, bounding.bottom)) ||  element.contains(elementFrom(bounding.left,  bounding.bottom))
            );
        }
    }

    /* Old Code */
    /*return (
        bounding.top >= 0 && bounding.left >= 0 &&
        bounding.bottom <= (Width) && bounding.right <= (Width)
    );*/
}


// add class active to section and class active__link to nav
function addClassActive(element) {
    element.classList.add("active");
    var dataNav = element.getAttribute("data-nav");
    var className = document.querySelector("."+dataNav);
    className.classList.add("active__link")
}

// remove class active from and class active__link from nav
function removeClassActive(element) {
    element.classList.remove("active");
    var dataNav = element.getAttribute("data-nav");
    var className = document.querySelector("."+dataNav);
    className.classList.remove("active__link")
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(anchor) {
    var elementToView  = document.getElementById("section"+anchor);
    elementToView .scrollIntoView({behavior: "smooth"});
}

// Scroll button display and hide
function scrollButtonDisplaying() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        scrollTopButton.style.display = "block";
    } else {
        scrollTopButton.style.display = "none";
    }
}

// Scroll to top function
function scrolltoTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
document.addEventListener("DOMContentLoaded", function(){
    sectionAppending(); // append menu
});

// Set sections as active
window.addEventListener("scroll", function(event) {
    scrollButtonDisplaying();
    sections.forEach(element => {
        if (viewPort(element)) {
            addClassActive(element) // add class active
        }else{
            removeClassActive(element) // remove class active
        }
    });
}, false);
