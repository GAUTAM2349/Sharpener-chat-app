const User = require("./User");
const Chat = require("./Chat");

User.hasMany(Chat, { foreignKey: "senderId" });
User.hasMany(Chat, { foreignKey: "receiverId" });
Chat.belongsTo(User, { foreignKey: "senderId" });
Chat.belongsTo(User, { foreignKey: "receiverId" });

module.exports = { User, Chat };
