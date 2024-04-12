import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Spinner } from "@/components/common";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { courseService, registrationService, sectionService } from "@/services";
import { isEmptyObject } from "@/utils/utils";

const CheckoutPage = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const currentUser = useSelector((state) => state.user.user);
  // #region course detail
  /**
   * course {id, name, description, background(image), price(for button), creator, createdDate}
   */
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
    queryKey: ["sections", "courseId", courseId],
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
    queryKey: ["course", "courseId", courseId],
    queryFn: async () => {
      const res = await courseService.getById(courseId);
      return res.data;
    },
  });
  // #endregion

  const handlePayment = async () => {
    const res = await registrationService.payment({ course: courseId });
    console.log("payment_res: ", res);
    localStorage.setItem("courseId", res.data.courseId);
    window.location.href = res?.data.redirect_url;
  };

  return (
    <main data-role="checkout-page">
      {isLoading && <Spinner />}
      {!isLoading && (
        <section className="my-4 md:container">
          <h1 className="mb-4 text-4xl font-bold">Checkout</h1>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div>
                <h2 className="mb-2 text-xl font-bold">Order Details</h2>
                <div>
                  {courseData && (
                    <>
                      <p>Course: (Fetching course details...)</p>
                      <div className="mb-2 flex items-center justify-between">
                        <span>Subtotal:</span>
                        <span>
                          $<span id="course-subtotal">Calculating...</span>
                        </span>
                      </div>
                      <div className="mb-2 flex items-center justify-between">
                        <span>Tax:</span>
                        <span>
                          $<span id="course-tax">Calculating...</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between font-bold">
                        <span>Total:</span>
                        <span>
                          $<span id="course-total">Calculating...</span>
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="rounded-lg px-4 py-6 shadow-md">
                <h2 className="mb-2 text-xl font-bold">Summary</h2>
                <div className="grid grid-cols-1 gap-2">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="">Original Price:</span>
                    <span className="">₫1,499,000</span>
                  </div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="">Discounts:</span>
                    <span className="">₫1,200,000</span>
                  </div>
                  <div className="h-[1px] w-full bg-black dark:bg-white"></div>
                  <div className="flex items-center justify-between font-bold">
                    <span className="">Total:</span>
                    <span className="">₫299,000</span>
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
    </main>
  );
};

export default CheckoutPage;
