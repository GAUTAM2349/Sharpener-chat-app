const User = require("./User");
const Chat = require("./Chat");
const Group = require("./Group");
const GroupMembers = require("./GroupMembers");

Group.hasMany(Chat, {
  foreignKey: "groupId",
  onDelete: "CASCADE",
});
Chat.belongsTo(Group, { foreignKey: "groupId" });

User.hasMany(Chat, { foreignKey: "senderId" });
Chat.belongsTo(User, { foreignKey: "senderId" });

User.hasMany(Group, { foreignKey: "ownerId" });
Group.belongsTo(User, { foreignKey: "ownerId" });


User.belongsToMany(Group, {
  through: GroupMembers,
  as: "memberGroups",
});

Group.belongsToMany(User, {
  through: GroupMembers,
  as: "members",
});

module.exports = { User, Chat, Group, GroupMembers };
