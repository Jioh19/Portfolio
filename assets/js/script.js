const carrusel = document.querySelector(".carrusel"),
	firstImg = carrusel.querySelectorAll("img")[0],
	arrowIcons = document.querySelectorAll("#wrapper i");


let firstImgWidth = firstImg.clientWidth;

arrowIcons.forEach((icon) => {
	icon.addEventListener("click", () => {
		let percentage, nextPercentage;
		icon.id == "right" ? (percentage = 0.2 * -100) : (percentage = 0.2 * 100);
		nextPercentage = parseFloat(carrusel.dataset.prevPercentage) + percentage;
		if (isNaN(nextPercentage)) {
			nextPercentage = 0;
		}

		nextPercentage = Math.min(nextPercentage, 0);
		nextPercentage = Math.max(nextPercentage, -100);

		if (nextPercentage == NaN) nextPercentage = -50;
		carrusel.dataset.percentage = nextPercentage;

		carrusel.animate(
			{
				transform: `translate(${nextPercentage + 50}%, 0%)`,
			},
			{ duration: 250, fill: "forwards" }
		);

		for (const image of carrusel.getElementsByClassName("image")) {
			image.animate(
				{
					objectPosition: `${100 + nextPercentage}% center`,
				},
				{ duration: 250, fill: "forwards" }
			);
		}
	});
});

carrusel.onmousedown = (e) => {
	carrusel.dataset.mouseDownAt = e.clientX;
};

carrusel.onmousemove = (e) => {
	if (carrusel.dataset.mouseDownAt == "0") return;

	const mouseDelta = parseFloat(carrusel.dataset.mouseDownAt) - e.clientX,
		maxDelta = window.innerWidth / 2;

	const percentage = (mouseDelta / maxDelta) * -100;
	let nextPercentage;
	nextPercentage = parseFloat(carrusel.dataset.prevPercentage) + percentage;
	nextPercentage = Math.min(nextPercentage, 0);
	nextPercentage = Math.max(nextPercentage, -100);

	carrusel.dataset.percentage = nextPercentage;

	if (isNaN(nextPercentage)) {
		nextPercentage = 0;
	}

	carrusel.animate(
		{
			transform: `translate(${nextPercentage + 50}%, 0%)`,
		},
		{ duration: 1200, fill: "forwards" }
	);

	for (const image of carrusel.getElementsByClassName("image")) {
		image.animate(
			{
				objectPosition: `${100 + nextPercentage}% center`,
			},
			{ duration: 1200, fill: "forwards" }
		);
	}
};

window.onmouseup = () => {
	carrusel.dataset.mouseDownAt = "0";
	carrusel.dataset.prevPercentage = carrusel.dataset.percentage;
};

function checkbox() {
	if (event.target.checked) {
		document.querySelector(".hamburger-item").style.display = "block";
	} else {
		document.querySelector(".hamburger-item").style.display = "none";
	}
}
