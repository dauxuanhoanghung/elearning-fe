import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import useCountdownRedirect from "@/hooks/useCountdownRedirect";
import registrationService from "@/services/registration.service";

const PaypalCapturePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [redirectUrl, setRedirectUrl] = useState("/");

  useEffect(() => {
    const handleResponse = async () => {
      const token = searchParams.get("token");
      if (!token) {
        navigate("/");
      }
      const res = await registrationService.capturePaypal({ token });
      console.log(res);
      if (res) {
        setRedirectUrl(
          `/course/${res.data.courseId}/learning?lectureId=${res.data.lecture.id}`,
        );
      }
    };
    handleResponse();
  }, []);

  const countdownDuration = 5;
  const countdown = useCountdownRedirect(redirectUrl, countdownDuration);
  console.log(searchParams);

  return (
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
            <h1 className="text-lg">
              Your payment has been received. Thank you for your purchase!
            </h1>
            <p>You'll be redirected to the course after {countdown} seconds.</p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaypalCapturePage;
