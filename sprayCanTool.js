function SprayCanTool(){
	
	this.name = "sprayCanTool";
	this.icon = "assets/sprayTool.jpg";
	var points = 13;
	var spread = 10;
	var dropletsThickness = 1;

	this.draw = function(){
		var r = random(5,10);
		if(mousePressedInCanvas()){
			for(var i = 0; i < points; i++){
				ellipse(random(mouseX-spread, mouseX + spread), random(mouseY-spread, mouseY+spread), dropletsThickness);
			}
		}
	};


	// when the tool is deselected clear options
	this.unselectTool = function() {
		select(".options").html("");
	};

	// Add options
	this.populateOptions = function() {

		// Adds a slider to increase/decrease the thickness of droplets
		dropletsThicknessDiv = createDiv('Droplets Thickness: <br />');
		slider = createSlider(1, 10, dropletsThickness);
		slider.input(function(){
			dropletsThickness = this.value();
		});
		slider.parent(dropletsThicknessDiv);
		dropletsThicknessDiv.parent('toolsOptions');

		// Adds a slider to increase/decrease the spread/size
		spreadThicknessDiv = createDiv('Spray Size: <br />');
		slider = createSlider(10, 50, spread);
		slider.input(function(){
			spread = this.value();
		});
		slider.parent(spreadThicknessDiv);
		spreadThicknessDiv.parent('toolsOptions');

		// Adds a slider to increase/decrease the points density
		pointsThicknessDiv = createDiv('Density: <br />');
		slider = createSlider(5, 20, points);
		slider.input(function(){
			points = this.value();
		});
		slider.parent(pointsThicknessDiv);
		pointsThicknessDiv.parent('toolsOptions');

	};
}