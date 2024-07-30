class Square {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    draw(ctx) {
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.x, this.y, this.size, this.size);
    }
}

let tileSize = Number(document.getElementById("gridSize").value); // Get pixel size from HTML selection
let coordinates = []; // Keep track of room coordinates

drawGrid = (ctx, width, height, tileSize) => {
    ctx.strokeStyle = "#e0e0e0";
    for (let x = 0; x <= width; x += tileSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    for (let y = 0; y <= height; y += tileSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
};

// Check if room overlaps
checkOverlap = (x, y, width, height) => {
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const checkX = x + j;
            const checkY = y + i;
            if (coordinates[checkY] && coordinates[checkY][checkX]) {
                return true;
            }
        }
    }
    return false;
};

// Add room position to coordinates array
markCoordinates = (x, y, width, height) => {
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const markX = x + j;
            const markY = y + i;
            if (!coordinates[markY]) coordinates[markY] = [];
            coordinates[markY][markX] = true;
        }
    }
};

// Generate room
generateRoom = (ctx) => {
    const canvas = document.getElementById("dungeonCanvas");

    // Define max/min room size
    const minWidth = 3;
    const maxWidth = 7;
    const minHeight = 3;
    const maxHeight = 7;

    const width =
        Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
    const height =
        Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

    const gap = 0; // Gap between squares

    // Calculate random position
    const maxAttempts = 100;
    let attempt = 0;
    let startX, startY;

    do {
        startX =
            Math.floor(Math.random() * (canvas.width / tileSize - width)) *
            tileSize;
        startY =
            Math.floor(Math.random() * (canvas.height / tileSize - height)) *
            tileSize;
        attempt++;
    } while (
        checkOverlap(startX / tileSize, startY / tileSize, width, height) &&
        attempt < maxAttempts
    );

    if (attempt < maxAttempts) {
        // Mark grid with room's position
        markCoordinates(startX / tileSize, startY / tileSize, width, height);

        // Draw room
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                const x = startX + j * (tileSize + gap);
                const y = startY + i * (tileSize + gap);
                const square = new Square(x, y, tileSize);
                square.draw(ctx);
            }
        }
    } else {
        console.log("Failed to place room after maximum attempts");
    }
};
// Generate hallways between rooms
generateHallway = () => {};

// Generate the full dungeon layout
generateDungeon = () => {
    const canvas = document.getElementById("dungeonCanvas");
    const ctx = canvas.getContext("2d");
    resetCanvas();
    let numberOfRooms = 3; // Example number of rooms
    for (let i = 0; i < numberOfRooms; i++) {
        generateRoom(ctx);
    }
};
// Reset canvas
resetCanvas = () => {
    const canvas = document.getElementById("dungeonCanvas");
    const ctx = canvas.getContext("2d");
    tileSize = Number(document.getElementById("gridSize").value);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height, tileSize);
    coordinates = []; // Clear coordinates data
};

// Initial grid draw
resetCanvas();
