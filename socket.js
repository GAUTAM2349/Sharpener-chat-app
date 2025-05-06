const onlineUsers = {};

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    
    socket.on("joinRoom", ({ currGroup, userId }) => {
      console.log("Joining room:", currGroup, "User:", userId);
      socket.join(currGroup);

      if (!onlineUsers[currGroup]) {
        onlineUsers[currGroup] = [];
      }

      
      if (!onlineUsers[currGroup].some((u) => u.userId === userId)) {
        onlineUsers[currGroup].push({ userId, socketId: socket.id });
      }

      
      io.to(currGroup).emit("onlineUsers", onlineUsers[currGroup]);
    });

    
    socket.on("chatMessage", ({ roomId, message, sender }) => {
      console.log(" chat received ")
      const chat = {
        message,
        senderId:sender.id,
        createdAt: new Date(),
      };
      io.to(roomId).emit("chatMessage", chat);
    });

    
    socket.on("leaveRoom", (currGroup) => {
      console.log("Leaving room:", currGroup);
      socket.leave(currGroup);

      if (onlineUsers[currGroup]) {
        onlineUsers[currGroup] = onlineUsers[currGroup].filter(
          (u) => u.socketId !== socket.id
        );
        io.to(currGroup).emit("onlineUsers", onlineUsers[currGroup]);
      }
    });

    
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      for (const room in onlineUsers) {
        onlineUsers[room] = onlineUsers[room].filter(
          (u) => u.socketId !== socket.id
        );
        io.to(room).emit("onlineUsers", onlineUsers[room]);
      }
    });
  });
};
