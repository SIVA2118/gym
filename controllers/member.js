import Member from "../models/Member.js";

// Create
export const createMember = async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All
export const getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findOne({ id: req.params.id });
    if (!member) return res.status(404).json({ error: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateMember = async (req, res) => {
  try {
    const member = await Member.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!member) return res.status(404).json({ error: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
export const deleteMember = async (req, res) => {
  try {
    const member = await Member.findOneAndDelete({ id: req.params.id });
    if (!member) return res.status(404).json({ error: "Member not found" });
    res.json({ message: "Member deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
