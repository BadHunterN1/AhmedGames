var header = document.querySelector(".container h1");
header.textContent = "Guess The Word";
document.querySelector("footer").textContent = "Guess The Word Created By BadHunterN1";
var inputs = document.querySelector(".inputs");
var wordToGuess = "";
var words = [
    {
        name: "Galaxy",
        hint: "A massive system of stars, planets, and other celestial bodies.",
    },
    {
        name: "Oxygen",
        hint: "The gas that humans and animals need to breathe.",
    },
    {
        name: "Amazon",
        hint: "The largest rainforest in the world.",
    },
    {
        name: "Python",
        hint: " A popular programming language named after a type of snake and used to build claude.",
    },
    {
        name: "Compass",
        hint: "A tool used for navigation, always points north.",
    },
    {
        name: "Eclipse",
        hint: "Happens when the sun or moon is hidden by another celestial body.",
    },
    {
        name: "Desert",
        hint: "A dry area with little rain, often covered in sand.",
    },
    {
        name: "Volcano",
        hint: "A mountain that can erupt with lava and ash.",
    },
    {
        name: "Parrot",
        hint: "A colorful bird known for mimicking sounds.",
    },
    {
        name: "Puzzle",
        hint: "A game or problem that tests your problem-solving skills.",
    },
    {
        name: "Jungle",
        hint: "A dense forest with lots of plants and wildlife.",
    },
    {
        name: "Anchor",
        hint: "A heavy object used to keep a ship in place.",
    },
    {
        name: "Mirror",
        hint: "An object that reflects your image.",
    },
    {
        name: "Robot",
        hint: "A machine capable of performing tasks automatically.",
    },
    {
        name: "Diamond",
        hint: "The hardest natural material, often used in jewelry.",
    },
    {
        name: "Controller",
        hint: "A device used to interact and play video games.",
    },
    {
        name: "NPC",
        hint: "The character or representation of a pc in a game.",
    },
    {
        name: "Console",
        hint: "A system or device used to play video games, like PlayStation or Xbox.",
    },
    {
        name: "Respawn",
        hint: "When a player or character reappears after being defeated in a game.",
    },
    {
        name: "Level",
        hint: "A stage or part of a video game where progress is made.",
    },
    {
        name: "Kawaii",
        hint: "A Japanese word commonly used in anime, meaning cute or adorable.",
    },
    {
        name: "Sensei",
        hint: "A term for a teacher or mentor often used in anime.",
    },
    {
        name: "Mecha",
        hint: "A genre focused on giant robots or mechanical suits, popular in anime like Gundam.",
    },
    {
        name: "Hunter",
        hint: "The Best Anime In The World.",
    },
    {
        name: "Deja Vu",
        hint: "The uncanny feeling that you've experienced this moment before.",
    },
];
var headerHint = document.querySelector("h2");
var tryNumbers = 6;
var wordNumber;
var currentTry = 1;
var numberOfHints = 2;
var reset = document.querySelector(".reset");
var testarray = [];
function test() {
    var newWord;
    var newWordIndex;
    if (words.length === 0) {
        reset.disabled = true;
        return;
    }
    do {
        newWordIndex = Math.floor(Math.random() * words.length);
        newWord = words[newWordIndex];
    } while (testarray.includes(newWord.name));
    headerHint.textContent = "".concat(newWord.hint);
    document.title = "Guess: ".concat(newWord.hint);
    wordToGuess = newWord.name.toUpperCase();
    wordNumber = wordToGuess.length;
    testarray.push(newWord.name);
    words.splice(newWordIndex, 1);
}
var messageArea = document.querySelector(".message");
var guessButton = document.querySelector(".check");
function generateInputs() {
    for (var i = 1; i <= tryNumbers; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "Try-".concat(i));
        if (i !== 1)
            div.classList.add("disabled-inputs");
        var span = document.createElement("span");
        span.appendChild(document.createTextNode("Try ".concat(i)));
        div.appendChild(span);
        for (var j = 1; j <= wordNumber; j++) {
            var createGameInputs = (document.createElement("input"));
            createGameInputs.type = "text";
            createGameInputs.id = "guess-".concat(i, "-letter-").concat(j);
            createGameInputs.setAttribute("maxlength", "1");
            createGameInputs.classList.add("".concat(i));
            div.appendChild(createGameInputs);
        }
        inputs.appendChild(div);
    }
    var disableInputs = document.querySelectorAll(".disabled-inputs input");
    disableInputs.forEach(function (input) {
        input.disabled = true;
    });
    inputs.children[0].children[1].focus();
    var allInputs = document.querySelectorAll("input");
    allInputs.forEach(function (input, index) {
        var nextInput = allInputs[index + 1];
        var prevInput = allInputs[index - 1];
        input.addEventListener("input", function () {
            this.value = this.value.toUpperCase();
            if (nextInput)
                nextInput.focus();
        });
        input.addEventListener("keydown", function (event) {
            if (event.key === "ArrowRight") {
                if (nextInput)
                    nextInput.focus();
            }
            if (event.key === "ArrowLeft") {
                if (prevInput)
                    prevInput.focus();
            }
            if (event.key === "Enter") {
                guessButton.click();
            }
            if (event.key === "Backspace") {
                if (this.value === "" && prevInput) {
                    prevInput.focus();
                    prevInput.value = "";
                }
                else {
                    this.value = "";
                }
            }
        });
    });
}
guessButton.addEventListener("click", handleGuesses);
function handleGuesses() {
    var _a;
    var successGuess = true;
    for (var i = 1; i <= wordNumber; i++) {
        var thisInput = (document.querySelector("#guess-".concat(currentTry, "-letter-").concat(i)));
        var letter = thisInput.value;
        var guessLetter = wordToGuess[i - 1];
        if (guessLetter === letter) {
            thisInput.classList.add("yes-in-place");
        }
        else if (wordToGuess.includes(letter) && letter != "") {
            thisInput.classList.add("not-in-place");
            successGuess = false;
        }
        else {
            thisInput.classList.add("no");
            successGuess = false;
        }
    }
    if (successGuess) {
        messageArea.textContent = "You Win in ".concat(currentTry, " Tries");
        var alltries = document.querySelectorAll(".inputs > div");
        alltries.forEach(function (tryw) {
            tryw.classList.add("disabled-inputs");
        });
        guessButton.disabled = true;
    }
    else {
        (_a = document
            .querySelector(".Try-".concat(currentTry))) === null || _a === void 0 ? void 0 : _a.classList.add("disabled-inputs");
        var disTry = document.querySelectorAll(".Try-".concat(currentTry, " input"));
        disTry.forEach(function (oTry) { return (oTry.disabled = true); });
        if (currentTry < tryNumbers) {
            currentTry++;
            var tryClass = (document.querySelector(".Try-".concat(currentTry)));
            tryClass.classList.remove("disabled-inputs");
            var enTry = document.querySelectorAll(".Try-".concat(currentTry, " input"));
            enTry.forEach(function (oTry) { return (oTry.disabled = false); });
            tryClass.children[1].focus();
        }
        else {
            messageArea.textContent = "You Have Lost The Word Is ".concat(wordToGuess);
            var alltries = document.querySelectorAll(".inputs > div");
            alltries.forEach(function (tryw) {
                tryw.classList.add("disabled-inputs");
            });
            guessButton.disabled = true;
        }
    }
}
var hint = document.querySelector(".hint");
var hintSpan = document.querySelector(".hint span");
hintSpan.textContent = "".concat(numberOfHints);
hint.addEventListener("click", getHint);
function getHint() {
    if (numberOfHints > 0) {
        numberOfHints--;
        hintSpan.textContent = "".concat(numberOfHints);
    }
    if (numberOfHints === 0) {
        hint.disabled = true;
    }
    var enabledInputs = document.querySelectorAll("input:not([disabled])");
    var emptyEnabledInputs = Array.from(enabledInputs).filter(function (input) { return input.value === ""; });
    if (emptyEnabledInputs.length > 0) {
        var randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        var randomInput = emptyEnabledInputs[randomIndex];
        var indexToFill = Array.from(enabledInputs).indexOf(randomInput);
        if (indexToFill !== -1) {
            randomInput.value = wordToGuess[indexToFill].toUpperCase();
        }
    }
}
reset.onclick = function () {
    messageArea.textContent = "";
    inputs.innerHTML = "";
    currentTry = 1;
    numberOfHints = 2;
    hintSpan.textContent = "".concat(numberOfHints);
    test();
    generateInputs();
    guessButton.disabled = false;
    hint.disabled = false;
};
window.onload = function () {
    test();
    generateInputs();
};
// const button =<HTMLSpanElement> document.querySelector('.button');
// const serial = <HTMLDivElement>document.querySelector('.serial');
// const pieces  = Array.from('abcdefghijklmnopqr--stuvwxyz123456789');
// const serialLength = 20;
// function activeGenerate() {
//     let serialArray = '';
//     for (let i = 0; i <= serialLength; i++) {
//         serialArray += `${pieces[Math.floor(Math.random() * pieces.length)]}`;
//     }
//     serial.textContent = serialArray;
// };
// button.addEventListener('click', activeGenerate);
// miniproject 2
// const input = <HTMLInputElement> document.querySelector('input');
// const button = <HTMLButtonElement> document.querySelector('button');
// const maincon =<HTMLDivElement> document.querySelector('.maincon1');
// let todoArray: string[] = JSON.parse(localStorage.getItem('todo') || '[]');
// button.addEventListener('click', () => {
//     if (input.value !== '') {
//         todoArray.push(input.value);
//         localStorage.setItem('todo', JSON.stringify(todoArray));
//         input.value = '';
//     }
//     test();
// });
// button.click();
// function test() {
//     maincon.innerHTML = '';
//     let arrayNumber:number = -1;
//     todoArray.forEach((array) => {
//         arrayNumber++
//         const createSpan = document.createElement('span');
//         createSpan.appendChild(document.createTextNode(`${array}`));
//         const createButton = document.createElement('button');
//         createButton.setAttribute('id', `${arrayNumber}`);
//         createButton.textContent = 'Delete';
//         createSpan.appendChild(createButton);
//         maincon.appendChild(createSpan);
//     });
//     const getButtons = document.querySelectorAll('span button');
//     getButtons.forEach((button) => {
//         button.addEventListener('click', () => {
//             const deleteId = parseInt(button.getAttribute('id') || '');
//             todoArray.splice(deleteId, 1);
//             test();
//             localStorage.setItem('todo', JSON.stringify(todoArray));
//         });
//     });
// };
