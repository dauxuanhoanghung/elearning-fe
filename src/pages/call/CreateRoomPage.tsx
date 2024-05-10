import {
  DataSnapshot,
  DatabaseReference,
  child,
  get,
  ref,
} from "firebase/database";
import { Video } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { database } from "@/app/firebase/config";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { isLecturer } from "@/utils/utils";

const CreateRoomPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const currentUser = useSelector((state: RootState) => state.user.user);

  const roomId = uuidv4();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [date, setDate] = useState<Date>(new Date());

  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  const inputRoomIdRef = useRef<HTMLInputElement | null>(null);

  const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
    minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
    seconds =
      date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  const handleOnJoin = async () => {
    const id = inputRoomIdRef.current.value;
    if (!id) return;
    const roomRef: DatabaseReference = child(ref(database), id);
    try {
      const snapshot: DataSnapshot = await get(roomRef);
      console.log(snapshot);
      if (snapshot.exists()) {
        navigate(`/room?roomId=${id}`);
      } else {
        showSnackbar({ message: "Room not exists", severity: "error" });
      }
    } catch (error) {
      console.log("Error fetching room data:", error);
    }
  };

  return (
    <main className="container text-black dark:text-white">
      <div className="text-4xl">Meeting</div>
      <div className="mb-4 text-base text-slate-500">
        Create a room for your students joining and keep learning beyond what
        you gave in your course content before.
      </div>
      <div className="flex flex-col md:flex-row md:gap-2">
        {isLecturer(currentUser) && (
          <div className="h-auto w-auto items-center p-3">
            <div className="mb-3 flex gap-2 md:mb-6 md:gap-6">
              <Link
                to={`/room?roomId=${roomId}`}
                className="block w-full rounded-3xl bg-blue-500"
              >
                <div className="w-full rounded p-3 md:aspect-square md:w-auto md:rounded-2xl md:p-6">
                  <div className="flex items-center gap-2 md:flex-col md:items-start md:justify-between">
                    <div
                      className="flex aspect-square items-center justify-center rounded-lg text-2xl text-white duration-200 
                    group-hover:scale-110 md:border-[1px] md:border-slate-300/40 md:bg-slate-400/40 md:p-2 md:text-3xl"
                    >
                      <Video />
                    </div>
                    <div className="flex-shrink-0 md:mb-5">
                      <p className="text-sm text-white md:mb-1 md:text-2xl md:font-bold">
                        {t("business.newMeeting")}
                      </p>
                      <p className="hidden text-sm font-thin text-slate-200 md:block">
                        {t("business.newMeetingDescription")}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}
        <div className="flex-grow p-3 md:border-l-2 md:p-4">
          <div className="relative w-full rounded bg-slate-500 p-3 md:h-52 md:rounded-2xl">
            <div className="bottom-2 left-2 md:absolute md:bottom-6 md:left-6">
              <p className="text-4xl text-white md:text-7xl">
                {`${hours}:${minutes}:${seconds}`}
              </p>
              <p className="my-1 font-thin text-slate-300">
                {`${days[date.getDay()]},${date.getDate()} ${
                  months[date.getMonth()]
                } ${date.getFullYear()}`}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:gap-2">
        <Label className="text-lg">Enter room id</Label>
        <Input
          ref={inputRoomIdRef}
          placeholder="RoomId which your lecture gave"
        />
        <Button onClick={handleOnJoin}>Join</Button>
      </div>
    </main>
  );
};

export default CreateRoomPage;
