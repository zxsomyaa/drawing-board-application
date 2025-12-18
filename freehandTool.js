function FreehandTool(){

	// set an icon and a name for the object
	this.icon = "assets/pencilTool.jpg";
	this.name = "freehand";
	var previousMouseX = -1;
	var previousMouseY = -1;

	var lineWidth = 1;

	this.draw = function(){

		// if the mouse is pressed
		if( mousePressedInCanvas() ){
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			else{
				strokeWeight(lineWidth);
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				colourP.resetColors();
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		else{
			previousMouseX = -1;
			previousMouseY = -1;
		}
	};

	// when the tool is deselected clear options
	this.unselectTool = function() {
		select(".options").html("");
	};

	// Add options
	this.populateOptions = function() {

		// Adds a slider to increase/decrease the thickness of pencil
		pencilThicknessDiv = createDiv('Pencil Thickness: <br />');
		slider = createSlider(1, 20, lineWidth);
		slider.input(function(){
			lineWidth = this.value();
		});
		slider.parent(pencilThicknessDiv);
		pencilThicknessDiv.parent('toolsOptions');


	};

}