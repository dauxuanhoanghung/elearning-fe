import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { lectureService } from "@/services";

const LectureForm = ({
  selectedSection,
  setOpenLectureForm,
  fetchSectionsAndItsLectures,
}) => {
  const { showSnackbar } = useSnackbar();
  // #region new lecture form
  const [lectures, setLectures] = useState(selectedSection?.lectures || []);
  const [lectureFormData, setLectureFormData] = useState({
    title: "",
    content: "",
    type: "VIDEO",
    orderIndex: "",
    uploaderType: "YOUTUBE",
    videoFile: null,
  });

  const handleLectureChange = (e) => {
    const { name, value, type, files } = e.target;
    const maxSize = 100 * 1024 * 1024;
    if (type === "file") {
      if (files[0].size > maxSize) {
        showSnackbar({
          message: "Video upload maximum size exceeded 1MB",
          severity: "error",
        });
        return;
      }
      setLectureFormData({ ...lectureFormData, [name]: files[0] });
    } else {
      setLectureFormData({ ...lectureFormData, [name]: value });
      if (name === "TEXT")
        setLectureFormData({ ...lectureFormData, ["videoFile"]: null });
    }
  };
  const addLecture = () => {
    if (
      !lectureFormData.title.trim() ||
      (lectureFormData.type === "VIDEO" && !lectureFormData.videoFile)
    ) {
      showSnackbar({
        message: "Please choose the file and fill the data",
        severity: "error",
      });
      return;
    }
    console.log("selectedSection", selectedSection);
    const newLecture = {
      title: lectureFormData.title,
      content: lectureFormData.content,
      type: lectureFormData.type,
      orderIndex: lectures.length + 1,
      videoFile: lectureFormData.videoFile,
      uploaderType: lectureFormData.uploaderType,
    };
    setLectureFormData({
      title: "",
      content: "",
      type: "VIDEO",
      uploaderType: "YOUTUBE",
      orderIndex: "",
      videoFile: null,
    });
    handleAddLecture(newLecture);
  };
  const handleAddLecture = async (lecture) => {
    const createForm = (lecture, sectionId) => {
      const formData = new FormData();
      formData.append("title", lecture.title);
      formData.append("content", lecture.content);
      formData.append("type", lecture.type);
      formData.append("orderIndex", lecture.orderIndex);
      formData.append("videoFile", lecture.videoFile);
      formData.append("uploaderType", lecture.uploaderType);
      formData.append("section", sectionId);
      return formData;
    };
    const lectureRequest = createForm(lecture, selectedSection.id);
    const res = await lectureService.create(lectureRequest);
    fetchSectionsAndItsLectures();
    showSnackbar({ message: "Upload successfully", severity: "success" });
  };
  // #endregion
  // #region cancel
  const [openDialog, setOpenDialog] = useState(false);
  const handleCancel = () => {
    setOpenDialog(false);
    setOpenLectureForm(false);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  // endregion
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Lecture Title"
            name="title"
            value={lectureFormData.title}
            onChange={handleLectureChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            placeholder="Lecture Content"
            name="content"
            label="Description"
            value={lectureFormData.content}
            fullWidth
            multiline
            rows={4}
            onChange={handleLectureChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Lecture Type</FormLabel>
            <RadioGroup
              row
              name="type"
              value={lectureFormData.type}
              onChange={handleLectureChange}
            >
              <FormControlLabel
                value="VIDEO"
                control={<Radio />}
                label="Video"
              />
              <FormControlLabel value="TEXT" control={<Radio />} label="Text" />
            </RadioGroup>
          </FormControl>
        </Grid>
        {lectureFormData.type === "VIDEO" && (
          <>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Upload to</FormLabel>
                <RadioGroup
                  row
                  name="uploaderType"
                  value={lectureFormData.uploaderType}
                  onChange={handleLectureChange}
                >
                  <FormControlLabel
                    value="YOUTUBE"
                    control={<Radio />}
                    label="Youtube"
                  />
                  <FormControlLabel
                    value="AMAZONS3"
                    control={<Radio />}
                    label="Amazon"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Upload Video</InputLabel>
              <input
                type="file"
                name="videoFile"
                accept="video/*"
                onChange={handleLectureChange}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={addLecture}>
            Add Lecture
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenDialog(true)}
            sx={{ marginX: "10px" }}
          >
            Cancel and return
          </Button>
        </Grid>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle id="alert-dialog-title">
            Do you want to cancel this action ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action can't be redone. Are you sure to do that?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCancel}
              sx={{ backgroundColor: "#f50057", color: "#fff" }}
            >
              Yes
            </Button>
            <Button onClick={handleCloseDialog} autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
};

export default LectureForm;
