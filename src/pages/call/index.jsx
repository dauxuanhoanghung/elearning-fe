import {
  child,
  goOnline,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  onDisconnect,
  onValue,
  push,
  ref,
  update,
} from "firebase/database";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { database, getFirepad, setFirepadRef } from "@/app/firebase/config";
import { initializeListensers } from "@/app/peerConnection";
import { store } from "@/app/store";
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

  // Track the local media stream
  const localStreamRef = useRef(null);

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
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        localStreamRef.current = null;
      }
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
    // Store the local stream in the ref
    localStreamRef.current = localStream;
    return localStream;
  };

  useEffect(() => {
    async function connect() {
      const stream = await getUserStream();
      stream.getVideoTracks()[0].enabled = false;
      dispatch(setMainStream({ mainStream: stream }));
      goOnline(database);

      // inside useEffect
      onValue(connectedRef, (snap) => {
        const participantRef = child(getFirepad(), "participants");
        const userStatusRef = push(participantRef, {
          userId: currentUser.id,
          userName: userName,
          preferences: defaultPreference,
        });
        dispatch(
          setUser({
            [userStatusRef.key]: { name: userName, ...defaultPreference },
          }),
        );

        if (snap.val()) {
          initializeListensers(userStatusRef.key, store);
          onDisconnect(userStatusRef).remove();
        }
      });
    }
    connect();
  }, []);

  const isUserSet = !!room.currentUser;
  const isStreamSet = !!room.mainStream;

  const participantRef = child(getFirepad(), "participants");
  useEffect(() => {
    if (isStreamSet && isUserSet) {
      onChildAdded(participantRef, (snap) => {
        const preferUpdate = child(participantRef, snap.key + "/preferences");
        onChildChanged(preferUpdate, (preferenceSnap) => {
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
  }, [room.currentUser, room.mainStream]);

  return (
    <div className="stream-app">
      <MainStream />
    </div>
  );
};

export default StreamPage;
