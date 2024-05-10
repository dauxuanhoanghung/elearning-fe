import { useState } from "react";

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
import { useSnackbar } from "@/contexts/SnackbarContext";
import { sectionService } from "@/services";

const CreateSectionButton: React.FC<{ courseId: string | number }> = (
  props,
) => {
  const { courseId } = props;
  const { showSnackbar } = useSnackbar();

  const [open, setOpen] = useState<boolean>(false);
  const [section, setSection] = useState<any>({
    name: "",
    course: parseInt(courseId + ""),
  });
  const handleCreateSection = async () => {
    const res = await sectionService.create(section);
    if (res.status === 201) {
      showSnackbar({ message: res.message, severity: "success" });
    } else {
      showSnackbar({ message: "Something error...", severity: "error" });
    }
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button
            className="bg-black text-white hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            onClick={() => setOpen(true)}
          >
            Create a new section
          </Button>
        </DialogTrigger>
        <DialogContent
          className="text-black dark:text-white sm:max-w-lg"
          onInteractOutside={() => setOpen(false)}
          hideCloseButton={true}
        >
          <DialogHeader>
            <DialogTitle>Create a new Section</DialogTitle>
            <DialogDescription>
              Create a new section for your course
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Section
              </Label>
              <Input
                id="name"
                placeholder="Example: Get started"
                value={section.name}
                onChange={(e) =>
                  setSection((prev) => ({ ...prev, name: e.target.value }))
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleCreateSection}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateSectionButton;
