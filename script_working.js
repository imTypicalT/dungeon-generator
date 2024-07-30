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

let tileSize = 30;

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

// Generate room size
generateRoom = () => {
    const canvas = document.getElementById("dungeonCanvas");
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid(ctx, canvas.width, canvas.height, tileSize);

    // Define grid size
    const minWidth = 3;
    const maxWidth = 7;
    const minHeight = 3;
    const maxHeight = 7;

    const width =
        Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
    const height =
        Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

    const gap = 0; // Gap between squares

    // Calculate total width and height of the grid
    const totalWidth = width * tileSize + (width - 1);
    const totalHeight = height * tileSize + (height - 1);

    // Calculate starting position to center the grid
    const startX =
        Math.floor(
            (canvas.width - (width * tileSize + (width - 1) * gap)) /
                2 /
                tileSize
        ) * tileSize;
    const startY =
        Math.floor(
            (canvas.height - (height * tileSize + (height - 1) * gap)) /
                2 /
                tileSize
        ) * tileSize;

    // Draw grid
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
    generateRoom();
};
// Reset canvas
resetCanvas = () => {
    const canvas = document.getElementById("dungeonCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height, tileSize);
};
