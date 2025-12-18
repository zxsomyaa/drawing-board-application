function CutTool() {
    this.icon = "cutTool.jpg";
    this.name = "CutTool";

    // Cutting Mode
    var cuttingMode = 'boxed'; // default mode

    // Mouse positions
    var startMouseX = -1;
    var startMouseY = -1;
    var endMouseX = -1;
    var endMouseY = -1;

    // Cutting Phase
    var cuttingPhase = 0;

    // Variable containing the freshly cut image
    var toBePastedImage = null;

    // Fix for a bug of mouseIsPressed
    var fixUnresponsiveMousePress = false;

    // Freehand cutting path
    var freehandPath = [];

    this.draw = function () {
        if (mousePressedInCanvas() && !fixUnresponsiveMousePress) {
            if (cuttingPhase === 0) {
                console.log('Started Cutting');
                startMouseX = mouseX;
                startMouseY = mouseY;
                cuttingPhase = 1;

                if (cuttingMode === 'freehand') {
                    freehandPath = [];
                    freehandPath.push({ x: mouseX, y: mouseY });
                }
            }

            if (cuttingPhase === 3 && toBePastedImage) {
                updatePixels();
                image(toBePastedImage, mouseX - (toBePastedImage.width / 2), mouseY - (toBePastedImage.height / 2));
                loadPixels();
                console.log('Pasted the image.');
                cuttingPhase = 4;
                resetCuttingCoordinates();
            }
        } else if (cuttingPhase === 1) {
            console.log('Released');
            cuttingPhase = 2;
            endMouseX = mouseX;
            endMouseY = mouseY;

            if (cuttingMode === 'freehand') {
                freehandPath.push({ x: mouseX, y: mouseY });
            }
        } else if (cuttingPhase === 4) {
            cuttingPhase = 0;
        }

        // Draw based on the current cutting mode
        switch (cuttingPhase) {
            case 1:
                updatePixels();
                loadPixels();

                push();
                noFill();
                stroke(0);
                drawCuttingShape(cuttingMode);
                colourP.resetColors();
                pop();
                break;

            case 3:
                updatePixels();
                loadPixels();

                if (toBePastedImage) {
                    push();
                    noFill();
                    stroke(0);
                    image(toBePastedImage, mouseX - (toBePastedImage.width / 2), mouseY - (toBePastedImage.height / 2));
                    colourP.resetColors();
                    pop();
                }
                break;
        }
    };

    // Reset the cutting coordinates
    function resetCuttingCoordinates() {
        startMouseX = -1;
        startMouseY = -1;
        endMouseX = -1;
        endMouseY = -1;
    }

    // Function to draw the appropriate cutting shape based on the mode
    function drawCuttingShape(mode) {
        switch (mode) {
            case 'boxed':
                rect(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
                break;
            case 'round':
                let radius = dist(startMouseX, startMouseY, mouseX, mouseY);
                ellipse(startMouseX, startMouseY, radius * 2);
                break;
            case 'freehand':
                beginShape();
                for (let point of freehandPath) {
                    vertex(point.x, point.y);
                }
                vertex(mouseX, mouseY);
                endShape();
                break;
            case 'pointByPoint':
                line(startMouseX, startMouseY, mouseX, mouseY);
                break;
            default:
                rect(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
        }
    }

    // When the tool is deselected clear options
    this.unselectTool = function () {
        updatePixels();
        cuttingPhase = 0;
        select(".options").html("");
    };

    // Populate options for cutting modes
    this.populateOptions = function () {
        shapeDiv = createDiv('Cutting Mode  <br />');
        sel = createSelect();
        sel.option('boxed');
        sel.option('round');
        sel.option('freehand');
        sel.selected('boxed');
        sel.changed(function () {
            cuttingMode = this.value();
        });
        sel.parent(shapeDiv);
        shapeDiv.parent('toolsOptions');

        // Action buttons
        actionDiv = createDiv('Actions: <br />');

        // Discard Button
        discard = createButton('Discard');
        discard.mousePressed(function () {
            if (cuttingPhase === 2) {
                updatePixels();
                cuttingPhase = 0;
                console.log('Discarding current cut');
            }
        });

        // Cut Button
        cut = createButton('Cut');
        cut.mousePressed(function () {
            if (cuttingPhase === 2) {
                updatePixels();
                performCuttingAction(cuttingMode);

                if (toBePastedImage) {
                    cuttingPhase = 3;
                    fill(255);
                    noStroke();
                    drawCuttingShape(cuttingMode);
                    colourP.resetColors();
                    loadPixels();
                    console.log('Cut out successfully!');
                } else {
                    console.log('Cutting failed.');
                    cuttingPhase = 0;
                }
            }
        });

        // Paste Button
        paste = createButton('Paste');
        paste.mousePressed(function () {
            if (cuttingPhase === 0 && toBePastedImage) {
                cuttingPhase = 3;
                console.log('Ready to paste the image.');
            }
        });

        cut.parent(actionDiv);
        discard.parent(actionDiv);
        paste.parent(actionDiv);
        actionDiv.parent('toolsOptions');
    };

    // Perform the cutting action based on the selected mode
    function performCuttingAction(mode) {
        switch (mode) {
            case 'boxed':
                handleBoxedCut();
                break;
            case 'round':
                handleRoundCut();
                break;
            case 'freehand':
                handleFreehandCut();
                break;
            default:
                handleBoxedCut();
        }
    }

    // Handle rectangular cutting
    function handleBoxedCut() {
        if (startMouseX <= endMouseX && startMouseY <= endMouseY) {
            toBePastedImage = get(startMouseX, startMouseY, endMouseX - startMouseX, endMouseY - startMouseY);
        } else if (startMouseX >= endMouseX && startMouseY <= endMouseY) {
            toBePastedImage = get(endMouseX, startMouseY, startMouseX - endMouseX, endMouseY - startMouseY);
        } else if (startMouseX <= endMouseX && startMouseY >= endMouseY) {
            toBePastedImage = get(startMouseX, endMouseY, endMouseX - startMouseX, startMouseY - endMouseY);
        } else {
            toBePastedImage = get(endMouseX, endMouseY, startMouseX - endMouseX, startMouseY - endMouseY);
        }

        if (!toBePastedImage) {
            console.error("Error: Failed to capture image using get().");
        }
    }

    // Handle circular cutting
    function handleRoundCut() {
        let radius = dist(startMouseX, startMouseY, endMouseX, endMouseY);
        toBePastedImage = get(startMouseX - radius, startMouseY - radius, radius * 2, radius * 2);

        if (!toBePastedImage) {
            console.error("Error: Failed to capture circular area using get().");
        }
    }

    // Handle freehand cutting
    function handleFreehandCut() {
        beginShape();
        for (let { x, y } of freehandPath) {
            vertex(x, y);
        }
        endShape(CLOSE);
        toBePastedImage = get(minX(freehandPath), minY(freehandPath), maxX(freehandPath) - minX(freehandPath), maxY(freehandPath) - minY(freehandPath));

        if (!toBePastedImage) {
            console.error("Error: Failed to capture freehand area using get().");
        }
    }
    // Utility functions for freehand bounds
    function minX(path) { return Math.min(...path.map(p => p.x)); }
    function minY(path) { return Math.min(...path.map(p => p.y)); }
    function maxX(path) { return Math.max(...path.map(p => p.x)); }
    function maxY(path) { return Math.max(...path.map(p => p.y)); }
}



