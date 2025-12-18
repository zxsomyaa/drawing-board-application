function textTool() {

    this.name = "textTool";
    this.icon = "textTool.jpg";

    var self = this;

    // Previous mouse positions
    var previousMouseX = -1;
    var previousMouseY = -1;

    // Default text settings
    var inputText = "Enter text";
    var textSizeValue = 30;
    var textColor = "#000000";
    var font = "Arial";

    // Store fonts list
    var fontsList = [
        'Arial',
        'Courier New',
        'Georgia',
        'Times New Roman',
        'Verdana'
    ];

    this.draw = function() {
        updatePixels();

        // Draw the text on mouse press
        if (mousePressedInCanvas() && inputText !== "") {

            if (previousMouseX == -1) {
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            } else {
                fill(textColor);
                textSize(textSizeValue);
                textFont(font);
                text(inputText, mouseX, mouseY);
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
        } else {
            previousMouseX = -1;
            previousMouseY = -1;
        }

        loadPixels();

        // Live preview of the text at mouse position
        push();
        fill(textColor);
        textSize(textSizeValue);
        textFont(font);
        text(inputText, mouseX, mouseY);
        pop();
    };

    this.unselectTool = function() {
        updatePixels();
        select(".options").html("");
    };

    // Populate options for text input, size, color, and font selection
    this.populateOptions = function() {
        // Text input field
        var textDiv = createDiv('Enter Text: <br />');
        var textInput = createInput(inputText);
        textInput.input(function() {
            inputText = this.value();
        });
        textInput.parent(textDiv);
        textDiv.parent('toolsOptions');

        // Font selector
        var fontDiv = createDiv('Select Font: <br />');
        var fontSelector = createSelect();
        for (let i = 0; i < fontsList.length; i++) {
            fontSelector.option(fontsList[i]);
        }
        fontSelector.changed(function() {
            font = this.value();
        });
        fontSelector.parent(fontDiv);
        fontDiv.parent('toolsOptions');

        // Text size slider
        var textSizeDiv = createDiv('Text Size: <br />');
        var textSizeSlider = createSlider(10, 150, textSizeValue);
        textSizeSlider.input(function() {
            textSizeValue = this.value();
        });
        textSizeSlider.parent(textSizeDiv);
        textSizeDiv.parent('toolsOptions');

        // Text color picker
        var colorDiv = createDiv('<br />');
        var colorPicker = createColorPicker(textColor);
        colorPicker.input(function() {
            textColor = this.value();
        });
        colorPicker.parent(colorDiv);
        colorDiv.parent('toolsOptions');
    };
}
