function formatNumber(number) {
	return number < 10 ? `0${number}` : `${number}`;
}

function updateCountdown() {
	// Set the target time (every Sunday at 18:00:00 in this example)
	const targetTime = new Date();
	targetTime.setUTCHours(17, 0, 0, 0);
	targetTime.setUTCDate(
		targetTime.getUTCDate() + (((6 - targetTime.getUTCDay() + 1) % 7) + -1)
	);

	// Get the current time
	const currentTime = new Date();

	// Calculate the time difference
	let timeDiff = targetTime - currentTime;

	if (timeDiff < 0) {
		// If the target time has already passed for this week, set it for the next week
		targetTime.setUTCDate(targetTime.getUTCDate() + 7);
		timeDiff = targetTime - currentTime;
	}

	// Calculate days, hours, and minutes
	const days = formatNumber(Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
	const hours = formatNumber(
		Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
	);
	const minutes = formatNumber(
		Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
	);
	const seconds = formatNumber(Math.floor((timeDiff % (1000 * 60)) / 1000));

	document.getElementById(
		"middle-text"
	).innerHTML = `${days}:${hours}:${minutes}:${seconds}`;
	document.title = `PS99 Update | ${days}:${hours}:${minutes}:${seconds}`;

	const localTimeOptions = {
		year: "2-digit",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	};

	const localTime = targetTime.toLocaleString(undefined, localTimeOptions);
	document.getElementById("bottom-text").innerHTML = `${localTime}`;
}

// Update the countdown every second
setInterval(updateCountdown, 1000);

// Initial call to set the countdown immediately
updateCountdown();
