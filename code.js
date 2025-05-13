// Show UI
figma.showUI(__html__, { width: 240, height: 100 });

// Keep track of the last rectangle's position
let lastRectX = null;
let lastRectY = null;

// Function to generate random color
function getRandomColor() {
    return {
        r: Math.random(),
        g: Math.random(),
        b: Math.random()
    };
}

// Listen for messages from the UI
figma.ui.onmessage = async (msg) => {
    if (msg.type === 'create-rectangle') {
        // Create a rectangle
        const rect = figma.createRectangle();
        
        if (lastRectX === null || lastRectY === null) {
            // First rectangle - place at viewport center
            const center = figma.viewport.center;
            lastRectX = center.x;
            lastRectY = center.y;
        } else {
            // Place new rectangle to the right of the last one with a 20px gap
            lastRectX += 120; // 100px (width) + 20px (gap)
        }
        
        // Set position and size
        rect.x = lastRectX;
        rect.y = lastRectY;
        rect.resize(100, 100);
        
        // Set random color
        rect.fills = [{
            type: 'SOLID',
            color: getRandomColor()
        }];

        // Select the new rectangle
        figma.currentPage.selection = [rect];
        
        // Scroll viewport to show the new rectangle
        figma.viewport.scrollAndZoomIntoView([rect]);
        
        // Notify the user
        figma.notify('Rectangle created! 🎨');
    }
};