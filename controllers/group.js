const { Group, GroupMembers, User } = require("../models");

const getAllGroups = async (req, res) => {
  try {
    const user = req.user;
    const userId = req.userId;

    if (!userId || typeof userId !== "number") {
      return res.status(400).json({ error: "Invalid or missing user ID" });
    }

    const joinedGroups = await user.getMemberGroups({
      joinTableAttributes: ["role"],
    });

    return res.status(200).json({ joinedGroups });
  } catch (error) {
    console.error("Error fetching user groups:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllMembersOfAGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId);

    if (!group) return res.status(404).json({ message: "Group not found" });

    const groupMembers = await group.getMembers({
      through: { attributes: ["role"] },
      attributes: ["id", "name", "email"],
    });

    return res.status(200).json({ message: "Fetched members", groupMembers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteGroupMember = async (req, res) => {
  try {
    const { groupId, memberUserId } = req.params;

    const deleted = await GroupMembers.destroy({
      where: { groupId, userId: memberUserId },
    });

    if (!deleted) {
      return res.status(404).json({ message: "User not found in group" });
    }

    return res.status(200).json({ message: "User removed from group" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const addGroupAdmin = async (req, res) => {
  try {
    console.log("entered to make admin");
    const { groupId, adminUserId } = req.params;

    const result = await GroupMembers.update(
      { role: "admin" },
      { where: { groupId, userId: adminUserId } }
    );

    if (result[0] === 0) {
      return res
        .status(404)
        .json({ message: "User is not a member of the group" });
    }

    return res.status(200).json({ message: "User promoted to admin" });
  } catch (error) {
    console.error("Error promoting user to admin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createGroup = async (req, res) => {
  try {
    const { groupName, userIds, adminId } = req.body;
    const user = req.user;
    
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

    const memberIds = userIds.includes(adminId)
      ? userIds
      : [...userIds, adminId];

    const group = await user.createGroup({ name: groupName });

    const membersToInsert = memberIds.map((userId) => ({
      userId,
      groupId: group.id,
      role: userId === adminId ? "owner" : "member",
    }));

    await GroupMembers.bulkCreate(membersToInsert);

    const createdGroup = await Group.findOne({
      where: { id: group.id },
      include: {
        model: User,
        as: "members",
        through: { attributes: ["role"] },
        attributes: ["id", "name", "email"],
      },
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

module.exports = {
  createGroup,
  getAllGroups,
  getAllMembersOfAGroup,
  deleteGroupMember,
  addGroupAdmin,
};
