// Start side-links
// Get -> bars , side-links , setting-gear , header , close
let bars = document.querySelector(".bars");
let sideLinks = document.querySelector(".side-links");
let settingGear = document.querySelector(".setting-gear");
let header = document.querySelector(".header");
let close = document.querySelector(".close");
let landingPage = document.querySelector(".landing-page");

// bars Toggle Side-links
bars.onclick = function () {
    sideLinks.classList.toggle("open");
}

// setting-gear Open Side-links
settingGear.onclick = () => {
    sideLinks.classList.add("open");
    header.classList.add("hide");
    settingGear.classList.add("hide");
}

// setting-gear Close Side-links
close.onclick = function () {
    sideLinks.classList.remove("open");
    header.classList.remove("hide");
    settingGear.classList.remove("hide");
}

// Open and Close settings-content and spin Icon
let settingsIcon = document.querySelector(".setting-icon");
let settingContent = document.querySelector(".settings-content")
let settingsGearIcon = document.querySelector(".setting-icon i");

settingsIcon.onclick = () => {
    settingsGearIcon.classList.toggle("spin");
    settingContent.classList.toggle("hidden");
}

// Handle Active Function
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
        ele.classList.remove("active");
    });
    ev.target.classList.add("active");
}

// Change --main-color Property in color.
let colorLi = document.querySelectorAll(".color li");
colorLi.forEach((li) => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        handleActive(e);
        localStorage.setItem("color_option", e.target.dataset.color);
    });
});

// Check LocalStorage For color
let localColor = localStorage.getItem("color_option");
if (localColor !== null) {
    document.documentElement.style.setProperty("--main-color", localColor);
    colorLi.forEach((li) => {
        li.classList.remove("active");
        if (li.dataset.color === localColor) {
            li.classList.add("active");
        }
    });
}

// Randomize Function landing background
let randomBgLi = document.querySelectorAll(".random-bg li");
let check = false;
let changeBg;

function randomize() {
    if (check === true) {
        changeBg = setInterval(() => {
            let landingPage = document.querySelector(".landing-page");
            let imgArray = ["landing bg 01.png", "landing bg 02.jpg", "landing bg 03.jpg", "landing bg 04.jpg", "landing bg 05.webp"];
            let randomNum = Math.floor(Math.random() * imgArray.length);
            landingPage.style.backgroundImage = `url('../imgs/${imgArray[randomNum]}')`;
        }, 1000);
    }
}
// randomize();

// Change random-bg Option
randomBgLi.forEach((li) => {
    li.addEventListener("click", (e) => {
        handleActive(e);
        if (e.target.dataset.random === "yes") {
            check = true;
            randomize();
        } else {
            check = false;
            clearInterval(changeBg);
        }
        localStorage.setItem("radomBg_option", e.target.dataset.random);
    });
});

// Check LocalStorage For random-bg
let randomOption = localStorage.getItem("radomBg_option");
if (randomOption !== null) {
    if (randomOption === "yes") {
        check = true;
        randomize()
    } else {
        check = false;
        clearInterval(changeBg);
    }
    randomBgLi.forEach((li) => {
        li.classList.remove("active");
        if (li.dataset.random === randomOption) {
            li.classList.add("active");
        }
    });
}

// arrow-up click to top
let mainLinks = document.querySelectorAll(".links li a");
let homeLinks = document.querySelectorAll(".links li a.active")
let arrowUp = document.querySelector(".arrow-up");
arrowUp.onclick = () => {
    landingPage.scrollIntoView({
        behavior: 'smooth'
    });
    mainLinks.forEach((a) => {
        a.classList.remove("active");
    });
    homeLinks.forEach((a) => {
        a.classList.add("active");
    });

}

// arrow-up show or hide option
let arrowUpOption = document.querySelectorAll(".arrow-up-option li");
arrowUpOption.forEach((li) => {
    li.addEventListener('click', (e) => {
        handleActive(e);
        if (e.target.dataset.access === "no") {
            arrowUp.classList.add("hide");
        } else {
            arrowUp.classList.remove("hide");
        }
        localStorage.setItem("arrow_option", e.target.dataset.access);
    });
});

// check localStorage arrow-up show or hide option
let arrowOption = localStorage.getItem("arrow_option");
if (arrowOption !== null) {
    arrowUpOption.forEach((li) => {
        li.classList.remove("active");
        if (li.dataset.access === arrowOption) {
            li.classList.add("active");
        }
    });
    if (arrowOption === "no") {
        arrowUp.classList.add("hide");
    } else {
        arrowUp.classList.remove("hide");
    }
}

// Get Chefs img grayscale
let chefImg = document.querySelectorAll(".chefs .boxes .box img");
let firstChefImg = document.querySelector(".chefs .boxes .box img");

// Header Scroll Background black and arrowUp and Chefs
window.onscroll = () => {
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop > 50) {
        header.style.background = "black";
        arrowUp.style.right = "70px";
    } else {
        header.style.background = "transparent";
        arrowUp.style.right = "-70px";
    }
    //
    let firstChefImgOffSetTop = firstChefImg.offsetTop;
    let firstChefImgOffSetHeight = firstChefImg.offsetHeight;
    let windowHeight = this.innerHeight;
    if (windowScrollTop > firstChefImgOffSetTop + firstChefImgOffSetHeight - windowHeight) {
        chefImg.forEach((img) => {
            img.style.border = "1px solid var(--main-color)";
            img.style.padding = "10px";
        });
    }
};

// Reset All Options
let resetOptions = document.querySelector(".reset-options");
resetOptions.onclick = () => {
    // localStorage.clear();  to clear all items
    localStorage.removeItem("arrow_option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("radomBg_option");
    window.location.reload();
}

// Go To Sections
mainLinks.forEach((a) => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        mainLinks.forEach((a) => {
            a.classList.remove("active");
            if (a.dataset.section === e.target.dataset.section) {
                a.classList.add("active");
            }
        });
        close.click();
        document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Go To Book Table
let bookLink = document.querySelectorAll("a.book-link");
bookLink.forEach((a) => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(".book-table").scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// End sideList

// Start OurDishes
let dishes = document.querySelectorAll(".dishes .box")
let moveLeft = document.querySelector(".move-left");
let moveRight = document.querySelector(".move-right");
let x = 0;

moveRight.addEventListener('click', () => {
    if (x <= dishes.length / 2) {
        x++;
        if (x <= dishes.length / 2) {
            dishes.forEach((box) => {
                box.style.transform = `translateX(calc(-100% * ${x} - 20px * ${x}))`
            });
        }
    }
});

moveLeft.addEventListener('click', () => {
    if (x >= 1) {
        if (x == dishes.length / 2 + 1) {
            x--;
        }
        x--;
        dishes.forEach((box) => {
            box.style.transform = `translateX(calc(-100% * ${x} - 20px * ${x}))`
        });
    }
});

// End OurDishes

// Start about
let playVideo = document.querySelector(".play-video");
playVideo.addEventListener('click', (e) => {
    // create overLay
    let overLay = document.createElement("div");
    overLay.classList.add("gallery-overlay");
    document.body.appendChild(overLay);
    // create image
    let popupBox = document.createElement("div");
    popupBox.classList.add("popup-box");
    document.body.appendChild(popupBox);
    //create video
    let video = document.createElement("video");
    video.src = `../video/3c2fbae14439c0300d9244974757d6a5.mp4`;
    video.setAttribute("controls", "controls");
    popupBox.appendChild(video);
    // create close-icon
    let close = document.createElement("span")
    close.classList.add("close-popup");
    let closeText = document.createTextNode("x");
    close.appendChild(closeText);
    document.body.appendChild(close);
    // close popup
    close.onclick = () => {
        overLay.remove();
        popupBox.remove();
        close.remove();
    };
    // close popup when click on overLay
    overLay.onclick = () => {
        close.click();
    }
});
// End about

// Start menu
let categories = document.querySelectorAll(".categories li");
let menuBoxes = document.querySelectorAll(".menu .boxes .box");
categories.forEach((li) => {
    li.addEventListener('click', (e) => {
        handleActive(e);
        if (e.target.dataset.type !== "all") {
            menuBoxes.forEach((box) => {
                box.classList.add("hidden");
            });
        } else {
            menuBoxes.forEach((box) => {
                box.classList.remove("hidden");
            });
        }
        if (e.target.dataset.type === "burger") {
            menuBoxes.forEach((box) => {
                if (box.classList.contains("burger")) {
                    box.classList.remove("hidden");
                }
            });
        } else if (e.target.dataset.type === "pizza") {
            menuBoxes.forEach((box) => {
                if (box.classList.contains("pizza")) {
                    box.classList.remove("hidden");
                }
            });
        } else if (e.target.dataset.type === "steak") {
            menuBoxes.forEach((box) => {
                if (box.classList.contains("steak")) {
                    box.classList.remove("hidden");
                }
            });
        } else if (e.target.dataset.type === "past") {
            menuBoxes.forEach((box) => {
                if (box.classList.contains("past")) {
                    box.classList.remove("hidden");
                }
            });
        } else if (e.target.dataset.type === "salad") {
            menuBoxes.forEach((box) => {
                if (box.classList.contains("salad")) {
                    box.classList.remove("hidden");
                }
            });
        } else if (e.target.dataset.type === "desert") {
            menuBoxes.forEach((box) => {
                if (box.classList.contains("desert")) {
                    box.classList.remove("hidden");
                }
            });
        } else if (e.target.dataset.type === "drink") {
            menuBoxes.forEach((box) => {
                if (box.classList.contains("drink")) {
                    box.classList.remove("hidden");
                }
            });
        }
    });
});
let menuImgs = document.querySelectorAll(".menu .boxes .box img")
menuImgs.forEach((img) => {
    img.addEventListener('click', (e) => {
        // create overLay
        let overLay = document.createElement("div");
        overLay.classList.add("gallery-overlay");
        document.body.appendChild(overLay);
        // create image
        let popupBox = document.createElement("div");
        popupBox.classList.add("popup-box");
        document.body.appendChild(popupBox);
        // create title
        let title = document.createElement("h2");
        let titleText = document.createTextNode(e.target.alt);
        title.appendChild(titleText);
        //create image
        let image = document.createElement("img");
        image.src = e.target.src;
        popupBox.appendChild(image);
        // create close-icon
        let close = document.createElement("span")
        close.classList.add("close-popup");
        let closeText = document.createTextNode("x");
        close.appendChild(closeText);
        document.body.appendChild(close);
        // close popup
        close.onclick = () => {
            overLay.remove();
            popupBox.remove();
            close.remove();
        };
        // close popup when click on overLay
        overLay.onclick = () => {
            close.click();
        }
    });
});
// End menu

//Start Gallery
let images = document.querySelectorAll(".images img")
images.forEach((img) => {
    img.addEventListener('click', (e) => {
        // create overLay
        let overLay = document.createElement("div");
        overLay.classList.add("gallery-overlay");
        document.body.appendChild(overLay);
        // create image
        let popupBox = document.createElement("div");
        popupBox.classList.add("popup-box");
        document.body.appendChild(popupBox);
        // create title
        let title = document.createElement("h2");
        let titleText = document.createTextNode(img.alt);
        title.appendChild(titleText);
        popupBox.appendChild(title);
        //create image
        let image = document.createElement("img");
        image.src = img.src;
        popupBox.appendChild(image);
        // create close-icon
        let close = document.createElement("span")
        close.classList.add("close-popup");
        let closeText = document.createTextNode("x");
        close.appendChild(closeText);
        document.body.appendChild(close);
        // close popup
        close.onclick = () => {
            overLay.remove();
            popupBox.remove();
            close.remove();
        };
        // close popup when click on overLay
        overLay.onclick = () => {
            close.click();
        }
    });
});
//End Gallery

// Start Book Table
let AllInput = document.querySelectorAll("form input");
let formSubmit = document.querySelector("form button");
let bookMsg = document.querySelector("form button + p");
formSubmit.onclick = (e) => {
    AllInput.forEach((input) => {
        if (input.value === "") {
            e.preventDefault();
            bookMsg.textContent = "All fields must be filled.";
            bookMsg.style.color = "red";
        }
        input.onfocus = () => {
            bookMsg.textContent = "";
        }
    });
}
// End Book Table