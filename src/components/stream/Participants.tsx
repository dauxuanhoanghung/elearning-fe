// @ts-nocheck
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/app/store";
import Participant from "./Participant";

const Participants: React.FC = () => {
  const videoRef = useRef(null);
  const room = useSelector((state: RootState) => state.room);
  const currentUser = room.currentUser
    ? Object.values(room.currentUser)[0]
    : null;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = room.mainStream;
      videoRef.current.muted = true;
    }
  }, [room.currentUser, room.mainStream]);

  let participantKey = Object.keys(room.participants);
  let gridCol =
    participantKey.length === 1 ? 1 : participantKey.length <= 4 ? 2 : 4;
  const gridColSize = participantKey.length <= 4 ? 1 : 2;
  let gridRowSize =
    participantKey.length <= 4
      ? participantKey.length
      : Math.ceil(participantKey.length / 2);

  const screenPresenter = participantKey.find((element) => {
    const currentParticipant = room.participants[element];
    return currentParticipant.screen;
  });

  if (screenPresenter) {
    gridCol = 1;
    gridRowSize = 2;
  }

  return (
    <div
      className={`grid h-full md:grid-cols-${gridCol} gap-5 p-2.5 grid-cols-${gridColSize} grid-rows-${gridColSize}`}
    >
      {participantKey.map((element, index: number) => {
        const currentParticipant = room.participants[element];
        const isCurrentUser = currentParticipant.currentUser;
        if (isCurrentUser) {
          return null;
        }
        const pc: RTCPeerConnection = currentParticipant.peerConnection;
        const remoteStream: MediaStream = new MediaStream();
        let currentIndex: number = index;
        if (pc) {
          pc.ontrack = (event: RTCTrackEvent) => {
            event?.streams[0].getTracks().forEach((track) => {
              remoteStream.addTrack(track);
            });
            const videoEle = document.getElementById(
              "participantVideo" + currentIndex,
            );
            if (videoEle && videoEle instanceof HTMLVideoElement) {
              videoEle.srcObject = remoteStream;
            }
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
