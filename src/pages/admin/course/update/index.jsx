import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { Spinner } from "@/components/common";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { courseService } from "@/services";
import { isAdmin } from "@/utils/utils";
import LectureForm from "./LectureForm";
import SectionList from "./SectionList";

const CourseUpdatePage = () => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const currentUser = useSelector((state) => state.user.user);

  const [sections, setSections] = useState([]);
  const fetchSectionsAndItsLectures = async () => {
    const res = await courseService.getSectionAndLecturesByCourseId(courseId);
    console.log(res);
    if (res.data.status === 200) {
      setSections(res.data.data);
    }
  };
  // #region course detail
  /**
   * course {id, name, description, background(image), price(for button), creator, createdDate}
   */
  const [courseData, setCourseData] = useState({
    id: 0,
    name: "",
    description: "",
    background: "",
    price: 0,
    countRegistration: 1,
    createdDate: "",
    publishDate: "",
    updatedDate: "",
    user: {},
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["course", { id: courseId }],
    queryFn: async () => {
      const res = await courseService.getById(courseId);
      if (res.data) {
        setCourseData({ ...courseData, ...res.data });
        return res.data;
      } else {
        showSnackbar({ message: "Course not found!!!", severity: "error" });
      }
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
    console.log(courseData);
  };
  const handleUpdate = () => {};
  // #endregion
  const [openLectureForm, setOpenLectureForm] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  return (
    <main className="md:mx-auto md:max-w-[95%]" data-role="course-update-page">
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {isAdmin(currentUser) && (
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Update Course</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-4">
          <div className="col-span-4 md:col-span-1">
            <SectionList
              courseData={courseData}
              setCourseData={setCourseData}
              setOpenLectureForm={setOpenLectureForm}
              setSelectedSection={setSelectedSection}
              fetchSectionsAndItsLectures={fetchSectionsAndItsLectures}
              sections={sections}
              setSections={setSections}
            />
          </div>

          <div className="col-span-4 md:col-span-3">
            {openLectureForm && (
              <LectureForm
                courseData={courseData}
                setCourseData={setCourseData}
                selectedSection={selectedSection}
                setOpenLectureForm={setOpenLectureForm}
                fetchSectionsAndItsLectures={fetchSectionsAndItsLectures}
              />
            )}
            {!openLectureForm && (
              <>
                <Card>
                  <CardMedia
                    component="img"
                    height="400"
                    image={courseData.background}
                    alt={courseData.name}
                  />
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <TextField
                          label="Course Name"
                          name="name"
                          value={courseData.name}
                          onChange={handleInputChange}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="number"
                          label="Price"
                          name="price"
                          value={courseData.price}
                          onChange={handleInputChange}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Description"
                          name="description"
                          value={courseData.description}
                          onChange={handleInputChange}
                          fullWidth
                          multiline
                          rows={4}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="outlined" onClick={handleUpdate}>
                          Update
                        </Button>
                      </Grid>
                    </Grid>
                    <Typography variant="h5" component="div">
                      {courseData?.name}
                    </Typography>
                    <p>{courseData.subtitle}</p>
                    <p>{courseData.description}</p>
                    <p>
                      Price:{" "}
                      {courseData?.price === 0
                        ? "Free"
                        : `$${courseData.price}`}
                    </p>
                    <p>Published on {courseData.publishDate}</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default CourseUpdatePage;
