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
function generateDungeon() {
    const canvas = document.getElementById("dungeonCanvas");
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Define grid size
    const minWidth = 3;
    const maxWidth = 7;
    const minHeight = 3;
    const maxHeight = 7;

    const width =
        Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
    const height =
        Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

    const tileSize = 50;
    const gap = 0; // Gap between squares

    // Calculate total width and height of the grid
    const totalWidth = width * tileSize + (width - 1); //* gap;
    const totalHeight = height * tileSize + (height - 1); //* gap;

    // Calculate starting position to center the grid
    const startX = (canvas.width - totalWidth) / 2;
    const startY = (canvas.height - totalHeight) / 2;

    // Draw grid
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const x = startX + j * (tileSize + gap);
            const y = startY + i * (tileSize + gap);
            const square = new Square(x, y, tileSize);
            square.draw(ctx);
        }
    }
}
