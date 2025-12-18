
function LineToTool(){
	
	this.icon = "assets/lineTool.jpg";
	this.name = "LineTo";
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	var lineWidth = 1;

	// draws the line to the screen 
	this.draw = function(){

		// only draw when mouse is clicked
		if( mousePressedInCanvas() ){
			
			// if it's the start of drawing a new line
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				// save the current pixel Array
				loadPixels();
			}
			else{
				// update the screen with the saved pixels to hide any previous
				updatePixels();
				
				// draw the line
				strokeWeight(lineWidth);
				line(startMouseX, startMouseY, mouseX, mouseY);
				colourP.resetColors();
			}
		}
		else if(drawing){
			//save the pixels with the most recent line and reset the
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


	// when the tool is deselected clear options
	this.unselectTool = function() {
		select(".options").html("");
	};

	// Add options
	this.populateOptions = function() {

		// Adds a slider to increase/decrease the thickness of line
		lineThicknessDiv = createDiv('Line Thickness: <br />');
		slider = createSlider(1, 20, lineWidth);
		slider.input(function(){
			lineWidth = this.value();
		});
		slider.parent(lineThicknessDiv);
		lineThicknessDiv.parent('toolsOptions');
	};
}
