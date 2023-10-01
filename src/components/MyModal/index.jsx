import { Backdrop, Box, Fade, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  height: "400px",
  padding: "15px",
  borderRadius: "10px",
  width: "50%",
};

const MyModal = ({ open, onClose, children, sx = {} }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      keepMounted
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            ...style,
            ...sx,
          }}
        >
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default MyModal;
