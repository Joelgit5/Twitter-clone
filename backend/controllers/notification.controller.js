import Notification from "../models/notification.model.js";

// PATH     : /api/notifications
// METHOD   : GET
// ACCESS   : PUBLIC
// DESC     : Get Notifications
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ to: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "from",
        select: "username profileImg",
      });

    await Notification.updateMany({ to: userId }, { read: true });

    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in getNotification Controller", error.message);
    res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/notifications"
// METHOD   : DELETE
// ACCESS   : PUBLIC
// DESC     : Delete Notifications
export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    // Delete all notifications for the user
    await Notification.deleteMany({ to: userId });

    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNotification Controller", error.message);
    res.status(500).json({ error: error.message });
  }
};
