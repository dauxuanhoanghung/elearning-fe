import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Alert } from "@mui/material";

import { useSnackbar } from "@/contexts/SnackbarContext";
import { registrationService } from "@/services";

const VNPayResultPage = () => {
  const [params] = useSearchParams();
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const vnp_ResponseCode = params.get("vnp_ResponseCode");
  const navigate = useNavigate();

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
            navigate(
              `/course/${payload.course}/learning?lectureId=${res?.data?.nextUrl}`,
            );
          }, 1000);
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
    </div>
  );
};

export default VNPayResultPage;
