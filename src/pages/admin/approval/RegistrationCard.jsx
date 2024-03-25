import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { lecturerRegistrationService } from "@/services";

const RegistrationCard = (props) => {
  const { showSnackbar } = useSnackbar();
  const { form, setRegistrationForms, registrationForms } = props;
  const [openModal, setOpenModal] = useState(false);
  const [reason, setReason] = useState("");
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleAcceptRegistration = async () => {
    const res = await lecturerRegistrationService.approvalForm(form?.id);
    if (res.data.status === 204) {
      showSnackbar({ message: res.data.message, severity: "info" });
      endOfRegistration();
    }
  };

  const handleDeclineRegistration = async () => {
    const request = { id: form.id, reason: reason };
    setReason("");
    const res = await lecturerRegistrationService.rejectForm(request);
    if (res.data.status === 204) {
      setOpenModal(false);
      showSnackbar({ message: res.data.message, severity: "info" });
      endOfRegistration();
    }
  };
  const endOfRegistration = () => {
    const updated = registrationForms.filter((e) => e.id !== form.id);
    setRegistrationForms([...updated]);
  };
  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Box sx={{ padding: "5px", display: "flex" }}>
            <Box>
              <Avatar
                src={form?.user.avatar}
                alt="User"
                sx={{ width: 100, height: 100 }}
              />
              <Typography variant="subtitle2">
                Registration Date: {form?.registrationDate}
              </Typography>
              <Typography variant="subtitle1">User Information:</Typography>
              <Typography variant="body2">
                First Name: {form?.user.firstName}
              </Typography>
              <Typography variant="body2">
                Last Name: {form?.user.lastName}
              </Typography>
            </Box>
            <Box>
              <CardMedia component="img" height="194" image={form?.imageUrl} />
            </Box>
          </Box>
          <Box
            sx={{
              padding: "5px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button variant="contained" onClick={handleAcceptRegistration}>
              Accept
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenModal(true)}
            >
              Decline
            </Button>
          </Box>
          <Dialog
            open={openModal}
            onClose={handleCloseModal}
            sx={{ height: "20%" }}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Reject to be the lecturer</DialogTitle>
                <DialogDescription>
                  Tell the users why you reject them
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Paper>
      </Grid>
    </>
  );
};

export default RegistrationCard;
