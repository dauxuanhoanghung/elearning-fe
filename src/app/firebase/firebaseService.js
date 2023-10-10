import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "./config";
import PropTypes from "prop-types";

const firebaseService = {
  async addDocument(collectionName, body) {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...body,
        createdAt: serverTimestamp(),
      });
      console.log("Collection: ", collectionName, " docRef: ", docRef.id);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  },

  async getUsersHaveChatWithCurrentUser(currentUserId) {
    try {
      const interactedUserIds = [-1];
      const messagesRef = collection(db, "messages");
      const sentMessagesSnapshot = await getDocs(
        query(messagesRef, where("senderId", "==", currentUserId))
      );

      sentMessagesSnapshot.forEach((messageDoc) => {
        const recipientId = messageDoc.data().recipientId;
        if (!interactedUserIds.includes(recipientId)) {
          interactedUserIds.push(recipientId);
        }
      });
      doc(messagesRef);
      // Query for messages where the current user is the recipient
      const receivedMessagesSnapshot = await getDocs(
        query(
          messagesRef,
          where("recipientId", "==", currentUserId),
          where("senderId", "not-in", interactedUserIds)
        )
      );

      receivedMessagesSnapshot.forEach((messageDoc) => {
        const senderId = messageDoc.data().senderId;
        interactedUserIds.push(senderId);
      });

      // Query for user documents for the interacted user IDs
      const usersSnapshot = await getDocs(
        query(collection(db, "users"), where("id", "in", interactedUserIds))
      );

      const userResults = [];
      // Users who chatted with the current user
      usersSnapshot.forEach((userDoc) => {
        const userData = userDoc.data();
        userResults.push(userData);
      });
      console.log(userResults);
      return userResults;
    } catch (error) {
      console.error("Error getting users:", error);
    }
  },
};

firebaseService.addDocument.propTypes = {
  collectionName: PropTypes.string.isRequired,
  body: PropTypes.object.isRequired,
};

export default firebaseService;
