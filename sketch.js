// Global variables for the toolbox, color palette, and helper functions
var toolbox = null;
var colourP = null;
var helpers = null;

function setup() {
  // Create a canvas to fill the content div from index.html
  canvasContainer = select('#content');
  var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
  c.parent("content");

  // Initialize helper functions and the color palette
  helpers = new HelperFunctions();
  colourP = new ColourPalette();

  // Create a toolbox for storing the tools
  toolbox = new Toolbox();

  // Add the tools to the toolbox
  toolbox.addTool(new FreehandTool());
  toolbox.addTool(new LineToTool());
  toolbox.addTool(new SprayCanTool());
  toolbox.addTool(new mirrorDrawTool());
  toolbox.addTool(new stampTool());
  toolbox.addTool(new EraserTool());
  toolbox.addTool(new CutTool());
  toolbox.addTool(new ShapeFillTool());

  // Add the StarTool, ensuring it is properly initialized
  var starTool = new StarTool();
  starTool.preload(); // Preload assets for the star tool
  toolbox.addTool(starTool); // Add to the toolbox

  // Add the Text Tool to the toolbox
  toolbox.addTool(new textTool());

  // Set the initial background
  background(255);
}

function draw() {
  // Call the draw function from the selected tool if it has one
  if (toolbox.selectedTool && toolbox.selectedTool.hasOwnProperty("draw")) {
    toolbox.selectedTool.draw();
  } else {
    alert("The selected tool does not have a draw method!");
  }
}

