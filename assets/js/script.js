const carrusel = document.querySelector(".carrusel");

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
			transform: `translate(${nextPercentage  + 13}%, 0%)`,
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
