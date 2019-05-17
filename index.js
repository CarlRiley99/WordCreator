var itemNum;
var itemLocationX = [];
var itemLocationY = [];
var dragItem;
var dragItemList = document.querySelectorAll(".dragme");
var container = document.querySelector("#container");
console.log(dragItemList);

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

for (var i = 0; i < dragItemList.length; i++) {
  itemLocationX[i] = 0;
  itemLocationY[i] = 0;
}

function dragStart(e) {
  for (var i = 0; i < dragItemList.length; i++) {
    if (dragItemList[i].title === e.toElement.title) {
      xOffset = itemLocationX[i];
      yOffset = itemLocationY[i];
      itemNum = i;
    }
  }
  console.log(itemNum);
  if (e.type === "touchstart") {
    console.log(e.touches[0]);
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }

  //console.log(dragItemList.length);
  for(var i = 0; i < dragItemList.length; i++) {
    if (dragItemList[i].title === e.toElement.title) {
      dragItem = dragItemList[i];
    }
  }

  if (dragItem === null) {
    return;
  }

  //console.log(dragItem);
  if (e.target === dragItem) {
    active = true;
  }
}

function dragEnd(e) {
  itemLocationX[itemNum] = currentX;
  itemLocationY[itemNum] = currentY;
  //initialX = currentX;
  //initialY = currentY;

  active = false;
}

function drag(e) {
  if (active) {

    e.preventDefault();

    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, dragItem);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
