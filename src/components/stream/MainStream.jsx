import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setMainStream, updateUser } from "@/app/store/roomSlice";
import { useSearchParams } from "react-router-dom";
import MeetingFooter from "./MeetingFooter";
import Participants from "./Participants";

const MainStream = () => {
  const room = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");

  const participantRef = useRef(room.participants);

  const onMicClick = (micEnabled) => {
    if (room.mainStream) {
      console.log("onMicClick");
      room.mainStream.getAudioTracks()[0].enabled = micEnabled;
      dispatch(updateUser({ currentUser: { audio: micEnabled } }));
    }
  };
  const onVideoClick = (videoEnabled) => {
    if (room.mainStream) {
      room.mainStream.getVideoTracks()[0].enabled = videoEnabled;
      dispatch(updateUser({ currentUser: { video: videoEnabled } }));
    }
  };

  useEffect(() => {
    participantRef.current = room.participants;
  }, [room.participants]);

  const updateStream = (stream) => {
    for (let key in participantRef.current) {
      const sender = participantRef.current[key];
      if (sender.currentUser) continue;
      const peerConnection = sender.peerConnection
        .getSenders()
        .find((s) => (s.track ? s.track.kind === "video" : false));
      peerConnection.replaceTrack(stream.getVideoTracks()[0]);
    }
    dispatch(setMainStream({ mainStream: stream }));
  };

  const onScreenShareEnd = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    localStream.getVideoTracks()[0].enabled = Object.values(
      room.currentUser,
    )[0].video;

    updateStream(localStream);
    dispatch(updateUser({ currentUser: { screen: false } }));
  };

  const onScreenClick = async () => {
    let mediaStream;
    if (navigator.getDisplayMedia) {
      mediaStream = await navigator.getDisplayMedia({ video: true });
    } else if (navigator.mediaDevices.getDisplayMedia) {
      mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
    } else {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { mediaSource: "screen" },
      });
    }

    mediaStream.getVideoTracks()[0].onended = onScreenShareEnd;

    updateStream(mediaStream);
    dispatch(updateUser({ currentUser: { screen: true } }));
  };

  return (
    <div className="w-full" data-role="main-stream">
      <div className="h-[90vh] w-full" data-role="participants">
        <Participants />
      </div>

      <div className="h-[10vh]" data-role="footer">
        <MeetingFooter
          onScreenClick={onScreenClick}
          onMicClick={onMicClick}
          onVideoClick={onVideoClick}
          roomId={roomId}
        />
      </div>
    </div>
  );
};

export default MainStream;
