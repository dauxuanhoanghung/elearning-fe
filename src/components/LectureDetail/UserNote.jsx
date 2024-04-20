import { Check, Pencil, Trash, X } from "lucide-react";
import React, { useState } from "react";

import userNoteService from "@/services/user.note.service";
import { secondsToMMSS } from "@/utils/utils";
import { useSelector } from "react-redux";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

const UserNote = (props) => {
  const currentUser = useSelector((state) => state.user.user);
  const {
    id,
    text,
    noteTime,
    lecture,
    onTimeClick,
    handleDeleteNote,
    userNotes,
    setUserNotes,
  } = props;
  const handleOnClickDeleteIcon = () => {
    setOpenDialog(true);
  };
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleDeleteUserNote = () => {
    handleCloseDialog();
    handleDeleteNote(id);
  };

  // #region edit mode
  const [textEdit, setTextEdit] = useState("");
  const [editMode, setEditMode] = useState(false);
  const handleNoteChange = () => {};
  const handleStartEdit = () => {
    setEditMode(true);
    setTextEdit(text);
  };
  const handleEdit = async () => {
    console.log(textEdit);
    const res = await userNoteService.update({
      id: id,
      text: textEdit,
      noteTime: noteTime,
      lecture: lecture.id,
      user: currentUser.id,
    });
    const idx = userNotes.findIndex((note) => note.id === id);
    const updated = res.data;
    setUserNotes([
      ...userNotes.slice(0, idx),
      updated,
      ...userNotes.slice(idx + 1),
    ]);
    setEditMode(false);
  };
  // #endregion

  return (
    <article className="w-full" data-role="user-note-component">
      <Alert className="flex items-end justify-between">
        <div role="left" className="w-full">
          <AlertTitle>
            <span>
              Lecture {lecture.orderIndex}: {lecture.title}
            </span>
            <span
              className="cursor-pointer text-blue-500 "
              onClick={onTimeClick}
            >{` ${secondsToMMSS(noteTime)}`}</span>
          </AlertTitle>
          <AlertDescription>
            {editMode ? (
              <Input
                className="w-full"
                value={textEdit}
                onChange={(e) => setTextEdit(e.target.value)}
              />
            ) : (
              <span className="block py-2.5">{text}</span>
            )}
          </AlertDescription>
        </div>
        {editMode ? (
          <div className="flex gap-2">
            <p className="cursor-pointer">
              <Check className="h-6 w-6" onClick={handleEdit} />
            </p>
            <p className="cursor-pointer" onClick={() => setEditMode(false)}>
              <X className="h-6 w-6" />
            </p>
          </div>
        ) : (
          <div className="flex gap-2">
            <p className="cursor-pointer" onClick={handleStartEdit}>
              <Pencil className="h-6 w-6" />
            </p>
            <p className="cursor-pointer" onClick={handleOnClickDeleteIcon}>
              <Trash className="h-6 w-6" />
            </p>
          </div>
        )}
      </Alert>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent onInteractOutside={handleCloseDialog}>
          <DialogHeader>
            <DialogTitle>
              <span className="text-xl font-bold text-black dark:text-white">
                Delete a note
              </span>
            </DialogTitle>
            <DialogDescription>This action will be undo.</DialogDescription>
          </DialogHeader>
          <DialogTitle>Do you want to delete this note?</DialogTitle>
          <DialogFooter>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleDeleteUserNote}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default UserNote;
