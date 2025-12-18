function HelperFunctions() {

	// Jquery click events. Notice that there is no this. at the
	// start we don't need to do that here because the event will
	// be added to the button and doesn't 'belong' to the object

	// event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {

		background(255, 255, 255);

		// call loadPixels to update the drawing state
		// this is needed for the mirror tool
		loadPixels();

	});

	// event handler for the save image button. saves the canvsa to the
	// local file system.
	select("#saveImageButton").mouseClicked(function() {
		
		updatePixels();

		// Prompt user for the name
		var name = prompt("Name for this save?", "My Art");

		// cancel if pressed "Cancel" button
		if( name === null ) return;

		// If user deletes the name, "My Art" will be default name
		if( name == "" ) name = "My Art";

		// Save canvas
		saveCanvas(name, "jpg");

	});

}


/**
 * Checks if mouse pressed inside canvas
 * 
 * @returns boolean
 * 
 */
function mousePressedInCanvas(){

	if( mouseIsPressed ){

		if( 
			// mouseX > canvasContainer.elt.offsetLeft &&
			// mouseX < (canvasContainer.elt.offsetLeft + canvasContainer.width) &&

			// mouseY > canvasContainer.elt.offsetTop &&
			// mouseY < (canvasContainer.elt.offsetTop + canvasContainer.height)
			mouseX > 0 &&
			mouseX < canvasContainer.width &&

			mouseY > 0 &&
			mouseY < canvasContainer.height
		){
			return true;
		}

	}

	return false;

}
