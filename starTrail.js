function StarTool() {
  this.icon = "star.png"; // Default star icon
  this.name = "starTool";

  var starSize = 20;
  var numberOfStars = 5;
  var starImage = null;
  var starImages = {
    default: "star.png",
    bright: "bright_star.png",
    dark: "dark_star.png"
  };

  // Preload the default star image
  this.preload = function() {
    starImage = loadImage(this.icon);
  };

  // Draw stars on the canvas
  this.draw = function() {
    if (mouseIsPressed && starImage) { // Ensure starImage is loaded
      for (var i = 0; i < numberOfStars; i++) {
        var size = starSize;
        var starX = random((mouseX - size / 2) - 10, (mouseX - size / 2) + 10);
        var starY = random((mouseY - size / 2) - 10, (mouseY - size / 2) + 10);
        image(starImage, starX, starY, size, size);
      }
    }
  };

  // Populate options for star size, number of stars, and image selection
  this.populateOptions = function() {
    // Slider for star size
    var sizeControlDiv = createDiv('Star Size: <br />');
    var sizeSlider = createSlider(5, 50, starSize);
    sizeSlider.input(function() {
      starSize = this.value();
    });
    sizeSlider.parent(sizeControlDiv);
    sizeControlDiv.parent('toolsOptions');

    // Slider for number of stars
    var numberControlDiv = createDiv('Number of Stars: <br />');
    var numberSlider = createSlider(1, 20, numberOfStars);
    numberSlider.input(function() {
      numberOfStars = this.value();
    });
    numberSlider.parent(numberControlDiv);
    numberControlDiv.parent('toolsOptions');

    // Dropdown for selecting star images
    var imageControlDiv = createDiv('Select Star Image: <br />');
    var imageSelector = createSelect();
    imageSelector.option('Default Star', 'default');
    imageSelector.option('Bright Star', 'bright');
    imageSelector.option('Dark Star', 'dark');

    // Update star image based on selection
    imageSelector.changed(function() {
      var selectedImage = imageSelector.value();
      starImage = loadImage(starImages[selectedImage]);
    });

    imageSelector.parent(imageControlDiv);
    imageControlDiv.parent('toolsOptions');
  };

  // Clear options when the tool is deselected
  this.unselectTool = function() {
    select(".options").html("");
  };
}
