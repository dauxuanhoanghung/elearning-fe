import {
  Unsubscribe,
  child,
  onChildAdded,
  push,
  set,
  update,
} from "firebase/database";

import { getFirepad } from "./firebase/config";

export const updatePreference = (userId: any, preference: any) => {
  const participantRef = child(getFirepad(), "participants");
  const currentParticipantRef = child(participantRef, userId + "/preferences");
  update(currentParticipantRef, preference);
};

export const createOffer = async (
  peerConnection: any,
  receiverId: any,
  createdID: any,
) => {
  const participantRef = child(getFirepad(), "participants");
  const currentParticipantRef = child(participantRef, receiverId);
  peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
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

const setRemoteDescription = async (pc, data, userId, store) => {
  try {
    // Check if there's an existing remote description
    const currentRemoteDescription = pc.remoteDescription;

    if (currentRemoteDescription) {
      // If there's an existing remote description, we need to handle renegotiation
      console.log("Existing remote description found. Handling renegotiation.");

      // Create a new offer based on the current state
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Now set the remote description
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
    } else {
      // If there's no existing remote description, proceed as normal
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
    }

    await createAnswer(data.offer.userId, userId, store);
  } catch (error) {
    console.error("Error in setRemoteDescription:", error);
    throw error;
  }
};

// Utility function for retrying with exponential backoff
const retryWithBackoff = async (fn, maxRetries, baseDelay = 100) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      const delay = baseDelay * Math.pow(2, i);
      console.log(`Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

export const initializeListensers = async (userId: any, store: any) => {
  const participantRef = child(getFirepad(), "participants");
  const currentUserRef = child(participantRef, userId);
  console.log("initializeListensers", currentUserRef);
  let offerUnsub: Unsubscribe,
    offerCandidatesUnsub: Unsubscribe,
    answerUnsub: Unsubscribe,
    answerCandidatesUnsub: Unsubscribe;

  offerUnsub = await onChildAdded(
    child(currentUserRef, "offers"),
    async (snapshot) => {
      const data = snapshot.val();
      console.log({ data });
      if (data?.offer) {
        /**
         * {
            "sdp": "..."
            "type": "offer",
            "userId": "-NxDrK9GWdz0CVfo89QZ"
          }
        */
        console.log("answer", { ...data.offer });
        const room = store.getState().room;
        const offerUserId = data.offer.userId;

        if (!room.participants[offerUserId]) {
          console.error("Participant not found for userId:", offerUserId);
          return;
        }
        const pc = room.participants[data.offer.userId].peerConnection;

        if (!pc) {
          console.error("PeerConnection not found for userId:", offerUserId);
          return;
        }

        try {
          await setRemoteDescription(pc, data, userId, store);
          return;
        } catch (error) {
          console.error("Error setting remote description:", error);
          // Implement a retry mechanism with backoff
          await retryWithBackoff(
            () => setRemoteDescription(pc, data, userId, store),
            10,
          );
        }

        try {
          await setRemoteDescription(pc, data, userId, store);
        } catch (error) {
          console.error("Error setting remote description --- ", error);
          await setRemoteDescription(pc, data, userId, store);
        }
        // await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
        // await createAnswer(data.offer.userId, userId, store);
      }
    },
  );

  offerCandidatesUnsub = onChildAdded(
    child(currentUserRef, "offerCandidates"),
    (snapshot) => {
      const data = snapshot.val();
      if (data?.userId) {
        const room = store.getState().room;
        const pc = room.participants[data.userId].peerConnection;
        pc.addIceCandidate(new RTCIceCandidate(data));
      }
    },
  );

  answerUnsub = onChildAdded(child(currentUserRef, "answers"), (snapshot) => {
    const data = snapshot.val();
    if (data?.answer) {
      const room = store.getState().room;
      const pc = room.participants[data.answer.userId].peerConnection;
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
    }
  });

  answerCandidatesUnsub = onChildAdded(
    child(currentUserRef, "answerCandidates"),
    (snapshot) => {
      const data = snapshot.val();
      if (data?.userId) {
        const room = store.getState().room;
        const pc = room.participants[data.userId].peerConnection;
        pc.addIceCandidate(new RTCIceCandidate(data));
      }
    },
  );

  return {
    offerUnsub,
    offerCandidatesUnsub,
    answerUnsub,
    answerCandidatesUnsub,
  };
};

const createAnswer = async (otherUserId: any, userId: any, store: any) => {
  const participantRef = child(getFirepad(), "participants");
  const room = store.getState().room;
  const pc = room.participants[otherUserId].peerConnection;
  const participantRef1 = child(participantRef, otherUserId);

  pc.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
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
