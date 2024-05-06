import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Participant from "./Participant";

const Participants = () => {
  const videoRef = useRef(null);
  const room = useSelector((state) => state.room);
  const currentUser = room.currentUser ? room.currentUser : null;

  useEffect(() => {
    if (videoRef.current) {
      console.log("videoRef", { ...room });
      videoRef.current.srcObject = room.mainStream;
      videoRef.current.muted = true;
    }
  }, [room.currentUser, room.mainStream]);

  let participantKey = Object.keys(room.participants);
  console.log("participantKey", participantKey);
  let gridCol =
    participantKey.length === 1 ? 1 : participantKey.length <= 4 ? 2 : 4;
  const gridColSize = participantKey.length <= 4 ? 1 : 2;
  let gridRowSize =
    participantKey.length <= 4
      ? participantKey.length
      : Math.ceil(participantKey.length / 2);

  const screenPresenter = participantKey.find((element) => {
    const currentParticipant = room.participants[element];
    console.log("screenPresenter", currentParticipant);
    return currentParticipant.screen;
  });

  if (screenPresenter) {
    gridCol = 1;
    gridRowSize = 2;
  }

  return (
    <div
      className={`gridcol grid h-full grid-cols-${gridCol} gap-5 p-2.5 md:grid-cols-${gridColSize} md:grid-rows-${gridColSize}`}
    >
      {participantKey.map((element, index) => {
        const currentParticipant = room.participants[element];
        const isCurrentUser = currentParticipant.currentUser;
        if (isCurrentUser) {
          return null;
        }
        const pc = currentParticipant.peerConnection;
        const remoteStream = new MediaStream();
        let currentIndex = index;
        if (pc) {
          pc.ontrack = (event) => {
            event?.streams[0].getTracks().forEach((track) => {
              remoteStream.addTrack(track);
            });
            const videElement = document.getElementById(
              `participantVideo${currentIndex}`,
            );
            if (videElement) videElement.srcObject = remoteStream;
          };
        }

        return (
          <Participant
            key={currentIndex}
            currentParticipant={currentParticipant}
            currentIndex={currentIndex}
            hideVideo={screenPresenter && screenPresenter !== element}
            showAvatar={
              !currentParticipant.video &&
              !currentParticipant.screen &&
              currentParticipant.name
            }
          />
        );
      })}
      <Participant
        currentParticipant={currentUser}
        currentIndex={participantKey.length}
        hideVideo={screenPresenter && !currentUser.screen}
        videoRef={videoRef}
        showAvatar={currentUser && !currentUser.video && !currentUser.screen}
        currentUser={true}
      />
    </div>
  );
};

export default Participants;
