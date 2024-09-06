import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/Chat.js";
import { User } from "../models/user.js";
import { emitEvent } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

// Create a new group chat
const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  if (members.length < 2)
    return next(
      new ErrorHandler("Group chat must have at least 2 members", 400)
    );

  const allMembers = [...members, req.user];

  await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });

  emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);

  emitEvent(req, REFETCH_CHATS, members);

  return res.status(201).json({
    success: true,
    message: "Group created",
  });
});

// Get all the chats of the logged in user
const getMyChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({ members: req.user }).populate(
    "members",
    "name username avatar"
  );

  const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
    const otherMember = getOtherMember(members, req.user);

    return {
      _id,
      groupChat,
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar.url)
        : [otherMember.avatar.url],
      name: groupChat ? name : otherMember.name,
      members: members.reduce((prev, curr) => {
        if (curr._id.toString() !== req.user.toString()) {
          prev.push(curr._);
        }
        return prev;
      }, []),
    };
  });

  return res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

// Get all the groups created by the logged in user
const getMyGroups = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    members: req.user,
    groupChat: true,
    creator: req.user,
  }).populate("members", "name avatar");

  const groups = chats.map(({ members, name, _id, groupChat }) => ({
    _id,
    groupChat,
    name,
    avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
  }));

  return res.status(200).json({
    success: true,
    groups,
  });
});

// Add members to a group chat
const addmembers = TryCatch(async (req, res, next) => {
  const { chatId, members } = req.body;

  if (!members || members.length < 1)
    return next(new ErrorHandler("Please provide members to add", 400));

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));

  if (chat.creator.toString() !== req.user.toString())
    return next(new ErrorHandler("You are not allowed to add members", 403));

  const allNewMembersPromise = members.map((i) => User.findById(i, "name"));

  const allNewMembers = await Promise.all(allNewMembersPromise);

  const uniqueMembers = allNewMembers
    .filter((i) => !chat.members.includes(i._id.toString()))
    .map((i) => i._id);

  chat.members.push(...uniqueMembers.map((i) => i._id));

  if (chat.members.length > 100)
    return next(new ErrorHandler("Group members limit reached", 400));

  await chat.save();

  const allUserName = allNewMembers.map((i) => i.name).join(",");

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${allUserName} has been added to the group`
  );

  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Members added successfully",
  });
});

// Remove a member from a group chat
const removeMember = TryCatch(async (req, res, next) => {
  const { userId, chatId } = req.body;

  const [chat, userThatWillBeRemoved] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
  ]);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));

  if (chat.creator.toString() !== req.user.toString())
    return next(new ErrorHandler("You are not allowed to remove members", 403));

  if (chat.members.length <= 3)
    return next(new ErrorHandler("Group must have at least 3 members", 400));

  chat.members = chat.members.filter((member) => member.toString() !== userId);

  await chat.save();

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${userThatWillBeRemoved.name} has been removed from the group`
  );

  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Member removed successfully",
  });
});

// Leave a group chat
const leaveGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));

  const remainingMembers = chat.members.filter(
    (member) => member.toString() !== req.user.toString()
  );

  if (remainingMembers.length < 3)
    return next(new ErrorHandler("Group must have at least 3 members", 400));

  if (chat.creator.toString() === req.user.toString()) {
    const randomElement = Math.floor(Math.random() * remainingMembers.length);

    const newCreator = remainingMembers[randomElement];

    chat.creator = newCreator;

    chat.members = remainingMembers;
  }

  chat.members = remainingMembers;

  const [user] = await Promise.all([
    User.findById(req.user, "name"),
    chat.save(),
  ]);
  await chat.save();

  emitEvent(req, ALERT, chat.members, `User ${user.name} has left the group`);

  return res.status(200).json({
    success: true,
    message: "You left the Group",
  });
});

export {
  addmembers,
  getMyChats,
  getMyGroups,
  newGroupChat,
  removeMember,
  leaveGroup,
};
