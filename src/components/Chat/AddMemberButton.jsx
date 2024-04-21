import {
  arrayUnion,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";

import { db } from "@/app/firebase/config";
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

const AddMemberButton = (props) => {
  const { groupId } = props;

  //#region modal add email
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const addUserToGroup = async (userId) => {
    const groupRef = collection(db, "groups");
    const groupQuery = query(groupRef, where("id", "==", groupId));
    const groupDocs = await getDocs(groupQuery);
    const g = groupDocs.docs[0].ref;
    try {
      updateDoc(
        g,
        {
          userIds: arrayUnion(userId),
        },
        {
          merge: true,
        },
      ).then(() => console.log("User ID added to group successfully."));
    } catch (error) {
      console.error("Error adding user to group:", error);
    }
  };

  const handleSearchUser = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    try {
      const querySnapshot = await getDocs(q);
      // Check if email exists, none => return
      if (querySnapshot.empty) {
        alert("No user found with that email.");
        return;
      }
      const userDoc = querySnapshot.docs[0];
      const userId = userDoc.data()["id"];
      addUserToGroup(userId);
      setOpen(false);
    } catch (error) {
      console.error("Error fetching user by email:", error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <div className="cursor-pointer dark:text-white">
          <Button onClick={() => setOpen(true)}>Add member</Button>
        </div>
      </DialogTrigger>
      <DialogContent
        className="text-black dark:text-white sm:max-w-[425px]"
        onInteractOutside={() => setOpen(false)}
        hideCloseButton={true}
      >
        <DialogHeader>
          <DialogTitle>Add member</DialogTitle>
          <DialogDescription>
            Add members to the group for messaging
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="email" className="text-left">
              Enter email
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSearchUser}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddMemberButton;
