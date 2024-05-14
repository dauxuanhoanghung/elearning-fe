// @ts-nocheck
import classNames from "classnames";
import { goOffline } from "firebase/database";
import {
  Camera,
  CameraOff,
  Copy,
  Mic,
  MicOff,
  PhoneOff,
  ScreenShare,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { database } from "@/app/firebase/config";
import { clearRoomState } from "@/app/store/roomSlice";

interface MeetingFooterProps {
  roomId: string;
  onMicClick: (isEnabled: boolean) => void;
  onVideoClick: (isEnabled: boolean) => void;
  onScreenClick: () => void;
}

const MeetingFooter: React.FC<MeetingFooterProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [streamState, setStreamState] = useState<{
    mic: boolean;
    video: boolean;
    screen: boolean;
  }>({
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

  const setScreenState = (isEnabled: boolean) => {
    setStreamState((prev) => ({
      ...prev,
      screen: isEnabled,
    }));
  };

  const onQuitClick = async () => {
    dispatch(clearRoomState({}));
    goOffline(database);

    navigate("/meeting");
    window.location.reload();
  };
  const onCopyId = () => {
    navigator.clipboard.writeText(props.roomId);
  };

  useEffect(() => {
    props.onMicClick(streamState.mic);
  }, [streamState.mic]);
  useEffect(() => {
    props.onVideoClick(streamState.video);
  }, [streamState.video]);

  return (
    <div className="flex h-full items-center justify-center bg-gray-900">
      <button
        className={classNames(
          "m-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-800 text-white",
          {
            "bg-red-500": !streamState.mic,
          },
        )}
        onClick={micClick}
      >
        {streamState.mic ? <Mic /> : <MicOff />}
      </button>
      <button
        className={classNames(
          "m-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-800 text-white",
          {
            "bg-red-500": !streamState.video,
          },
        )}
        onClick={onVideoClick}
      >
        {streamState.video ? <Camera /> : <CameraOff />}
      </button>
      <button
        className="m-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-800 text-white"
        onClick={onScreenClick}
        disabled={streamState.screen}
      >
        <ScreenShare />
      </button>
      <button
        className="m-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-800 text-white"
        onClick={onCopyId}
      >
        <Copy />
      </button>
      <button
        className="m-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white"
        onClick={onQuitClick}
      >
        <PhoneOff />
      </button>
    </div>
  );
};

export default MeetingFooter;
