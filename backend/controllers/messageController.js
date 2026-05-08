import Message from "../models/Message.js";

export async function createMessage(req, res) {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        message: "Name and birthday message are required."
      });
    }

    const newMessage = await Message.create({
      name,
      message
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Create message error:", error);

    res.status(500).json({
      message: "Failed to save birthday message."
    });
  }
}

export async function getMessages(req, res) {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("Get messages error:", error);

    res.status(500).json({
      message: "Failed to fetch birthday messages."
    });
  }
}