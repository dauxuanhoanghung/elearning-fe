import { addDoc, collection, serverTimestamp } from "firebase/firestore";
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
};

firebaseService.addDocument.propTypes = {
  collectionName: PropTypes.string.isRequired,
  body: PropTypes.object.isRequired,
};

export default firebaseService;
