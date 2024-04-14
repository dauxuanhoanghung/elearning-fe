import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Loader } from "lucide-react";

import { PaypalIcon } from "@/components/Icons";
import Spinner from "@/components/common/Spinner";
import Avatar from "@/components/ui/Avatar";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { courseService, registrationService, sectionService } from "@/services";
import { isEmptyObject } from "@/utils/utils";

const CheckoutPage = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!courseId) {
      navigate("/");
    }
  }, []);

  // #region Registration
  const [registration, setRegistration] = useState(false);
  useEffect(() => {
    if (registration) return;
    if (isEmptyObject(currentUser)) {
      showSnackbar({
        message: "Please login first to use to feature.",
        severity: "error",
      });
      navigate("/login");
      return;
    }
  });

  const {
    data: sections,
    isLoading: sectionLoading,
    isError: sectionError,
  } = useQuery({
    queryKey: ["sections", { courseId }],
    queryFn: async () => {
      const res = await sectionService.getSections(courseId);
      return res.data;
    },
  });

  const {
    data: courseData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course", { courseId }],
    queryFn: async () => {
      const res = await courseService.getById(courseId);
      return res.data;
    },
    initialData: {
      name: "",
      background: "",
    },
  });
  // #endregion

  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePayWithPaypal = async () => {
    const res = await registrationService.payWithPaypal({ course: courseId });
    const { status, message, data } = res;
    if (status === 200) {
      window.location.href = data.redirectUrl;
    } else {
      showSnackbar({
        message: message || "Something went wrong",
        severity: "error",
      });
    }
  };
  const handlePayWithVNPay = async () => {
    const res = await registrationService.payWithVNPay({ course: courseId });
    if (res.status === 200) {
      localStorage.setItem("courseId", res.data.courseId);
      window.location.href = res.data.redirect_url;
    }
  };
  const handlePayWithStripe = async () => {
    const res = await registrationService.payWithStripe(courseId);
    if (res.data.status === 200) {
      showSnackbar({
        message: res.data.message,
        severity: "success",
      });
      navigate(`/course/${courseId}`);
    } else {
      showSnackbar({
        message: res.data.message,
        severity: "error",
      });
    }
  };

  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const handlePayment = () => {
    let res;
    setIsPaymentLoading(true);
    switch (paymentMethod) {
      case "paypal":
        handlePayWithPaypal();
        break;
      case "vnpay":
        handlePayWithVNPay();
        break;
      default:
        break;
    }
  };

  return (
    <main data-role="checkout-page">
      {isLoading && <Loader />}
      {!isLoading && (
        <section className="my-4 md:container">
          <h1 className="mb-4 text-5xl font-semibold">Checkout</h1>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <article>
                {courseData && (
                  <div className="flex items-center gap-4">
                    <div className="relative aspect-video w-1/3">
                      <img
                        src={courseData.background}
                        alt={courseData.name}
                        className="block h-full w-full object-cover"
                      />
                    </div>
                    <div className="col-span-2">
                      <div className="text-lg">{courseData.price} VND</div>
                      <h1 className="text-2xl font-bold">{courseData.name}</h1>
                      <div className="line-clamp-3">
                        {courseData.description}
                      </div>
                      <div className="my-3 flex items-center justify-start text-2xl">
                        <span>Uploaded by: </span>
                        <Avatar
                          isSignalShown={false}
                          src={courseData.user?.avatar}
                          className="mx-2 h-10 w-10"
                        />
                        <span>
                          {courseData.user?.lastName}{" "}
                          {courseData.user?.firstName}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </article>
              <article className="mt-6" data-role="payment-method">
                <h1 className="mb-4 text-3xl font-medium">Payment method:</h1>
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    className="form-radio h-5 w-5 text-blue-600"
                    onChange={handlePaymentMethodChange}
                  />
                  <label
                    htmlFor="paypal"
                    className="ml-2 flex items-center gap-2 text-2xl"
                  >
                    <PaypalIcon />
                    <span>
                      Paypal <span className="pl-2 text-lg">(Recommend)</span>
                    </span>
                  </label>
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <input
                    type="radio"
                    id="vnpay"
                    name="paymentMethod"
                    value="vnpay"
                    checked={paymentMethod === "vnpay"}
                    className="form-radio h-5 w-5 text-blue-600"
                    onChange={handlePaymentMethodChange}
                  />
                  <label
                    htmlFor="vnpay"
                    className="ml-2 flex items-center gap-2 text-2xl"
                  >
                    <img
                      src="https://i.gyazo.com/cd4ad37ac9f9ae75473542526f69e79e.png"
                      className="shrinkToFit h-10 w-20"
                    />
                    <span>
                      VNPay
                      <span className="pl-2 text-lg">
                        {" "}
                        (Only use in Vietnam)
                      </span>
                    </span>
                  </label>
                </div>
              </article>
            </div>
            <div className="lg:col-span-1">
              <div className="rounded-lg px-4 py-6 shadow-md">
                <h2 className="mb-2 text-xl font-bold">Summary</h2>
                <div className="grid grid-cols-1 gap-2">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="">Original Price:</span>
                    <span className="">{courseData.price} vnd</span>
                  </div>
                  {/* <div className="mb-2 flex items-center justify-between">
                    <span className="">Discounts:</span>
                    <span className="">₫1,200,000</span>
                  </div> */}
                  <div className="h-[1px] w-full bg-black dark:bg-white"></div>
                  <div className="flex items-center justify-between font-bold">
                    <span className="">Total:</span>
                    <span className="">{courseData.price} VND</span>
                  </div>
                </div>
              </div>
              <button
                className="w-full bg-purple-500 p-2"
                onClick={handlePayment}
              >
                <span>Proceed to checkout</span>
              </button>
            </div>
          </div>
        </section>
      )}
      {isPaymentLoading && (
        <div className="fixed top-0 z-[999] flex h-screen w-screen items-center justify-center bg-gray-500 opacity-40">
          <Spinner className="h-20 w-20 fill-red-600 opacity-100" />
        </div>
      )}
    </main>
  );
};

export default CheckoutPage;
