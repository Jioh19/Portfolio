const carrusel = document.querySelector(".carrusel");

// let isDragStart = false,
// 	prevPageX,
// 	prevScrollLeft;

// const dragStart = (e) => {
// 	isDragStart = true;
// 	prevPageX = e.pageX;
// 	prevScrollLeft = carrusel.scrollLeft;
// };

// const dragging = (e) => {
// 	if (!isDragStart) return;
// 	e.preventDefault();
// 	let positionDiff = e.pageX - prevPageX;
// 	carrusel.scrollLeft = prevScrollLeft - positionDiff;

// 	for (const image of carrusel.getElementsByClassName("image")) {
// 		image.animate(
// 			{
// 				objectPosition: `${positionDiff *100 / carrusel.scrollWidth}% center`,
// 			},
// 			{ duration: 1200, fill: "forwards" }
// 		);
// 	}

// 	console.log(positionDiff *100/ carrusel.scrollWidth);
// };

// const dragStop = () => {
// 	isDragStart = false;
// };

// carrusel.addEventListener("mousedown", dragStart);
// carrusel.addEventListener("mousemove", dragging);
// carrusel.addEventListener("mouseup", dragStop);

carrusel.onmousedown = (e) => {
	carrusel.dataset.mouseDownAt = e.clientX;
};

carrusel.onmousemove = (e) => {
	if (carrusel.dataset.mouseDownAt == "0") return;

	const mouseDelta = parseFloat(carrusel.dataset.mouseDownAt) - e.clientX,
		maxDelta = window.innerWidth / 2;

	const percentage = (mouseDelta / maxDelta) * -100,
		nextPercentage = parseFloat(carrusel.dataset.prevPercentage) + percentage;
	if (nextPercentage < -100) nextPercentage = -100;
	if (nextPercentage > 0) nextPercentage = 0;
	carrusel.dataset.percentage = nextPercentage;

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
