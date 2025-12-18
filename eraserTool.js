function EraserTool(){
	
	this.icon = "assets/eraserTool.jpg";
	this.name = "EraserTool";
	
	var eraserSize = 20;
	var eraserShape = 'boxed';


	this.draw = function(){

		// display the last save state of pixels
		updatePixels();

		// only erase when mouse is clicked
		if( mousePressedInCanvas() ){

			// Erase this part of canvas
			noStroke();
			strokeWeight(0);
			this.eraserDraw();
		}
				loadPixels();

		// Push drawing state so we can preview eraser without messing with our canvas
		push();
		// Preview Eraser
		stroke(0);
		strokeWeight(1)
		this.eraserDraw();
		noStroke();
		strokeWeight(0);

		// Return to our original canvas
		pop();
	};

	// when the tool is deselected clear options
	this.unselectTool = function() {
		
		updatePixels();
		
		// clear options
		select(".options").html("");

	};

	// Adds a dropdown to select eraser shape and a slider to 
	// increase/decrease the size of eraser
	this.populateOptions = function() {

		// Select input to select shape of eraser
		shapeDiv = createDiv('Shape of Eraser: <br />');
		sel = createSelect();
		sel.option('boxed');
		sel.option('round');
		sel.option('triangle');
		sel.selected('boxed');
		sel.changed(function(v){
			eraserShape = this.value();
		});
		sel.parent(shapeDiv);
		shapeDiv.parent('toolsOptions');
		
		// Slider for size of eraser
		eraserSizeDiv = createDiv('Size: <br />');
		slider = createSlider(5, 150, 30);
		slider.input(function(){
			eraserSize = this.value();
		});
		slider.parent(eraserSizeDiv);
		eraserSizeDiv.parent('toolsOptions');
	};

	this.eraserDraw = function(){

		fill(255);
		switch (eraserShape) {
			
			// Box Shaped Eraser
			case 'boxed':
				rect(mouseX-(eraserSize/2), mouseY-(eraserSize/2), eraserSize, eraserSize);
			break;

			// Round Shaped Eraser
			case 'round':
				ellipse(mouseX, mouseY, eraserSize);
			break;

			case 'triangle':
				triangle(
					mouseX, mouseY-(eraserSize/2),
					mouseX-(eraserSize/2), mouseY+(eraserSize/3),
					mouseX+(eraserSize/2), mouseY+(eraserSize/3)
				);
			break;

			default:
				rect(mouseX-(eraserSize/2), mouseY-(eraserSize/2), eraserSize, eraserSize);
			break;
		}
		colourP.resetColors();
	};
}
