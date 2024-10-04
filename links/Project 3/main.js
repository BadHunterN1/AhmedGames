// Array Of Words
var sentences = [
	"The quick brown fox jumped over the lazy dog while chasing a squirrel across the wide open field.",
	"In the quiet of the night, the stars twinkled brightly, illuminating the vast sky with their gentle glow.",
	"The scientist carefully measured the chemical reaction, noting every small detail for future research and analysis in the lab.",
	"On the sandy beach, children built an enormous sandcastle, complete with towers, bridges, and a moat filled with water.",
	"As the clock struck midnight, the mysterious figure disappeared into the shadows, leaving behind a trail of smoke",
	"The mountain hikers trekked for hours through the dense forest, eager to reach the summit before sunset arrived.",
	"In the bustling marketplace, vendors sold colorful fruits, handmade crafts, and aromatic spices from every corner of the world.",
	"The astronaut floated weightlessly inside the spacecraft, gazing in awe at the Earth spinning slowly beneath the stars.",
	"During the thunderstorm, lightning flashed across the sky, followed by the deep rumble of thunder echoing through the hills.",
	"The orchestra played a beautiful symphony, with violins, cellos, and flutes harmonizing perfectly in the grand concert hall.",
	"A group of students gathered around the campfire, roasting marshmallows and telling spooky ghost stories under the full moon.",
	"After a long day of work, the tired cat curled up in the warm sunlight and fell into a deep sleep.",
	"In the middle of the desert, a small oasis appeared, surrounded by palm trees and shimmering in the bright sunlight.",
	"The detective inspected the crime scene, carefully examining the clues and piecing together the mystery of the missing jewels.",
	"On the first day of spring, the garden bloomed with vibrant flowers, and the air was filled with sweet fragrance.",
	"Say before me i won't play LOL ever agian and if i play it iam g or not a m.",
	"No one cares about this game you will play it once and forgot about it and it's existence just like the previous ones.",
	"I hate blizzerd games and you hate blizzerd games and every one hates blizzerd games and activsion.",
	"I dont know why iam doing this games like no one cares and i don't get money out of it sad stuff.",
	"Someone said: if you work hard you can be anything you want to be. I want to say things to him.",
	"The sun rose beautifully over the horizon, casting warm golden light on the trees and waking up the sleeping town.",
	"Walking through the park, I noticed children playing, couples chatting, and the gentle breeze making the leaves rustle softly.",
	"She opened the book and got lost in a world of adventure, where anything was possible and imagination knew no bounds.",
	"As the rain fell gently outside, I curled up with a blanket and a cup of tea, enjoying the peaceful moment.",
	"The aroma of freshly baked bread filled the kitchen, inviting everyone to gather around the table for a warm meal.",
	"He stared at the stars in the night sky, contemplating life's mysteries while feeling a deep connection to the universe.",
	"With every stroke of the paintbrush, she expressed her emotions on the canvas, creating a masterpiece that spoke to the soul.",
	"The sound of laughter echoed through the air as friends gathered for a picnic, sharing stories and enjoying each other's company.",
	"After a long day at work, she looked forward to unwinding with her favorite book and a cozy blanket on the couch.",
	"The excitement in the air was palpable as the crowd awaited the concert to begin, eagerly anticipating their favorite band's performance.",
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
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds.toString();
timeLeftSpan.innerHTML = defaultLevelSeconds.toString();
scoreTotal.innerHTML = "".concat(words.length);
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
});
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
function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds.toString();
    var checkWordMatch = function () {
        var currentWordText = Array.from(theWord.querySelectorAll("span"))
            .map(function (span) { return span.textContent; })
            .join("");
        if (currentWordText.toLowerCase() === input.value.toLowerCase()) {
            input.value = "";
            scoreGot.innerHTML = (parseInt(scoreGot.innerHTML) + 1).toString();
            if (sentences.length > 0) {
                genWords();
            }
            else {
                var span = document.createElement("span");
                span.className = "good";
                span.textContent = "Congratz";
                finishMessage.appendChild(span);
            }
        }
        else {
            var span_1 = document.createElement("span");
            span_1.className = "bad";
            span_1.textContent = "Loser! The Game Will Start Again After 5 Seconds";
            finishMessage.appendChild(span_1);
            diffculity.forEach(function (one) {
                one.disabled = false;
            });
            setTimeout(function () {
                diffculity.forEach(function (one) {
                    one.disabled = true;
                });
                input.value = "";
                startPlay();
                span_1.textContent = "";
            }, 5000);
        }
    };
    var start = setInterval(function () {
        timeLeftSpan.innerHTML = (parseInt(timeLeftSpan.innerHTML) - 1).toString();
        if (timeLeftSpan.innerHTML === "0") {
            clearInterval(start);
            checkWordMatch();
        }
    }, 1000);
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            clearInterval(start);
            checkWordMatch();
        }
    }, { once: true });
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
