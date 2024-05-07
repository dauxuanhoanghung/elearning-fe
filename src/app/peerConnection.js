import { child, onChildAdded, push, set, update } from "firebase/database";

import { getFirepad } from "./firebase/config";

export const updatePreference = (userId, preference) => {
  const participantRef = child(getFirepad(), "participants");
  const currentParticipantRef = child(participantRef, userId + "/preferences");
  update(currentParticipantRef, preference);
};

export const createOffer = async (peerConnection, receiverId, createdID) => {
  const participantRef = child(getFirepad(), "participants");
  const currentParticipantRef = child(participantRef, receiverId);
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      const offerCandidatesRef = child(
        currentParticipantRef,
        "offerCandidates",
      );
      const candidateData = {
        ...event.candidate.toJSON(),
        userId: createdID,
      };
      update(offerCandidatesRef, candidateData);
    }
  };

  const offerDescription = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
    userId: createdID,
  };

  // ...
  const offersRef = child(currentParticipantRef, "offers");
  const newOfferRef = push(offersRef);

  await set(newOfferRef, { offer });
};

export const initializeListensers = async (userId, store) => {
  const participantRef = child(getFirepad(), "participants");
  const currentUserRef = child(participantRef, userId);
  console.log("initializeListensers", currentUserRef);

  onChildAdded(child(currentUserRef, "offers"), async (snapshot) => {
    const data = snapshot.val();
    if (data?.offer) {
      /**
       * {
          "sdp": "..."
          "type": "offer",
          "userId": "-NxDrK9GWdz0CVfo89QZ"
        }
       */
      const room = store.getState().room;
      const pc = room.participants[data.offer.userId].peerConnection;
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
      await createAnswer(data.offer.userId, userId, store);
    }
  });

  onChildAdded(child(currentUserRef, "offerCandidates"), (snapshot) => {
    const data = snapshot.val();
    if (data?.userId) {
      const room = store.getState().room;
      const pc = room.participants[data.userId].peerConnection;
      pc.addIceCandidate(new RTCIceCandidate(data));
    }
  });

  onChildAdded(child(currentUserRef, "answers"), (snapshot) => {
    const data = snapshot.val();
    if (data?.answer) {
      const room = store.getState().room;
      const pc = room.participants[data.answer.userId].peerConnection;
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
    }
  });

  onChildAdded(child(currentUserRef, "answerCandidates"), (snapshot) => {
    const data = snapshot.val();
    if (data?.userId) {
      const room = store.getState().room;
      const pc = room.participants[data.userId].peerConnection;
      pc.addIceCandidate(new RTCIceCandidate(data));
    }
  });
};

const createAnswer = async (otherUserId, userId, store) => {
  const participantRef = child(getFirepad(), "participants");
  const room = store.getState().room;
  const pc = room.participants[otherUserId].peerConnection;
  const participantRef1 = child(participantRef, otherUserId);

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      push(child(participantRef1, "answerCandidates"), {
        ...event.candidate.toJSON(),
        userId: userId,
      });
    }
  };

  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
    userId: userId,
  };

  const answerRef = push(child(participantRef1, "answers"));
  await set(answerRef, { answer });
};
