import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useSearchParams } from "react-router-dom";
import lectureService from "../../services/lectureService";
import { Button } from "@mui/material";

const LectureDetail = () => {
  const { lectureId } = useSearchParams();
  const navigate = useNavigate();
  const [lectureData, setLectureData] = useState({});

  useEffect(() => {
    if (lectureId === null) {
      navigate("/");
      return;
    }
    const fetchLectureData = async () => {
      const res = await lectureService.getLectureById(lectureId);
      setLectureData();
    };
    fetchLectureData();
  }, [lectureId]);

  // #region Player
  const ref = useRef();
  const [playerState, setPlayerState] = useState({
    playing: true,
    volume: 1,
    muted: true,
  });
  const handleChangePlayerState = (prop, value) => {
    setPlayerState((prevState) => ({
      ...prevState,
      [prop]: value,
    }));
  };
  const handlePause = () => {
    handleChangePlayerState("playing", false);
  };
  const handlePlay = () => {
    handleChangePlayerState("playing", true);
  };
  const handleSeek = (seconds) => {
    ref.current.seekTo(seconds, "seconds");
  };
  // #endregion
  const writeNote = () => {
    handleChangePlayerState("playing", false);
    const currentTime = ref.current.getCurrentTime();
    
  };

  return (
    <>
      <ReactPlayer
        className="react-player"
        controls
        url={`https://www.youtube.com/watch?v=BDSCJQnzYhg`}
        width="100%"
        height="550px"
        playing={playerState?.playing}
        volume={playerState?.volume}
        muted={playerState?.muted}
        ref={ref}
        onPause={handlePause}
        onPlay={handlePlay}
        onSeek={handleSeek}
      />
      <Button onClick={writeNote}>Write a note</Button>
    </>
  );
};

export default LectureDetail;
