import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { setUser } from "@/app/store/userSlice";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { userService } from "@/services";

const MyBusinessPage: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [creditInput, setCreditInput] = useState(0);
  const handleInputChange = (e) => {
    setCreditInput(e.target.value);
  };

  const { showSnackbar } = useSnackbar();

  const [userInfo, setUserInfo] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    avatar: "",
    avatarFile: null,
    credit: 0,
    creditNumber: "",
  });
  const getUser = async () => {
    const res = await userService.getCurrentUser();
    console.log(res);
    const data = res.data;
    if (res.status === 200) {
      setUserInfo({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        avatarFile: null,
        username: data.username,
        avatar: data.avatar,
        credit: data.credit || 0,
        creditNumber: data.creditNumber || "",
      });
      dispatch(setUser(data));
    }
  };
  useEffect(() => {
    document.title = "Business Credit";
    getUser();
  }, [dispatch]);

  const handlePayout = async () => {
    if (creditInput > 0 && creditInput <= userInfo.credit) {
      const res = await userService.payoutCredit(
        creditInput,
        userInfo.username,
      );
      if (res.status === 200) {
        setUserInfo((prevState) => ({
          ...prevState,
          credit: prevState.credit - creditInput,
        }));
        dispatch(setUser(res.data));

        showSnackbar({
          message: "You have get $1 to your credit account",
          severity: "success",
        });
      }
    } else {
      showSnackbar({
        message:
          "Please enter a valid credit amount greater $0" +
          " to $" +
          userInfo.credit,
        severity: "warning",
      });
    }
  };

  return (
    <main className="container" data-component="my-business-page">
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t("common.home")}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>My Business</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <p className="text-4xl">Credit</p>

      <div data-role="add-new-course">
        <div className="my-4">
          <h1 className="text-3xl">Your current credit: ${userInfo.credit}</h1>
          <div className="gap-y-2">
            <h2>
              Credit amount:{" "}
              <span className="text-gray-300">
                (This is the amount you want to payout)
              </span>
            </h2>
            <Input
              max={userInfo.credit}
              min={0}
              type="number"
              value={creditInput}
              onChange={handleInputChange}
              placeholder="Enter your credit you want to payout"
            />
            <Button onClick={handlePayout}>Payout now</Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyBusinessPage;
