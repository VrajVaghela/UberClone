const { Server } = require('socket.io');
const userModel = require('./models/user.model')
const captainModel = require('./models/captain.model')

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            console.log(`User ${userId} joined as ${userType}`);

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                })
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        })

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' })
            }

            try {
                const updatedCaptain = await captainModel.findByIdAndUpdate(
                    userId,
                    {
                        location: {
                            ltd: location.ltd,
                            lng: location.lng
                        }
                    },
                    { new: true, runValidators: true }
                );

                if (!updatedCaptain) {
                    return socket.emit('error', { message: 'Captain not found' });
                }

                // console.log('Location updated for captain:', updatedCaptain._id, 'New location:', updatedCaptain.location);
                socket.emit('location-updated', { success: true });
            } catch (error) {
                console.error('Error updating captain location:', error);
                socket.emit('error', { message: 'Failed to update location' });
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
}


function sendMessageToSocketId(socketId, messageObject) {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };