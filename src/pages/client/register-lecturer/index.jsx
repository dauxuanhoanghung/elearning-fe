import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { UploadIcon } from "@/components/Icons";
import { Checkbox } from "@mui/material";

import Spinner from "@/components/common/Spinner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { lecturerRegistrationService } from "@/services";

const RegisterLecturerPage = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // #region Register new
  const [backgroundImageURL, setBackgroundImageURL] = useState("");
  const [agreeToRules, setAgreeToRules] = useState(false);
  const fileID = useRef();
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImageURL(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setBackgroundImageURL("");
      fileID.current.value = null;
    }
  };
  const handleAgreeToRules = () => {
    setAgreeToRules(!agreeToRules);
  };

  const handleRegisterLecturer = async () => {
    if (!fileID.current.value) {
      showSnackbar({ message: "Please add your file ID!!!" });
      return;
    }
    if (!agreeToRules) {
      showSnackbar({
        message: "Please check on checkbox to agree the rules!!!",
      });
      return;
    }
    const request = new FormData();
    request.append("file", fileID.current.files[0]);
    console.log(request);
    setLoading(true);
    const res = await lecturerRegistrationService.registerLecturer(request);
    if (res.status === 201) {
      showSnackbar({ message: res.message, severity: "info" });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };
  // #endregion

  // #region get - update - delete
  /**
   * {imageUrl, user}
   */
  const [currentUserForm, setCurrentUserForm] = useState(null);
  useEffect(() => {
    const fetchOldForm = async () => {
      const res =
        await lecturerRegistrationService.getLecturerFormByCurrentUser();
      setCurrentUserForm(res.data);
    };
    fetchOldForm();
  }, []);

  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleOpenDeleteDialog = () => {
    setOpenDialog(true);
  };
  const handleDeleteRegistrationForm = async () => {
    handleCloseDialog();
    console.log("handleDeleteRegistrationForm");
    const res =
      await lecturerRegistrationService.deleteLecturerFormByCurrentUser(
        currentUserForm?.id,
      );
    if (res.data.status === 204) {
      showSnackbar({ message: res.data.message, severity: "info" });
      navigate("/");
    }
  };
  // #endregion
  return (
    <main className="container" data-component="register-lecturer-page">
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Register lecturer</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <p className="text-4xl">Register Lecturer</p>
      <div className="my-4">
        {currentUserForm && (
          <>
            <div>
              <p className="text-3xl">
                Your application haven't approved yet. Wait for admin or contact
                on: hlhe@gmail.com
              </p>
              <p>You have already register. See below:</p>
              <p>Created date: {currentUserForm?.registrationDate}</p>
              <div className="relative flex min-h-[400px] w-full cursor-pointer items-center justify-center">
                <img
                  src={currentUserForm?.imageUrl}
                  className="w-full object-cover"
                  alt="Background"
                />
              </div>
            </div>
            <div className="">
              <Button onClick={handleOpenDeleteDialog}>
                I don't want to be lecturer
              </Button>
              <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogContent
                  className="text-black dark:text-white"
                  hideCloseButton={true}
                  onInteractOutside={handleCloseDialog}
                >
                  <DialogTitle className="text-xl ">
                    Do you want to give up on being a lecturer ?
                  </DialogTitle>
                  <DialogHeader>
                    This action can't be redone. You can re-register it later.
                    Are you sure to do that?
                  </DialogHeader>
                  <DialogFooter>
                    <Button onClick={handleDeleteRegistrationForm}>Yes</Button>
                    <Button onClick={handleCloseDialog} autoFocus>
                      No
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </>
        )}
        {!currentUserForm && (
          <div>
            <div>
              <p className="text-xl">Rules for Becoming a Lecturer:</p>
              <ul className="ml-4 list-none text-lg">
                <li>Rule 1: Require your ID card</li>
                <li>
                  Rule 2: Your information in account must match to your ID card
                </li>
                <li>Rule 3: Confirm to my rules above.</li>
              </ul>
            </div>
            <div className="w-full">
              <label
                htmlFor="background-image-upload"
                className="flex h-96 w-full cursor-pointer flex-col items-center justify-center overflow-hidden 
                  rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 
                  dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                {backgroundImageURL ? (
                  <img
                    src={backgroundImageURL}
                    alt="Background"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pb-6 pt-5 text-gray-500 dark:text-gray-400">
                    <UploadIcon />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        Click to upload a your identity card
                      </span>
                    </p>
                  </div>
                )}
              </label>
              {/* Hidden file input */}
              <input
                accept="image/*"
                className="hidden"
                id="background-image-upload"
                type="file"
                onChange={handleImageUpload}
                ref={fileID}
              />
            </div>
            <div className="flex">
              <Checkbox
                checked={agreeToRules}
                onChange={handleAgreeToRules}
                color="primary"
                id="cb"
              />
              <label className="block p-2 text-[20px]" htmlFor="cb">
                I agree to the rules for becoming a lecturer
              </label>
            </div>
            <Button
              onClick={handleRegisterLecturer}
              className="mt-2 inline-flex items-center gap-2 rounded bg-gray-600 px-3 py-1 text-base text-white outline-1 
              transition-all duration-300 hover:bg-gray-800 dark:bg-gray-500 dark:hover:bg-gray-100 dark:hover:text-black"
              disabled={loading}
            >
              Submit {loading && <Spinner />}
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default RegisterLecturerPage;
