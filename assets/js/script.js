const carrusel = document.querySelector(".carrusel");

window.onmousedown = (e) => {
	carrusel.dataset.mouseDownAt = e.clientX;
};

window.onmousemove = (e) => {
	if (carrusel.dataset.mouseDownAt == "0") return;

	const mouseDelta = parseFloat(carrusel.dataset.mouseDownAt) - e.clientX,
		maxDelta = window.innerWidth / 2;

	const percentage = (mouseDelta / maxDelta) * -100,
		nextPercentage = parseFloat(carrusel.dataset.prevPercentage) + percentage;
        if(nextPercentage < -200) nextPercentage = -100;
        if(nextPercentage > 0) nextPercentage = 0;
	// nextPercentage = Math.min(nextPercentage, 0);
	// nextPercentage = Math.max(nextPercentage, -100);
	carrusel.dataset.percentage = nextPercentage;

    carrusel.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, {duration: 1200, fill:"forwards"});

	//carrusel.style.transform = `translate(${nextPercentage}%, -50%)`;

    for (const image of carrusel.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${100+nextPercentage/2}% center`
        }, {duration:1200, fill: "forwards"});
	//	image.style.objectPosition = `${nextPercentage/2 + 100}% 50%`;
	//	console.log(image);
	}

};

window.onmouseup = () => {
	carrusel.dataset.mouseDownAt = "0";
	carrusel.dataset.prevPercentage = carrusel.dataset.percentage;
};
