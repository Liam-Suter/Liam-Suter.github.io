//Later fix. for balatro rotation, add an unmoving element that holds the moving part
//That unmoving part will act as extra hit detection

const rotators = document.querySelectorAll(".rotate-test");
var mouseCoordinates = [0,0];

var activeElement = null;
var activeElementCenter = [0, 0];

rotators.forEach(rotator => {
document.addEventListener("mousemove", (event) => {
    mouseCoordinates[0] = event.clientX;
    mouseCoordinates[1] = event.clientY;
    rotateElementNew();
})

rotator.addEventListener("mouseover", (event) => {
    activeElement = findParentByID(event.target);
    activeElementCenter = calculateElementCenter(activeElement.getBoundingClientRect());
}  );

rotator.addEventListener("mouseleave", (event) => {
    resetElement(event);
    activeElement = null;
    activeElementCenter = [0,0];
});
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            entry.target.classList.remove('hidden');
        }
    });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((element) => observer.observe(element));


const durationV = 5000;
const durationH = 8000;
const startTime = performance.now();

rotators.forEach((card) => {
    card.timeOffsetms = Math.random()*5000;
})

function animate(timestamp) {
    rotators.forEach((card) => {
        if (card != activeElement) {
            const elapsedTime = timestamp - (startTime+card.timeOffsetms);
            progressV = (elapsedTime % durationV) / durationV;
            progressH = (elapsedTime % durationH) / durationH;
            //console.log(Math.sin(progress*Math.PI*2)*30);
            card.style.transform = `rotateX(${Math.sin(progressV*Math.PI*2)*7}deg) rotateY(${Math.sin(progressH*Math.PI*2)*4}deg)`;
            console.log(card.style);
        }
    });
    requestAnimationFrame(animate);
}




requestAnimationFrame(animate);


function resetElement(event) {
    event.target.style.transform = "rotateX(0deg)";
}




function rotateElementNew() {
    if (activeElement === null) {
        return
    }

    const horizontalRatio = (mouseCoordinates[0] - activeElementCenter[0]) / activeElement.getBoundingClientRect().width;
    const verticalRatio = (mouseCoordinates[1] - activeElementCenter[1]) / activeElement.getBoundingClientRect().height;

    const yDegrees = 40*horizontalRatio;
    const xDegrees = -40*verticalRatio
    activeElement.style.transform = `rotateX(${xDegrees}deg) rotateY(${yDegrees}deg)`;
    }






function calculateElementCenter(boundingRect) {

    return [boundingRect.left + boundingRect.width/2, boundingRect.top + boundingRect.height/2];
}



function findParentByID(element) {
    let curElement = element;

    while(curElement) {
        if(curElement.classList.contains("rotate-test")) {
            return curElement
        }

        curElement = curElement.parentElement;
    }
    return null;
    
}