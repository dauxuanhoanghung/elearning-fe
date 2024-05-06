import classNames from "classnames";
import { Camera, CameraOff, Mic, MicOff, ScreenShare } from "lucide-react";
import React, { useEffect, useState } from "react";

const MeetingFooter = (props) => {
  const [streamState, setStreamState] = useState({
    mic: true,
    video: false,
    screen: false,
  });

  const micClick = () => {
    setStreamState((prev) => ({
      ...prev,
      mic: !prev.mic,
    }));
  };

  const onVideoClick = () => {
    setStreamState((prev) => ({
      ...prev,
      video: !prev.video,
    }));
  };

  const onScreenClick = () => {
    props.onScreenClick(setScreenState);
  };

  const setScreenState = (isEnabled) => {
    setStreamState((prev) => ({
      ...prev,
      screen: isEnabled,
    }));
  };

  useEffect(() => {
    props.onMicClick(streamState.mic);
  }, [streamState.mic]);
  useEffect(() => {
    props.onVideoClick(streamState.video);
  }, [streamState.video]);

  return (
    <div className="flex h-full items-center justify-center bg-gray-900">
      <div
        className={classNames(
          "m-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-800 text-white",
          {
            "bg-red-500": !streamState.mic,
          },
        )}
        onClick={micClick}
      >
        {streamState.mic ? <Mic /> : <MicOff />}
      </div>
      <div
        className={classNames(
          "m-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-800 text-white",
          {
            "bg-red-500": !streamState.video,
          },
        )}
        onClick={onVideoClick}
      >
        {streamState.video ? <Camera /> : <CameraOff />}
      </div>
      <div
        className="m-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-800 text-white"
        onClick={onScreenClick}
        disabled={streamState.screen}
      >
        <ScreenShare />
      </div>
    </div>
  );
};

export default MeetingFooter;
