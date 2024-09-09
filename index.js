//Later fix. for balatro rotation, add an unmoving element that holds the moving part
//That unmoving part will act as extra hit detection

const rotators = document.querySelectorAll(".rotate-test")
var mouseCoordinates = [0,0]

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

function resetElement(event) {
    event.target.style.transform = "rotateX(0deg)";
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