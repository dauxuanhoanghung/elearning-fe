import classNames from "classnames";
import { MicOff } from "lucide-react";
import React from "react";

const Participant: React.FC<ParticipantProps> = (props) => {
  const {
    currentIndex,
    currentParticipant,
    hideVideo,
    videoRef,
    showAvatar,
    currentUser,
  } = props;
  if (!currentParticipant) return <></>;

  return (
    <div
      data-user={currentUser ? "currentUser" : "invitedUser"}
      className={classNames(
        "relative h-full max-h-[90vh] min-h-[200px] w-full rounded-md bg-gray-900",
        { hidden: hideVideo },
      )}
      data-role="participant"
    >
      <div className="flex h-full items-center justify-center rounded-xl">
        <video
          ref={videoRef}
          className="relative h-full w-full rounded-md object-cover"
          id={`participantVideo${currentIndex}`}
          autoPlay
          playsInline
        ></video>
        {!currentParticipant.audio && (
          <MicOff className="absolute right-3 top-3 rounded-full bg-red-500 p-1" />
        )}
        {showAvatar && (
          <div
            style={{ background: currentParticipant.avatarColor }}
            className="absolute flex h-[200px] w-[200px] items-center justify-center rounded-full text-[150px] uppercase"
          >
            {currentParticipant.name?.[0]}
          </div>
        )}
        <div className="absolute bottom-3 left-5 text-white">
          {currentParticipant.name}
          {currentUser ? "(You)" : ""}
        </div>
      </div>
    </div>
  );
};

export default Participant;
