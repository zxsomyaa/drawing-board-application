function ShapeFillTool() {
  this.name = "shapeFillTool";
  this.icon = "shapeFill.jpg";
  this.shapeSelector = null;
  this.colorPicker = null;
  this.startX = null;
  this.startY = null;
  this.drawing = false;

  // Populate options (show the shape and color picker inside the tool options)
  this.populateOptions = function () {
    console.log("Populating options for ShapeFillTool...");

    // Select the tool options container
    const toolsOptions = select("#toolsOptions");

    // Clear previous options (if any)
    toolsOptions.html("");

    // Create the shape selector label and dropdown
    const shapeLabel = createElement("label", "Select Shape:");
    shapeLabel.attribute("for", "shapeSelector");
    toolsOptions.child(shapeLabel);

    this.shapeSelector = createSelect();
    this.shapeSelector.id("shapeSelector");
    this.shapeSelector.option("Rectangle");
    this.shapeSelector.option("Ellipse");
    this.shapeSelector.option("Circle");
    this.shapeSelector.option("Triangle");
    this.shapeSelector.option("Square");
    toolsOptions.child(this.shapeSelector);

    // Create the color picker label and input
    const colorLabel = createElement("label", "Pick a Color:");
    colorLabel.attribute("for", "colorPicker");
    toolsOptions.child(colorLabel);

    this.colorPicker = createInput("#000000", "color");
    this.colorPicker.id("colorPicker");
    toolsOptions.child(this.colorPicker);

    console.log("Options populated.");
  };

  // Unselect tool (hide the shape and color picker)
  this.unselectTool = function () {
    console.log("Unselecting ShapeFillTool...");
    select("#toolsOptions").html(""); // Clear options when tool is unselected
  };

  // Display instruction text
  this.drawInstructionText = function () {
    textSize(16);
    fill(0); // Black color for text
    text("Drag the mouse to draw the shape", 10, 30);
  };

  // Draw shapes
  this.draw = function () {
    if (!this.shapeSelector || !this.colorPicker) {
      console.warn("Selectors are not initialized properly.");
      return;
    }

    console.log("Shape selected:", this.shapeSelector.value());
    console.log("Color selected:", this.colorPicker.value());

    // Draw instruction text
    this.drawInstructionText();

    if (mouseIsPressed) {
      if (!this.drawing) {
        this.startX = mouseX;
        this.startY = mouseY;
        this.drawing = true;
      }
    } else {
      if (this.drawing) {
        this.drawing = false;
        let shape = this.shapeSelector.value();
        let fillColor = this.colorPicker.value();

        fill(fillColor);
        noStroke();

        let width = mouseX - this.startX;
        let height = mouseY - this.startY;

        if (shape === "Rectangle") {
          rectMode(CORNERS);
          rect(this.startX, this.startY, mouseX, mouseY);
        } else if (shape === "Ellipse") {
          ellipseMode(CORNERS);
          ellipse(this.startX, this.startY, mouseX, mouseY);
        } else if (shape === "Circle") {
          let diameter = dist(this.startX, this.startY, mouseX, mouseY);
          ellipseMode(CENTER);
          ellipse(this.startX, this.startY, diameter, diameter);
        } else if (shape === "Triangle") {
          triangle(this.startX, this.startY, mouseX, mouseY, this.startX, mouseY);
        } else if (shape === "Square") {
          let side = max(abs(width), abs(height));
          rectMode(CORNERS);
          if (width < 0 && height < 0) {
            rect(this.startX, this.startY, this.startX - side, this.startY - side);
          } else if (width < 0) {
            rect(this.startX, this.startY, this.startX - side, this.startY + side);
          } else if (height < 0) {
            rect(this.startX, this.startY, this.startX + side, this.startY - side);
          } else {
            rect(this.startX, this.startY, this.startX + side, this.startY + side);
          }
        }
      }
    }
  };
}





