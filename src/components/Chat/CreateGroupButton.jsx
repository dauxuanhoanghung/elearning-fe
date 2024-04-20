import { addDoc, collection } from "firebase/firestore";
import { PlusCircleIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

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

const CreateGroupButton = () => {
  const [groupName, setGroupName] = useState("Group");
  const currentUser = useSelector((state) => state.user.user);

  const openModal = () => {};

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      alert("Please enter a valid group name.");
      return;
    }

    try {
      // Assuming `currentUser.id` is the ID of the user creating the group
      const newGroup = {
        name: groupName,
        userIds: [currentUser.id],
        createdAt: new Date(),
      };
      const docRef = await addDoc(collection(db, "groups"), newGroup);
      console.log("Group created successfully!", docRef.id);
      alert("Group created successfully!");
      setGroupName(""); // Đặt lại tên nhóm
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Failed to create group.");
    }
  };
  const onGroupCreated = useCallback((newGroup) => {
    console.log("New group created: ", newGroup);
    // Bạn có thể thực hiện thêm các tác vụ cập nhật tại đây, chẳng hạn như cập nhật state.
  }, []);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer px-5 pb-6 dark:text-white md:pb-5">
            <PlusCircleIcon onClick={() => openModal()} />
          </div>
        </DialogTrigger>
        <DialogContent className="text-black dark:text-white sm:max-w-[425px]">
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
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
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
