import Group from '../models/groupModel.js';
import User from '../models/userModel.js';
import Task from '../models/taskModel.js'; // make sure this is at the top
export const createGroup = async (req, res) => {
  const { name } = req.body;
  const generateJoinCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

  if (!name) return res.status(400).json({ message: 'Group name is required' });

  const group = new Group({
    name,
    owner: req.user._id,
    members: [req.user._id],
    joinCode: generateJoinCode()
  });  

  const createdGroup = await group.save();
  
  res.status(201).json(createdGroup);
};
export const joinGroupByCode = async (req, res) => {
  const { code } = req.body;

  const group = await Group.findOne({ joinCode: code });
  if (!group) return res.status(404).json({ message: 'Invalid code' });

  if (!group.members.includes(req.user._id)) {
    group.members.push(req.user._id);
    await group.save();
  }

  const populatedGroup = await Group.findById(group._id)
  .populate('owner', 'name email')
  .populate('members', 'name email');

res.json({ message: 'Joined group successfully', group: populatedGroup });

};

export const getMyGroups = async (req, res) => {
  const groups = await Group.find({ members: req.user._id })
    .populate('owner', 'name email')
    .populate('members', 'name email');

  res.json(groups);
};
export const getOwnedGroups = async (req, res) => {
  const groups = await Group.find({ owner: req.user._id })
    .populate('members', 'name email');

  res.json(groups);
};

export const inviteToGroup = async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.body;

  const group = await Group.findById(groupId);
  if (!group) return res.status(404).json({ message: 'Group not found' });

  if (!group.owner.equals(req.user._id)) {
    return res.status(403).json({ message: 'Only owner can invite users' });
  }

  if (!group.members.includes(userId)) {
    group.members.push(userId);
    await group.save();
  }

  res.json(group);
};

export const removeFromGroup = async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.body;

  const group = await Group.findById(groupId);
  if (!group) return res.status(404).json({ message: 'Group not found' });

  // Only the owner can remove members
  if (!group.owner.equals(req.user._id)) {
    return res.status(403).json({ message: 'Only the owner can remove users' });
  }

  // Prevent removing the owner themselves
  if (userId === req.user._id.toString()) {
    return res.status(400).json({ message: 'Owner cannot remove themselves from the group' });
  }

  // Check if user is in the group
  if (!group.members.includes(userId)) {
    return res.status(400).json({ message: 'User is not a member of the group' });
  }

  // Remove the user
  group.members = group.members.filter((member) => member.toString() !== userId);
  await group.save();

  res.json({ message: 'User removed from group', group });
};


export const deleteGroup = async (req, res) => {
  const group = await Group.findById(req.params.groupId);

  if (!group) return res.status(404).json({ message: 'Group not found' });

  if (!group.owner.equals(req.user._id)) {
    return res.status(403).json({ message: 'Only owner can delete this group' });
  }

  await group.deleteOne();
  res.json({ message: 'Group deleted' });
};


export const getGroupDetailsWithTasks = async (req, res) => {
  try {
    const groupId = req.params.id;

    const group = await Group.findById(groupId)
      .populate('owner', 'name email')
      .populate('members', 'name email');

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const tasks = await Task.find({ group: groupId })
      .populate('completedBy', 'name email')
      .populate('owner', 'name email');

    res.json({ group, tasks });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch group details', error: error.message });
  }
};