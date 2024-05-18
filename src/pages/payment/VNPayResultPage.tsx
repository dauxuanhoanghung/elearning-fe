// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Alert } from "@mui/material";

import { useSnackbar } from "@/contexts/SnackbarContext";
import useCountdownRedirect from "@/hooks/useCountdownRedirect";
import { registrationService } from "@/services";

const VNPayResultPage: React.FC = () => {
  const [params] = useSearchParams();
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const vnp_ResponseCode = params.get("vnp_ResponseCode");
  const navigate = useNavigate();

  const [redirectUrl, setRedirectUrl] = useState("/");
  const countdownDuration = 5;
  const countdown = useCountdownRedirect(redirectUrl, countdownDuration);

  useEffect(() => {
    console.log(params);
    const handleRegister = async () => {
      if (vnp_ResponseCode === "00") {
        const courseId = parseInt(localStorage.getItem("courseId"), 10);
        const payload = {
          course: courseId,
          amount: params.get("vnp_Amount") / 100,
          code: params.get("vnp_TransactionNo"),
        };
        if (courseId) {
          console.log(payload);
          localStorage.removeItem("courseId");
          const res = await registrationService.register(payload);
          setTimeout(() => {
            setRedirectUrl(
              `/course/${payload.course}/learning?lectureId=${res?.data?.nextUrl}`,
            );
          }, 1000);
        } else {
          navigate("/");
        }
      } else {
        showSnackbar({ message: "Payment fail!!!", severity: "error" });
      }
      setLoading(false);
    };
    handleRegister();
  }, []);

  return (
    <div className="container">
      {loading && <p className="text-green-600">Loading</p>}
      {!loading && vnp_ResponseCode !== "00" ? (
        <Alert severity="error">Payment Fail!</Alert>
      ) : (
        <Alert severity="success">Payment Successful!</Alert>
      )}
      <div data-role="success-page" className="mt-4 md:container">
        <h1 className="text-3xl">Payment Return</h1>
        <div className="flex h-screen items-center justify-center">
          <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-md dark:bg-gray-700">
            <div className="mb-6 flex justify-center">
              <svg
                className="h-16 w-16 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mb-4 text-center text-2xl font-bold">
              Payment successfully
            </h2>
            <p className="mb-6 text-center dark:text-gray-200">
              <p className="text-lg">
                Your payment has been received. Thank you for your purchase!
              </p>
              <p>
                You'll be redirected to the course after {countdown} seconds.
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VNPayResultPage;
