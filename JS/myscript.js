
// so the idea is taht u take the RGB values fomr an array on objects

// u can add as many sections as u want, i used 2
//editing these values changes the color

// the alkgorithm works by itself,
//  the only thing u have to modify ill show it later with a ##!imporant!## flag

//if i forgot to edit out some italian in my code, i apologize  :T

let info = [
    {
        bg: [0, 255, 76, 255, 0, 0],
        // "bg": "linear-gradient(0deg, rgb(0, 255, 76) 0%, rgb(255, 0, 0) 100%)"
    },
    {
        bg: [255, 0, 0, 0, 255, 76],
        // "bg": "linear-gradient(0deg, rgb(255, 0, 0) 0%, rgb(0, 255, 76) 100%)"
    },
    {
        bg: [255, 230, 0, 255, 0, 0],
        // "bg": "linear-gradient(0deg, rgb(253, 101, 0) 0%rgb(255, 230, 2)1) 100%)"
    },
    {
        bg: [255, 0, 0, 221, 8, 193],
        // "bg": "linear-gradient(0deg, rgb(255, 0, 0) 0%, rgb(221, 8, 193) 100%)"
    },
    {
        bg: [255, 255, 255, 0, 0, 0],
        // "bg": "linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(0, 0, 0) 100%)"
    },
    {
        bg: [0, 0, 0, 255, 255, 255],
        // "bg": "linear-gradient(0deg, rgb(0, 0, 0) 0%, rgb(255, 255, 255) 100%)"
    },
];

let buttons = document.getElementsByClassName("btn");
let mainCont = document.getElementById("main_container");
let asdBtn = document.getElementById("asd");
let debug = document.getElementById("debug");
let debug_container = document.getElementById("debug_container");
let second_debug = document.getElementById("second_debug");
let indexImg = 0;
let shiftIndex
let step
let BgIndex = info[indexImg].bg;
let colorClass = []
let arrowClass = []

//-----// ##!important!## //-----//
// so this the only thing u ahve to edit if u want more RGB sections
// its 3 values per RBG section, i used 2 so its gon be 6
//heare i named them "val" but they essentially are (RED GREEN BLUE) and again (RED GREEN BLUE)
function getBg(val1, val2, val3, val4, val5, val6) {
    mainCont.style.background = ` linear-gradient(0deg, rgba(${val1},${val2},${val3}) 0%, rgba(${val4},${val5},${val6},1) 100%) `;
    return;
}


//-----// heare u call the function that converts the values in the linear gradient string //-----//
getBg(BgIndex[0], BgIndex[1], BgIndex[2], BgIndex[3], BgIndex[4], BgIndex[5]);



[...buttons].forEach((singleButton) => {
    singleButton.addEventListener("click", function () {


        if (singleButton.classList.contains("next")) {
            // click su next
            // i save shift index, this gon be the start and the new imageindex gon be the target
            shiftIndex = indexImg
            if (indexImg == info.length - 1) {
                indexImg = 0;
            } else {
                indexImg++;
            }
        }

        else if (singleButton.classList.contains("prev")) {
            // melo risalvoi anche qua?
            shiftIndex = indexImg
            if (indexImg == 0) {
                indexImg = info.length - 1;
            } else {
                indexImg--;
            }
        }
        // heare i call the function and i pass the "startPoint and the "target"
        changevalues(shiftIndex, indexImg)



    });
});


let startBG;

let DebIndex = info[2].bg;

function clearAllTimers() {
    // Clear all timeouts
    let id = setTimeout(() => { }, 0);
    while (id--) {
        clearTimeout(id);
        clearInterval(id);
    }
}


function changevalues(startIndex, TargetIndex) {

    clearAllTimers();
    //i get some variables that recall the infos in the array
    startBG = info[startIndex].bg;
    let targetBG = info[TargetIndex].bg;
    let tempBG = startBG.slice();

    console.log("start is", startBG);
    console.log(targetBG);

    let timeoutId;

    function loop() {
        // u need this var to stop the loop so it wont start printing the finished values on inifnite
        let reachedTarget = true;

        tempBG.forEach((index, x) => {
            if (index !== targetBG[x]) {
                reachedTarget = false;

                if (index < targetBG[x]) {
                    // step gotta slow down when closer to target, so it wont bug on odd numbers
                    //the step is the "lenght" of the step it makes every 10ms from a color to another
                    if ((targetBG[x] - tempBG[x]) < 5) {
                        step = 1
                    }
                    else {
                        step = 2
                    }
                    tempBG[x] += step;
                    colorClass[x] = "green"
                    arrowClass[x] = "fa-arrow-up"

                } else if (index > targetBG[x]) {
                    // step gotta slow down when closer to target, so it wont bug on odd numbers
                    if ((tempBG[x] - targetBG[x]) < 5) {
                        step = 1
                    }
                    else {
                        step = 2
                    }
                    tempBG[x] -= step;
                    colorClass[x] = "red"
                    arrowClass[x] = "fa-arrow-down"
                }
            }
        });


        // dont mind all this, this just 4 debug windows
        debug.innerHTML = `
            <span class="red">R1:<span class="value "> <span class="color_value">${tempBG[0]}</span><i class=" appear arrow ${colorClass[0]} fa-solid ${arrowClass[0]}"></i></span></span>
            <span class="green">G1:<span class="value"> <span class="color_value">${tempBG[1]}</span><i class=" appear arrow ${colorClass[1]} fa-solid ${arrowClass[1]}"></i></span></span>
            <span class="blue">B1:<span class="value"> <span class="color_value">${tempBG[2]}</span><i class=" appear arrow ${colorClass[2]} fa-solid ${arrowClass[2]}"></i></span></span>
            <div>-----------</div>
            <span class="red">R2:<span class="value"> <span class="color_value">${tempBG[3]}</span><i class=" appear arrow ${colorClass[3]} fa-solid ${arrowClass[3]}"></i></span></span>
            <span class="green">G2:<span class="value"> <span class="color_value">${tempBG[4]}</span><i class=" appear arrow ${colorClass[4]} fa-solid ${arrowClass[4]}"></i></span></span>
            <span class="blue">B2:<span class="value"> <span class="color_value">${tempBG[5]}</span><i class=" appear arrow ${colorClass[5]} fa-solid ${arrowClass[5]}"></i></span></span>
            <div class="d_flex"><div>prev.BG<div>${shiftIndex + 1}</div></div>
            <div>target.BG<div>${indexImg + 1}</div></div></div> `
        // dont mind all this, this just 4 debug windows
        second_debug.innerHTML = `
        <span>Real Time generated background string:</span>
        <div id="bg_string"> "linear-gradient(0deg, rgba(
            <span class="${colorClass[0]} string_value">${tempBG[0]}</span>,
            <span class="${colorClass[1]} string_value">${tempBG[1]}</span>,
            <span class="${colorClass[2]} string_value">${tempBG[2]}</span>) 0%, rgba(
            <span class="${colorClass[3]} string_value">${tempBG[3]}</span>,
            <span class="${colorClass[4]} string_value">${tempBG[4]}</span>,
            <span class="${colorClass[5]} string_value">${tempBG[5]}</span>) 100%)"
        </div>`



        // dont mind all this, this just 4 debug windows
        let color_value = document.getElementsByClassName("color_value");
        let arrows = document.getElementsByClassName("arrow");
        let str_values = document.getElementsByClassName("string_value");
        [...color_value].forEach((element, x) => {
            if (element.innerHTML == targetBG[x]) {
                arrows[x].classList.remove("appear")
                str_values[x].classList.remove("red", "green")
            }
        });


        getBg(tempBG[0], tempBG[1], tempBG[2], tempBG[3], tempBG[4], tempBG[5]);



        if (reachedTarget) {
            // u clear the timeout when u reached target
            clearTimeout(timeoutId);
        } else {
            // untill target not reached u keep launching
            timeoutId = setTimeout(loop, 10);
        }

    }
    // kickstart the function
    loop();
}


// this is 4 debug too dont mind it
asdBtn.addEventListener("click", function () {
    if (debug_container.classList.contains("appear")) {
        debug_container.classList.remove("appear")
    }
    else {
        debug_container.classList.add("appear")
    }
    if (second_debug.classList.contains("attiva")) {
        second_debug.classList.remove("attiva")
    }
    else {
        second_debug.classList.add("attiva")
    }
})


