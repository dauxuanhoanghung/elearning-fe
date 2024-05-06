import {
  child,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  onDisconnect,
  onValue,
  push,
  ref,
  update,
} from "firebase/database";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { database, getFirepad, setFirepadRef } from "@/app/firebase/config";
import { initializeListensers } from "@/app/peerConnection";
import { getStore } from "@/app/store";
import {
  addParticipant,
  removeParticipant,
  setMainStream,
  setUser,
  updateParticipant,
} from "@/app/store/roomSlice";
import MainStream from "@/components/stream/MainStream";

const defaultPreference = {
  audio: true,
  video: false,
  screen: false,
};

const StreamPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");

  const connectedRef = ref(database, ".info/connected");

  useEffect(() => {
    const initialize = () => {
      if (roomId !== null) {
        const itemRef = child(ref(database), roomId);
        update(itemRef, { roomId: roomId });
        setFirepadRef(itemRef);
      } else {
        navigate("/");
      }
    };

    initialize();
    return () => {
      setFirepadRef(ref(database));
    };
  }, [roomId]);

  const currentUser = useSelector((state) => state.user.user);
  const room = useSelector((state) => state.room);
  const userName = currentUser.firstName + " " + currentUser.lastName;
  const dispatch = useDispatch();

  const getUserStream = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    return localStream;
  };

  useEffect(() => {
    async function connect() {
      const stream = await getUserStream();
      stream.getVideoTracks()[0].enabled = false;

      // inside useEffect
      onValue(connectedRef, (snap) => {
        const participantRef = child(getFirepad(), "participants");
        dispatch(setMainStream({ mainStream: stream }));

        if (snap.val()) {
          const userStatusRef = push(participantRef, {
            userId: currentUser.id,
            userName: userName,
            preferences: defaultPreference,
          });
          // console.log({
          //   [userStatusRef.key]: { name: userName, ...defaultPreference },
          // });
          setTimeout(() => {
            dispatch(
              setUser({
                [userStatusRef.key]: { name: userName, ...defaultPreference },
              }),
            );
          }, 10);

          initializeListensers(userStatusRef.key, getStore());
          onDisconnect(userStatusRef).remove();
        }
      });
    }
    connect();
  }, []);

  const isUserSet = !!room.currentUser;
  const isStreamSet = !!room.mainStream;

  useEffect(() => {
    const participantRef = child(getFirepad(), "participants");
    if (isStreamSet && isUserSet) {
      onChildAdded(participantRef, (snap) => {
        const keyRef = child(participantRef, snap.key);
        const preferenceUpdateEvent = child(keyRef, "preferences");

        onChildChanged(preferenceUpdateEvent, (preferenceSnap) => {
          dispatch(
            updateParticipant({
              [snap.key]: {
                [preferenceSnap.key]: preferenceSnap.val(),
              },
            }),
          );
        });

        const { userName: name, preferences = {} } = snap.val();
        dispatch(
          addParticipant({
            [snap.key]: {
              name,
              ...preferences,
            },
          }),
        );
      });
      onChildRemoved(participantRef, (snap) => {
        dispatch(removeParticipant(snap.key));
      });
    }
  }, [isStreamSet, isUserSet]);

  return (
    <div className="stream-app">
      <MainStream />
    </div>
  );
};

export default StreamPage;
