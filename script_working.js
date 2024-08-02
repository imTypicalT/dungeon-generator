const debug = true;

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
let lastRoom = null; // Store last room position

drawGrid = (ctx, width, height, tileSize) => {
    ctx.strokeStyle = "#a0a0a0";
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

// Check if room overlaps existing rooms
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

// Find potential positions for a new room
findPotentialPositions = (width, height, lastRoom) => {
    let positions = [];
    const minDistance = 2; // Minimum distance (1 square) + 1 for the next square
    const maxDistance = 6; // Maximum distance (5 squares) + 1 for the next square
    const canvas = document.getElementById("dungeonCanvas");

    const [lastX, lastY] = lastRoom ? [lastRoom.x, lastRoom.y] : [0, 0];

    // Check in all 4 directions
    for (let dy = -maxDistance; dy <= maxDistance; dy++) {
        for (let dx = -maxDistance; dx <= maxDistance; dx++) {
            if (Math.abs(dx) < minDistance && Math.abs(dy) < minDistance) {
                continue; // This insures a min distance
            }
            let newX = lastX + dx * tileSize;
            let newY = lastY + dy * tileSize;

            if (
                newX >= 0 &&
                newY >= 0 &&
                !checkOverlap(
                    newX / tileSize - 1,
                    newY / tileSize - 1,
                    width + 2,
                    height + 2
                ) &&
                newX + width * tileSize <= canvas.width &&
                newY + height * tileSize <= canvas.height
            ) {
                positions.push({ x: newX, y: newY });
            }
        }
    }
    return positions;
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

    const maxAttempts = 100;
    let attempt = 0;
    let startX, startY;

    // If no last room, start at random position
    if (!lastRoom) {
        startX =
            Math.floor(Math.random() * (canvas.width / tileSize - width)) *
            tileSize;
        startY =
            Math.floor(Math.random() * (canvas.height / tileSize - height)) *
            tileSize;
        lastRoom = { x: startX, y: startY };
    } else {
        // Find potential positions relative to the last room
        let potentialPositions = findPotentialPositions(
            width,
            height,
            lastRoom
        );

        if (potentialPositions.length === 0) {
            console.log("No valid positions found");
            return;
        }
        // Pick a random position from the potential ones
        const position =
            potentialPositions[
                Math.floor(Math.random() * potentialPositions.length)
            ];
        startX = position.x;
        startY = position.y;
        lastRoom = { x: startX, y: startY };
    }

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
};
// Generate hallways between rooms
generateHallway = () => {};

// Generate the full dungeon layout
generateDungeon = () => {
    const canvas = document.getElementById("dungeonCanvas");
    const ctx = canvas.getContext("2d");
    resetCanvas();
    let numberOfRooms = Number(document.getElementById("numRooms").value) || 3; // Example number of rooms
    if (debug) {
        console.log("-----{DEBUG ROOM COORDINATES}-----");
    }
    for (let i = 0; i < numberOfRooms; i++) {
        generateRoom(ctx);
        // DEBUG
        if (debug) {
            console.log(
                `Room ${i + 1} Positions: { x: ${lastRoom.x}, y: ${
                    lastRoom.y
                } }`
            );
        }
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
    lastRoom = null; // Clear last room data
};

// Initial grid draw
resetCanvas();
