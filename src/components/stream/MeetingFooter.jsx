import { clearRoomState } from "@/app/store/roomSlice";
import classNames from "classnames";
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  PhoneOff,
  ScreenShare,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const MeetingFooter = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const onQuitClick = () => {
    dispatch(clearRoomState());

    navigate("/");
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
      <div
        className="m-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white"
        onClick={onQuitClick}
      >
        <PhoneOff />
      </div>
    </div>
  );
};

export default MeetingFooter;
