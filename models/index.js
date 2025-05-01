// const User = require("./User");
// const Chat = require("./Chat");
// const Group  = require("./Group");
// const  GroupMembers  = require("./GroupMembers");

// User.hasMany(Chat, { foreignKey: "senderId" });
// Chat.belongsTo(User, { foreignKey: "senderId" });

// User.hasMany(Chat, { foreignKey: "receiverId" });
// Chat.belongsTo(User, { foreignKey: "receiverId" });

// Group.hasMany(Chat);
// Chat.belongsTo(Group);

// User.belongsToMany( Group, { through : GroupMembers });
// Group.belongsToMany( User, { through : GroupMembers });
// //admin

// Group.belongsTo( User, { foreignKey : "adminId"});
// User.hasMany( Group, { foreignKey : "adminId"});

// module.exports = { User, Chat, Group, GroupMembers };

const User = require("./User");
const Chat = require("./Chat");
const Group = require("./Group");
const GroupMembers = require("./GroupMembers");

// Chat relationships
// User.hasMany(Chat, { foreignKey: "senderId" });
// Chat.belongsTo(User, { foreignKey: "senderId" });

// // User.hasMany(Chat, { foreignKey: "receiverId" });
// // Chat.belongsTo(User, { foreignKey: "receiverId" });

// Group.hasMany(Chat);
// Chat.belongsTo(Group);

Group.hasMany(Chat, {
  foreignKey: "groupId",
  onDelete: "CASCADE"
});
Chat.belongsTo(Group, {
  foreignKey: "groupId"
});

// Each chat has a sender (user)
User.hasMany(Chat, { foreignKey: "senderId" });
Chat.belongsTo(User, { foreignKey: "senderId" });


// Member association (Many-to-Many)
User.belongsToMany(Group, {
  through: GroupMembers,
  as: "memberGroups", // Groups where this user is a member
});

Group.belongsToMany(User, {
  through: GroupMembers,
  as: "members", // Users who are members of this group
});

// Admin association (One-to-Many)
Group.belongsTo(User, {
  foreignKey: "adminId",
  as: "admin", // The user who created the group
});

User.hasMany(Group, {
  foreignKey: "adminId",
  as: "adminGroups", // Groups created by this user
});



module.exports = { User, Chat, Group, GroupMembers };
