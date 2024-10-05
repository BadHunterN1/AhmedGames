// Array Of sentences
var sentences = [
	// extreme
	"Walking through the park, I noticed children playing, couples chatting, and the gentle breeze making the leaves rustle softly.",
	"He stared at the stars in the night sky, contemplating life's mysteries while feeling a deep connection to the universe.",
	"The aroma of freshly baked bread filled the kitchen, inviting everyone to gather around the table for a warm meal.",
	"In the bustling marketplace, vendors sold colorful fruits, handmade crafts, and aromatic spices from every corner of the world.",
	"The orchestra played a beautiful symphony, with violins, cellos, and flutes harmonizing perfectly in the grand concert hall.",
	"I hate Blizzard games, and you hate Blizzard games, and everyone hates Blizzard games and Activision.",
	// Hard
	"The scientist carefully measured the chemical reaction, noting every small detail for future research and analysis in the lab.",
	"The astronaut floated weightlessly inside the spacecraft, gazing in awe at the Earth spinning slowly beneath the stars.",
	"The mountain hikers trekked for hours through the dense forest, eager to reach the summit before sunset arrived.",
	"During the thunderstorm, lightning flashed across the sky, followed by the deep rumble of thunder echoing through the hills.",
	"The detective inspected the crime scene, carefully examining the clues and piecing together the mystery of the missing jewels.",
	"The sound of laughter echoed through the air as friends gathered for a picnic, sharing stories and enjoying each other's company.",
	"With every stroke of the paintbrush, she expressed her emotions on the canvas, creating a masterpiece that spoke to the soul.",
	"I hate Blizzard games, and you hate Blizzard games, and everyone hates Blizzard games and Activision.",
	// Medium
	"As the clock struck midnight, the mysterious figure disappeared into the shadows, leaving behind a trail of smoke.",
	"A group of students gathered around the campfire, roasting marshmallows and telling spooky ghost stories under the full moon.",
	"On the first day of spring, the garden bloomed with vibrant flowers, and the air was filled with sweet fragrance.",
	"In the quiet of the night, the stars twinkled brightly, illuminating the vast sky with their gentle glow.",
	"The sun rose beautifully over the horizon, casting warm golden light on the trees and waking up the sleeping town.",
	"After a long day at work, she looked forward to unwinding with her favorite book and a cozy blanket on the couch.",
	"I hate Blizzard games, and you hate Blizzard games, and everyone hates Blizzard games and Activision.",
	// Easy
	"The quick brown fox jumped over the lazy dog while chasing a squirrel across the wide open field.",
	"After a long day of work, the tired cat curled up in the warm sunlight and fell into a deep sleep.",
	"In the middle of the desert, a small oasis appeared, surrounded by palm trees and shimmering in the bright sunlight.",
	"Say before me I won't play LOL ever again, and if I play it, I am g or not a m.",
	"No one cares about this game, you will play it once and forget about it and its existence just like the previous ones.",
	"I hate Blizzard games, and you hate Blizzard games, and everyone hates Blizzard games and Activision.",
	"I don't know why I am doing this game, like no one cares, and I don't get money out of it. Sad stuff.",
	"Someone said: if you work hard you can be anything you want to be. I want to say things to him.",
	"As the rain fell gently outside, I curled up with a blanket and a cup of tea, enjoying the peaceful moment.",
];
var lvls = {
	Easy: 60,
	Normal: 40,
	Hard: 20,
	Extreme: 14,
};
var defaultLevelName = "Normal";
var defaultLevelSeconds = lvls[defaultLevelName];
var startButton = document.querySelector(".start");
var lvlNameSpan = document.querySelector(".message .lvl");
var secondsSpan = document.querySelector(".message .seconds");
var theWord = document.querySelector(".the-word");
var input = document.querySelector(".input");
var timeLeftSpan = document.querySelector(".time span");
var scoreGot = document.querySelector(".score .got");
var scoreTotal = document.querySelector(".score .total");
var finishMessage = document.querySelector(".finish");
var diffculity = document.querySelectorAll(".diffculity");
secondsSpan.innerHTML = defaultLevelSeconds.toString();
timeLeftSpan.innerHTML = defaultLevelSeconds.toString();
var newSentences;
diffculity.forEach(function (one) {
	one.addEventListener("click", function () {
		diffculity.forEach(function (one) {
			one.classList.remove("selected");
		});
		one.classList.add("selected");
		defaultLevelName = String(one.textContent);
		defaultLevelSeconds = lvls[defaultLevelName];
		lvlNameSpan.innerHTML = defaultLevelName;
		secondsSpan.innerHTML = defaultLevelSeconds.toString();
		timeLeftSpan.innerHTML = defaultLevelSeconds.toString();
	});
	var indicesToSelect;
	one.addEventListener("click", function () {
		if (defaultLevelName === "Easy") {
			indicesToSelect = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
			newSentences = sentences.filter(function (value, index) {
				return indicesToSelect.includes(index);
			});
		} else if (defaultLevelName === "Normal") {
			indicesToSelect = [12, 13, 14, 15, 16, 17, 18, 19];
			newSentences = sentences.filter(function (value, index) {
				return indicesToSelect.includes(index);
			});
		} else if (defaultLevelName === "Hard") {
			indicesToSelect = [6, 7, 8, 9, 10, 11, 12, 13];
			newSentences = sentences.filter(function (value, index) {
				return indicesToSelect.includes(index);
			});
		} else if (defaultLevelName === "Extreme") {
			indicesToSelect = [0, 1, 2, 3, 4, 5];
			newSentences = sentences.filter(function (value, index) {
				return indicesToSelect.includes(index);
			});
		}
		scoreTotal.innerHTML = "".concat(newSentences.length);
	});
});
window.onload = function () {
	return document.querySelector(".selected").click();
};
input.onpaste = function () {
	return false;
};
startButton.onclick = function () {
    diffculity.forEach(function (one) {
        one.disabled = true;
    });
    this.remove();
    input.value = "";
    input.focus();
    genWords();
};
function genWords() {
    var randomWord = sentences[Math.floor(Math.random() * sentences.length)];
    var wordIndex = sentences.indexOf(randomWord);
    sentences.splice(wordIndex, 1);
    function initializeWordOutput() {
        var initialDisplay = "";
        for (var i = 0; i < randomWord.length; i++) {
            initialDisplay += "<span class=\"untyped\">".concat(randomWord[i], "</span>");
        }
        theWord.innerHTML = initialDisplay;
    }
    function updateWordColor(typedText) {
        var spans = theWord.querySelectorAll("span");
        for (var i = 0; i < randomWord.length; i++) {
            if (i < typedText.length) {
                if (typedText[i].toUpperCase() === randomWord[i].toUpperCase()) {
                    spans[i].classList.remove("untyped", "incorrect");
                    spans[i].classList.add("correct");
                }
                else {
                    spans[i].classList.remove("untyped", "correct");
                    spans[i].classList.add("incorrect");
                }
            }
            else {
                spans[i].classList.remove("correct", "incorrect");
                spans[i].classList.add("untyped");
            }
        }
    }
    input.addEventListener("input", function () {
        var typedText = input.value;
        updateWordColor(typedText);
    });
    initializeWordOutput();
    startPlay();
}
input.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
});
let gameInterval;

function startPlay() {
    if (gameInterval) {
        clearInterval(gameInterval);
    }

    timeLeftSpan.innerHTML = defaultLevelSeconds.toString();
    
    function checkWordMatch() {
        var currentWordText = Array.from(theWord.querySelectorAll("span"))
            .map(function (span) {
                return span.textContent;
            })
            .join("");
        if (currentWordText.toLowerCase() === input.value.toLowerCase()) {
            input.value = "";
            scoreGot.innerHTML = (parseInt(scoreGot.innerHTML) + 1).toString();
            if (sentences.length > 0) {
                genWords();
            } else {
                var span = document.createElement("span");
                span.className = "good";
                span.textContent = "Congratz";
                finishMessage.appendChild(span);
            }
        } else {
            endGame("Loser! The Game Will Start Again After 5 Seconds");
        }
    }

    function endGame(message) {
        clearInterval(gameInterval);
        var span = document.querySelector(".bad");
        span.textContent = message;
        diffculity.forEach(function (one) {
            one.disabled = false;
        });
        input.disabled = true;
        setTimeout(function () {
            input.disabled = false;
            input.focus();
            diffculity.forEach(function (one) {
                one.disabled = true;
            });
            input.value = "";
            startPlay();
            span.textContent = "";
        }, 5000);
    }

    gameInterval = setInterval(function () {
        timeLeftSpan.innerHTML = (parseInt(timeLeftSpan.innerHTML) - 1).toString();
        if (timeLeftSpan.innerHTML === "0") {
            checkWordMatch();
        }
    }, 1000);

    const inputField = document.querySelector("textarea");
    inputField.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            clearInterval(gameInterval);
            checkWordMatch();
        }
    });
}
// const container = <HTMLDivElement>document.querySelector(".container");
// getRepos();
// function getRepos() {
// 	fetch("https://jsonplaceholder.typicode.com/posts")
// 		.then((response) => response.json())
// 		.then((posts) => {
// 			posts.forEach((post) => {
// 				// div posts
// 				const divPosts = document.createElement("div");
// 				divPosts.classList.add("posts");
// 				// user-derails div
// 				const div2 = document.createElement("div");
// 				div2.classList.add("user-derails");
// 				// user-derails childs
// 				const divM1 = document.createElement("div");
// 				divM1.classList.add("post-user");
// 				divM1.appendChild(document.createTextNode(`User-${post.userId}`));
// 				const divM2 = document.createElement("div");
// 				divM2.classList.add("post-number");
// 				divM2.appendChild(document.createTextNode(`Post-Number-${post.id}`));
// 				// post-tittle div
// 				const div3 = document.createElement("div");
// 				div3.classList.add("post-tittle");
// 				div3.appendChild(document.createTextNode(`${post.title}`));
// 				// post-body div
// 				const div4 = document.createElement("div");
// 				div4.classList.add("post-body");
// 				div4.appendChild(document.createTextNode(`${post.body}`));
// 				div2.appendChild(divM1);
// 				div2.appendChild(divM2);
// 				divPosts.appendChild(div2);
// 				divPosts.appendChild(div3);
// 				divPosts.appendChild(div4);
// 				container.appendChild(divPosts);
// 			});
// 		});
// }
