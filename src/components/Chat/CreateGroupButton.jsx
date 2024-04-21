import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { PlusCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { db } from "@/app/firebase/config";
import firebaseService from "@/app/firebase/firebaseService";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateGroupButton = () => {
  const { t } = useTranslation();
  const [groupName, setGroupName] = useState("");
  const currentUser = useSelector((state) => state.user.user);

  const [open, setOpen] = useState(false);
  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      alert("Please enter a valid group name. Don't leave it blank");
      return;
    }

    try {
      // find max id of group
      const findMaxIdQuery = query(
        collection(db, "groups"),
        orderBy("id", "DESC"),
        limit(1),
      );
      const maxIdGroup = await getDocs(findMaxIdQuery);
      console.log("maxIdGroup", maxIdGroup);
      let maxId = 1;

      if (!maxIdGroup.empty) {
        const maxIdGroupDoc = maxIdGroup.docs[0];
        maxId = parseInt(maxIdGroupDoc.data()["id"]) + 1;
      }
      // Assuming `currentUser.id` is the ID of the user creating the group
      const newGroup = {
        displayName: groupName,
        userIds: [currentUser.id],
        createdAt: serverTimestamp(),
        id: maxId,
      };
      setOpen(false);
      setGroupName("");
      // const docRef = await addDoc(collection(db, "groups"), newGroup);
      await firebaseService.saveDocWithId("groups", maxId, newGroup);
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTrigger asChild>
          <div className="cursor-pointer px-5 pb-6 dark:text-white md:pb-5">
            <PlusCircleIcon onClick={() => setOpen(true)} />
          </div>
        </DialogTrigger>
        <DialogContent
          className="text-black dark:text-white sm:max-w-lg"
          onInteractOutside={() => setOpen(false)}
          hideCloseButton={true}
        >
          <DialogHeader>
            <DialogTitle>Create a group</DialogTitle>
            <DialogDescription>
              Create a new group to chat to multiple users.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Group Name
              </Label>
              <Input
                id="name"
                defaultValue="Group"
                placeholder="Example: Group Java class"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleCreateGroup}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateGroupButton;
