import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "../../../../contexts/SnackbarContext";
import { courseService } from "../../../../services";
import { useSelector } from "react-redux";
import { isAdmin } from "../../../../utils/utils";
import { useEffect } from "react";
import DefaultLayout from "../../../../layout";

const CourseUpdatePage = () => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const currentUser = useSelector((state) => state.user.user);
  useEffect(() => {
    if (!isAdmin(currentUser)) {
      showSnackbar({ message: "You are not allowed to this Admin page.", severity: "error" });
      navigate("/");
    }
  }, [])
  // #region course detail
  /**
   * course {id, name, description, background(image), price(for button), creator, createdDate}
   */
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState({});
  useEffect(() => {
    const getCourseByCourseId = async (courseId) => {
      const res = await courseService.getCourseById(courseId);
      setCourseData(res.data.data);
    };
    getCourseByCourseId(courseId);
  }, [courseId]);
  // #endregion

  return <>
    <DefaultLayout>

    </DefaultLayout>
  </>
}

export default CourseUpdatePage;