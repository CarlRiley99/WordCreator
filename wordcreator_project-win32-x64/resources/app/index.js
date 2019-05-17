var itemNum;
var itemLocationX = [];
var itemLocationY = [];
var dragItem;
var dragItemList = document.querySelectorAll(".dragme");  //Returns a list of all draggable objects.
var container = document.querySelector("#container");
var active = false; //Determines if dragging is still active.
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

//touchestart, touchend, and touchmove are for touch screen capabilitties.
//Due to changes made in the code, touch screen capabilities have been disabled.
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

//Drag start triggers when a mouse/finger clicks on the screen.
function dragStart(e) {
  //Finds the offset values for the object that neesd to be dragged.
  for (var i = 0; i < dragItemList.length; i++) {
    if (dragItemList[i].title === e.toElement.title) {
      xOffset = itemLocationX[i];
      yOffset = itemLocationY[i];
      itemNum = i;
    }
  }

  //Checks if its a mouse click or a touch from a finger (if monitor has
  //touch screen capabilities).
  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }

  //Looks for the object that needs to be dragged.
  for(var i = 0; i < dragItemList.length; i++) {
    if (dragItemList[i].title === e.toElement.title) {
      dragItem = dragItemList[i];
    }
  }

  //Checks if there is an actual object to be grabbed.
  if (dragItem === null) {
    return;
  }

  //If there is an item to be dragged, set active variable to true.
  if (e.target === dragItem) {
    active = true;
  }
}

//Drag Ends triggers when the mouse/finger stops clicking down.
function dragEnd(e) {
  //Get the new location of the object.
  itemLocationX[itemNum] = currentX;
  itemLocationY[itemNum] = currentY;

  //active is set to false to prevent dragging when the mouse/finger isn't clicked down.
  active = false;
}

//Drag triggers when the mouse/finger is clicked down and is moving at the same time.
function drag(e) {
  if (active) {

    //Tells the user agent that if the event does not get explicitly handled, its default
    //action should not be taken as it normally would be. The event continues to propagate as usual,
    //unless one of its event listeners calls stopPropagation() or stopImmediatePropagation(),
    //either of which terminates propagation at once. See notes for source.
    e.preventDefault();

    //Finds the new position of the object.
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    //sets the offsets to the new position values.
    xOffset = currentX;
    yOffset = currentY;

    //Moves the object.
    setTranslate(currentX, currentY, dragItem);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
