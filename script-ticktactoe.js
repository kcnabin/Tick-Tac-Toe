	
var player = (function() {
	'user strict';

	var turn = "player";
	var uIcon = "X";
	var cIcon = "O";
	var allSelections = [];
	var uChoices = [];
	var cChoices = [];

	function changeTurn(uTurn) {
		turn = uTurn;
	}

	function showTurn() {
		return turn;
	}
	function getUicon() {
		return uIcon;
	}
	function getCicon() {
		return cIcon;
	}

	return {
		showTurn,
		changeTurn,
		getCicon,
		getUicon,
		allSelections,
		uChoices,
		cChoices,

	}

})();

function addChoiceToDOM (e) {
	let areaSelected = e.target.className;
	if (player.showTurn() == "player") {
		e.target.innerHTML = player.getUicon();
		player.uChoices.push(areaSelected);
		player.changeTurn("computer");

	} else if (player.showTurn() == "computer") {
		e.target.innerHTML = player.getCicon();
		player.cChoices.push(areaSelected);
		player.changeTurn("player");
	}

	// console.log("Player Choices: ", player.uChoices);
	// console.log("Computer Choices: ", player.cChoices)
}

function changeMessage() {
	let msg = document.querySelector("#message");
	if (msg.innerHTML === "Computer's Turn") {
		msg.innerHTML = "Player's Turn";	
	} else {
		msg.innerHTML = "Computer's Turn";
	}	
}

const allArea = document.querySelectorAll(".row div");
allArea.forEach(area => {
	area.addEventListener("click", areaClicked);
});

function areaClicked(e) {
	if (checkForOccupancy(e)) {
		addChoiceToDOM(e);
		changeMessage();
		checkForGameOver();
	} else {
		console.log("Already Selected!");
	}
}

function checkForOccupancy(e) {
	let areaSelected = e.target.className;
	if (player.allSelections.includes(areaSelected)) {
		return false;
	} else {
		player.allSelections.push(areaSelected);
		// console.log("------------------------------");
		// console.log("All selections: ", player.allSelections);
		return true;
	}
}

function checkIncluded(a, b, c, u) {
	if (u == "player") {
		if (player.uChoices.includes(a) && player.uChoices.includes(b) && player.uChoices.includes(c)) {
			return true;
		}
	}

	if (u == "computer") {
		if (player.cChoices.includes(a) && player.cChoices.includes(b) && player.cChoices.includes(c)) {
			return true;
		}
	}
}

function declareWinner(choice) {
	alert("Winner is " + choice.toUpperCase());
	player.allSelections = [];
	player.uChoices = [];
	player.cChoices = [];
	allArea.forEach(area => {
		area.innerHTML = "";
	});

	let msg = document.querySelector("#message");
	msg.innerHTML = "Player's Turn";

	player.changeTurn("player");
	
}

function checkForGameOver() {
	let choice = "player";
	let participants = ["player", "computer"]
	participants.forEach(currentUser => {
		choice = currentUser;
		if (checkIncluded('area-11', 'area-12', 'area-13', choice)) {
			declareWinner(choice);
		}
		if (checkIncluded('area-21', 'area-22', 'area-23', choice)) {
			declareWinner(choice);
		}
		if (checkIncluded('area-31', 'area-32', 'area-33', choice)) {
			declareWinner(choice);
		}

		if (checkIncluded('area-11', 'area-21', 'area-31', choice)) {
			declareWinner(choice);
		}
		if (checkIncluded('area-12', 'area-22', 'area-32', choice)) {
			declareWinner(choice);
		}
		if (checkIncluded('area-13', 'area-23', 'area-33', choice)) {
			declareWinner(choice);
		}

		if (checkIncluded('area-11', 'area-22', 'area-33', choice)) {
			declareWinner(choice);
		}

		if (checkIncluded('area-32', 'area-22', 'area-13', choice)) {
			declareWinner(choice);
		}

	})
}