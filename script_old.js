function generateDungeon() {
    // Get user inputs
    const numRooms = parseInt(document.getElementById("numRooms").value);
    // const roomSize = parseInt(document.getElementById("roomSize").value);

    // Define variables for generation
    const dungeonLayout = []; // Store dungeon layout data
    const gridSize = 50; // Number of pixel to create "5ft cube"
    const maxAttempts = 1000; // Max attempts to create room without overlapping
    const minRoomSize = gridSize * 3; // Min size
    const maxRoomSize = gridSize * 5; // Max size

    // Check for room overlap
    function isOverlapping(room) {
        return dungeonLayout.some((existingRoom) => {
            return (
                room.x < existingRoom.x + existingRoom.width &&
                room.x + room.width > existingRoom.x &&
                room.y < existingRoom.y + existingRoom.height &&
                room.y + room.height > existingRoom.y
            );
        });
    }

    // Generate random room
    function generateRoom() {
        const width =
            Math.floor(Math.random() * (maxRoomSize - minRoomSize + 1)) +
            minRoomSize;
        const height =
            Math.floor(Math.random() * (maxRoomSize - minRoomSize + 1)) +
            minRoomSize;
        return {
            x: Math.floor(Math.random() * (800 - width)), // Replace with canvas width
            y: Math.floor(Math.random() * (600 - height)), // Replace with canvas height
            width,
            height,
        };
    }

    // Generate rooms
    for (let i = 0; i < numRooms; i++) {
        let attempts = 0;
        let newRoom;
        do {
            newRoom = generateRoom();
            attempts++;
        } while (isOverlapping(newRoom) && attempts < maxAttempts);

        if (attempts === maxAttempts) {
            console.log("Could not place all rooms without overlapping");
            break;
        }

        dungeonLayout.push(newRoom);
    }

    // Draw layout
    const canvas = document.getElementById("dungeonCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    ctx.strokeStyle = "#000"; // Set stroke color
    ctx.lineWidth = 2; // Set line width

    dungeonLayout.forEach((room) => {
        ctx.strokeRect(room.x, room.y, room.width, room.height); // Draw rooms as rectangles
    });
    // Draw rooms and corridors

    // Update canvas with layout
}

function saveImage() {}
