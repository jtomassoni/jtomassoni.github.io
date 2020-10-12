//Declarations
let towerA = document.querySelector('#towerA');
let towerB = document.querySelector('#towerB');
let towerC = document.querySelector('#towerC');
let towers = document.querySelector('.allTowers');
let smallDisk = document.querySelector('#smallDisk');
let mediumDisk = document.querySelector('#mediumDisk');
let largeDisk = document.querySelector('#largeDisk');
let playerMessage = document.querySelector('.playerMessage');
let resetButton = document.querySelector('.resetButton');
let moveToA = document.querySelector('#moveToA');
let moveToB = document.querySelector('#moveToB');
let moveToC = document.querySelector('#moveToC');
let moveCounter = document.querySelector('#moveCounter');
let isHidden = document.querySelector('.isHidden');
let timer = document.querySelector('#timer');
var minutesLabel = document.getElementById('timerMinutes');
var secondsLabel = document.getElementById('timerSeconds');
let secondsCounter = 0;
let currentDisk = null;
let counter = 1;
let towerHeight = 0;
let countUp = null;

//Functions
//Function for displaying invalid due to improper order
function invalidBadOrder() {
	playerMessage.innerHTML = `Invalid Selection:</br></br>You may only move the <strong>top</strong> disk.</br>  You may only move <strong>one</strong> disk at a time.</br>  <strong>Larger disks</strong> can not be stacked on top of <strong>smaller disks.</strong>`;
	currentDisk.classList.toggle('selected');
	setCurrentDiskNull();
}
//Function for displaying ivalid due to placing stack on stack that its on
function invalidSameTower() {
	playerMessage.innerHTML =
		'<strong>Oi!</strong>, I just told ye, put it into a new tower! Give it another try.';
	currentDisk.classList.toggle('selected');
	setCurrentDiskNull();
}
//Function for displaying the 'click next disk message'
function validClick() {
	playerMessage.innerText = `Valid Selection: Move it to another tower`;
}
//Function to set currentDisk
function setCurrentDisk() {
	currentDisk = event.target;
}
//Better function for toggling display
function toggleMovementDisplay() {
	isHidden.style.display = 'block';
}
//Function for toggling display of class list....can prob re-work these
function toggleSmall() {
	smallDisk.classList.toggle('selected');
}
function toggleMedium() {
	mediumDisk.classList.toggle('selected');
}
function toggleLarge() {
	largeDisk.classList.toggle('selected');
}
//Function for increasing the counter.
function increaseCounter() {
	moveCounter.innerText = counter;
	currentDisk.classList.toggle('selected');
	counter++;
}
//Function for starting the timer...got this from stackoverflow by searching "pain count up timer in js",
function setTime() {
	++secondsCounter; //incrementer
	timerSeconds.innerHTML = pad(secondsCounter);
	timerminutes.innerHTML = pad(Number(secondsCounter / 60));
}

// pad function adds an extra 0 to the clock if the the length of the minutes is less than two digits, also obtained from StackOverflow.
function pad(val) {
	let valString = val + ''; //turns the current time into a string
	if (valString.length < 2) {
		//checks if its a single or double digit
		return '0' + valString; //if it is a single digit, return it with a 0 in front.
	} else {
		return valString; //otherwise, return string unchanged.
	}
}
//function for starting the timer.
function startTimer() {
	if (secondsLabel.innerHTML === '00') {
		countUp = setInterval(setTime, 1000); //allows us to call clearInerval on this variable later.
	}
}

//Function for resetting game.
function resetGame() {
	playerMessage.innerHTML = `...maybe do better this time?`;
	towerA.prepend(largeDisk);
	towerA.prepend(mediumDisk);
	towerA.prepend(smallDisk);
	smallDisk.classList.remove('selected');
	mediumDisk.classList.remove('selected');
	largeDisk.classList.remove('selected');
	moveCounter.innerText = '';
	setCurrentDiskNull();
	timerSeconds.innerText = '00';
}
//Function for setCurrentDiskNull
function setCurrentDiskNull() {
	currentDisk = null;
}
//Function for evaluating a win AND stopping the timer
function checkWin() {
	if (towerC.childElementCount === 3) {
		playerMessage.innerHTML = 'YOU WON!!!! LFG';
		clearInterval(countUp); //stops the timer.
	}
}

//Event Listeners
//Disks
smallDisk.addEventListener('click', (event) => {
	const parent = event.target.parentElement;
	if (parent.childNodes[0].id === 'smallDisk') {
		setCurrentDisk();
		toggleSmall();
		validClick();
		toggleMovementDisplay();
		startTimer();
	} else {
		invalidBadOrder();
		setCurrentDiskNull();
	}
});
mediumDisk.addEventListener('click', (event) => {
	const parent = event.target.parentElement;
	if (parent.childNodes[0].id === 'mediumDisk') {
		setCurrentDisk();
		toggleMedium();
		validClick();
		toggleMovementDisplay();
		startTimer();
	} else {
		invalidBadOrder();
		setCurrentDiskNull();
	}
});
largeDisk.addEventListener('click', (event) => {
	const parent = event.target.parentElement;
	if (parent.childNodes[0].id === 'mediumDisk') {
		setCurrentDisk();
		toggleLarge();
		validClick();
		toggleMovementDisplay();
		startTimer();
	} else {
		invalidBadOrder();
		setCurrentDiskNull();
	}
});
//Movement Buttons
moveToA.addEventListener('click', (event) => {
	const parent = event.target;
	if (towerA.childNodes.length === 0) {
		if (currentDisk != null) {
			increaseCounter();
			validClick();
			towerA.prepend(currentDisk);
			checkWin();
		}
	} else if (Number(currentDisk.value) === Number(towerA.childNodes[0].value)) {
		invalidSameTower();
	} else if (Number(currentDisk.value) < Number(towerA.childNodes[0].value)) {
		increaseCounter();
		setCurrentDiskNull();
		towerA.prepend(currentDisk);
		checkWin();
	} else {
		invalidBadOrder();
		playerMessage.innerHTML = currentDisk.classList.toggle('selected');
	}
});
moveToB.addEventListener('click', (event) => {
	const parent = event.target;
	if (towerB.childNodes.length === 0) {
		if (currentDisk != null) {
			increaseCounter();
			validClick();
			towerB.prepend(currentDisk);
			checkWin();
		}
	} else if (Number(currentDisk.value) === Number(towerB.childNodes[0].value)) {
		invalidSameTower();
	} else if (Number(currentDisk.value) < Number(towerB.childNodes[0].value)) {
		increaseCounter();
		setCurrentDiskNull();
		towerB.prepend(currentDisk);
		checkWin();
	} else {
		invalidBadOrder();
		playerMessage.innerHTML = currentDisk.classList.toggle('selected');
	}
});
moveToC.addEventListener('click', (event) => {
	const parent = event.target;
	if (towerC.childNodes.length === 0) {
		if (currentDisk != null) {
			increaseCounter();
			validClick();
			towerC.prepend(currentDisk);
			checkWin();
		}
	} else if (Number(currentDisk.value) === Number(towerC.childNodes[0].value)) {
		invalidSameTower();
	} else if (Number(currentDisk.value) < Number(towerC.childNodes[0].value)) {
		increaseCounter();
		setCurrentDiskNull();
		towerC.prepend(currentDisk);
		checkWin();
	} else {
		invalidBadOrder();
		playerMessage.innerHTML = currentDisk.classList.toggle('selected');
	}
});
//Reset Game Button
resetButton.addEventListener('click', (event) => {
	resetGame();
});
