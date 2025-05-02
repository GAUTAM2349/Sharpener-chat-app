const { Group, GroupMembers, User } = require("../models");

const getAllGroups = async (req, res) => {
  console.log("\n\nyes came to get all groups \n\n");
  try {
    const user = req.user;
    const userId = req.userId;

    // Check if userId is present
    if (!userId || typeof userId !== "number") {
      return res.status(400).json({ error: "Invalid or missing user ID" });
    }

    const joinedGroups = await user.getMemberGroups();
    console.log(JSON.stringify(joinedGroups));

    // If no group memberships found
    if (!joinedGroups || joinedGroups.length === 0) {
      return res
        .status(200)
        .json({ message: "No group memberships found", groups: [] });
    }

    // Extract and filter group data
    const groups = joinedGroups.map((entry) => entry.group);

    res.status(200).json({ joinedGroups });
  } catch (error) {
    console.error("Error fetching user groups:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createGroup = async (req, res) => {
  try {
    const { groupName, userIds, adminId } = req.body;

    if (
      !groupName ||
      !adminId ||
      !Array.isArray(userIds) ||
      userIds.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Group name, adminId, and userIds are required." });
    }

    // Ensure admin is part of the group
    const memberIds = userIds.includes(adminId)
      ? userIds
      : [...userIds, adminId];

    // Create the group
    const group = await Group.create({
      name: groupName,
      adminId,
    });

    // Prepare and insert group members
    const membersToInsert = memberIds.map((userId) => ({
      userId,
      groupId: group.id,
    }));

    await GroupMembers.bulkCreate(membersToInsert);

    // Fetch full group details including members and admin
    const createdGroup = await Group.findOne({
      where: { id: group.id },
      include: [
        {
          model: User,
          as: "members", // This MUST match your belongsToMany `as`
          through: { attributes: [] },
          attributes: ["id", "name", "email"],
        },
        {
          model: User,
          as: "admin", // This MUST match your belongsTo `as`
          attributes: ["id", "name"],
        },
      ],
    });

    return res.status(201).json({
      message: "Group created successfully",
      group: createdGroup,
    });
  } catch (error) {
    console.error("Error creating group:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { createGroup, getAllGroups };
