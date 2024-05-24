import admin from "firebase-admin";
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

// Khởi tạo Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const deleteUsersFirebase = async (req, res) => {
  const { uids } = req.body; // Giả định rằng mảng UID được gửi trong body của request

  if (!Array.isArray(uids)) {
    return res.status(400).json({ error: "uids must be an array" });
  }

  try {
    const deletePromises = uids.map((uid) => admin.auth().deleteUser(uid));
    await Promise.all(deletePromises);

    console.log("Successfully deleted users");
    res.status(200).json({ message: "Users deleted" });
  } catch (error) {
    console.error("Error deleting users:", error);
    res.status(500).json({ error: error.message });
  }
};
