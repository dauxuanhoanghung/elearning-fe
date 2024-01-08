import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useSearchParams } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { Modal } from "@/components/common";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { lectureService, userNoteService } from "@/services";
import { secondsToMMSS } from "@/utils/utils";
import UserNote from "./UserNote";

const LectureDetail = () => {
  const [searchParams] = useSearchParams();
  const lectureId = searchParams.get("lectureId");
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  // #region lecture
  /**
   * {id, title, content, type, videoUrl, orderIndex} lectureData
   */
  const [lectureData, setLectureData] = useState({});
  useEffect(() => {
    if (!lectureId) {
      showSnackbar({ message: "Invalid route", severity: "error" });
      navigate("/");
      return;
    }
    const fetchLectureData = async () => {
      if (!lectureId) return;
      const res = await lectureService.getLectureById(lectureId);
      setLectureData(res.data.data);
    };
    fetchLectureData();
  }, [lectureId]);
  // #endregion
  // #region Player
  const player = useRef();
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
    player.current.seekTo(seconds, "seconds");
  };
  const [currentTime, setCurrentTime] = useState(0);

  const handleChangeVolume = (event, newValue) => {
    setPlayerState({ ...playerState, volume: newValue / 100 });
  };
  // #endregion
  // #region Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
    handleChangePlayerState("playing", false);
    setCurrentTime(player.current.getCurrentTime());
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    handleChangePlayerState("playing", true);
  };
  // #endregion
  // #region note
  const [userNotes, setUserNotes] = useState([]);
  useEffect(() => {
    const fetchUserNotes = async () => {
      if (!lectureId) return;
      const response = await userNoteService.getNotesByLecture(lectureId);

      if (response.data.status === 200) {
        setUserNotes(response.data.data);
      }
    };

    fetchUserNotes();
  }, []);
  const [note, setNote] = useState("");
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };
  const writeNote = () => {
    const handleAddUserNote = async () => {
      if (note.trim().length === 0) {
        showSnackbar({
          message: "Please enter a your note.",
          severity: "warning",
        });
        return;
      }
      const currentTime = player.current.getCurrentTime();
      const request = {
        text: note,
        noteTime: currentTime,
        lecture: lectureId,
      };
      const response = await userNoteService.createNote(request);
      if (response.data.status === 201) {
        setUserNotes([response.data.data, ...userNotes]);
        showSnackbar({ message: response.data.message, severity: "success" });
      }
      setNote("");
      setOpenModal(false);
    };
    handleChangePlayerState("playing", false);
    handleAddUserNote();
    setOpenModal(true);
  };
  const handleDeleteNote = (id) => {
    const deleteNote = async () => {
      const res = await userNoteService.deleteById(id);
      if (res.data.status === 204) {
        showSnackbar({ message: res.data.message, severity: "info" });
        const updatedUserNotes = userNotes.filter((u) => u.id != id);
        setUserNotes([...updatedUserNotes]);
      }
    };
    deleteNote();
  };
  // #endregion
  return (
    <>
      <ReactPlayer
        className="react-player"
        controls
        url={`${lectureData.videoUrl}`}
        width="100%"
        height="550px"
        playing={playerState?.playing}
        volume={playerState?.volume}
        muted={playerState?.muted}
        ref={player}
        onPause={handlePause}
        onPlay={handlePlay}
        onSeek={handleSeek}
      />
      {/* <Box>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <VolumeDown />
          <Slider aria-label="Volume" value={playerState?.volume * 100} onChange={handleChangeVolume} />
          <VolumeUp />
        </Stack>
      </Box> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px auto",
        }}
      >
        <Typography variant="h6">{lectureData?.title}</Typography>
        <Button
          onClick={handleOpenModal}
          sx={{ backgroundColor: "#ebebeb", padding: "10px", color: "#000" }}
        >
          <AddIcon />
          Add a note
        </Button>
      </Box>
      <Box>
        <Typography variant="h6">{lectureData.content}</Typography>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <>
          <Typography>
            Add a note on
            <span style={{ color: "#F9812A" }}>
              {` ${secondsToMMSS(currentTime)}`}
            </span>
          </Typography>
          <TextField
            label="Add a note"
            variant="outlined"
            fullWidth
            value={note}
            onChange={handleNoteChange}
            onKeyUp={(e) => e.keyCode === 13 && writeNote()}
            style={{ marginTop: "16px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={writeNote}>
                    <SendOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ margin: "10px auto" }}>
            {userNotes?.map((userNote, index) => (
              <React.Fragment key={index}>
                <UserNote
                  id={userNote.id}
                  text={userNote.text}
                  time={userNote.noteTime}
                  onTimeClick={() => {
                    handleSeek(userNote.noteTime);
                    handleCloseModal();
                  }}
                  handleDeleteNote={handleDeleteNote}
                />
              </React.Fragment>
            ))}
            {userNotes?.length === 0 && (
              <>
                <Box container sx={{ margin: "30px 0" }}>
                  <Alert severity="info">
                    You haven't give a note on this lecture !!! Do it now.
                  </Alert>
                </Box>
              </>
            )}
          </Box>
        </>
      </Modal>
    </>
  );
};

export default LectureDetail;
