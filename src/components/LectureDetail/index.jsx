import { useQuery } from "@tanstack/react-query";
import { AlertCircle, PlusIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useSnackbar } from "@/contexts/SnackbarContext";
import { lectureService, userNoteService } from "@/services";
import { secondsToMMSS } from "@/utils/utils";
import { Alert, AlertDescription } from "../ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import UserNote from "./UserNote";

const LectureDetail = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const lectureId = searchParams.get("lectureId");
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (!lectureId) {
      showSnackbar({ message: "Invalid route", severity: "error" });
      navigate("/");
      return;
    }
  }, []);
  // #region lecture
  /**
   * {id, title, content, type, videoUrl, orderIndex} lectureData
   */
  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
  } = useQuery({
    queryKey: ["lecture", "lectureId", lectureId],
    queryFn: async () => {
      const res = await lectureService.getById(lectureId);
      console.log(res);
      return res.data;
    },
    initialData: {
      id: "",
      title: "",
      content: "",
      type: "",
      videoUrl: "",
      orderIndex: 0,
    },
  });

  // #endregion
  // #region Player
  const player = useRef();
  const [playerState, setPlayerState] = useState({
    playing: true,
    volume: 1,
    muted: false,
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
  const { isLoading: userNotesLoading, isError: userNotesError } = useQuery({
    queryKey: ["notes", { lectureId }],
    queryFn: async () => {
      const res = await userNoteService.getNotesByLecture(lectureId);
      setUserNotes(res.data);
      return res.data;
    },
  });

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
      if (response.status === 201) {
        setUserNotes([response.data, ...userNotes]);
        showSnackbar({ message: response.message, severity: "success" });
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
      if (res.status === 204) {
        showSnackbar({ message: res.message, severity: "info" });
        const updatedUserNotes = userNotes.filter((u) => u.id != id);
        setUserNotes([...updatedUserNotes]);
      }
    };
    deleteNote();
  };
  // #endregion
  return (
    <main data-role="lecture-detail-component">
      <ReactPlayer
        className="react-player"
        controls
        url={lectureData?.videoUrl}
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
      <div className="mx-2 mb-10 mt-4 flex items-center justify-between">
        <h6 className="text-3xl">{lectureData?.title}</h6>
        <button
          onClick={handleOpenModal}
          className="flex items-center bg-cyan-600 px-4 py-2 text-black dark:text-white"
        >
          <PlusIcon className="mr-1 h-6 w-6" />
          <span>Add a note</span>
        </button>
      </div>
      <div className="m-2">
        <h5 className="text-xl">Lecture description:</h5>
        <h6 className="text-lg">{lectureData.content}</h6>
      </div>

      <Dialog open={openModal}>
        <DialogContent
          className="min-h-80 w-[70%] max-w-6xl text-black dark:text-white"
          onInteractOutside={handleCloseModal}
          hideCloseButton={true}
        >
          <DialogHeader>
            <DialogTitle>
              <span className="text-xl font-bold text-black dark:text-white">
                Add a note
              </span>
            </DialogTitle>
            <DialogDescription>
              Make a note to keep track of your learning progress. Click save
              when you complete this action.
            </DialogDescription>
            <span>
              Add a note on
              <span style={{ color: "#F9812A" }}>
                {` ${secondsToMMSS(currentTime)}`}
              </span>
            </span>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label>Note content</Label>
            <Input
              value={note}
              placeholder="Write your note here..."
              onChange={handleNoteChange}
              onKeyUp={(e) => e.keyCode === 13 && writeNote()}
            />
          </div>
          <div className="w-full">
            {userNotes?.map((userNote, index) => (
              <React.Fragment key={index}>
                <UserNote
                  {...userNote}
                  onTimeClick={() => {
                    handleSeek(userNote.noteTime);
                    handleCloseModal();
                  }}
                  handleDeleteNote={handleDeleteNote}
                  userNotes={userNotes}
                  setUserNotes={setUserNotes}
                />
              </React.Fragment>
            ))}
            {userNotes?.length === 0 && (
              <div className="w-full">
                <Alert variant="default">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You haven't give a note on this lecture !!! Do it now.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default LectureDetail;
