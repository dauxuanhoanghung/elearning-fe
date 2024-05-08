import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useCountdownRedirect = (
  redirectUrl: string | null,
  countdownDuration: number = 5,
): number => {
  const [countdown, setCountdown] = useState<number>(countdownDuration);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        const fallbackRedirectUrl = "/";
        navigate(fallbackRedirectUrl);
      }
    }, countdownDuration * 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimeout);
    };
  }, [navigate, redirectUrl, countdownDuration]);

  return countdown;
};

export default useCountdownRedirect;
