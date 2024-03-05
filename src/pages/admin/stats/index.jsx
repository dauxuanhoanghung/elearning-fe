import { Box, Breadcrumbs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DefaultLayout from "@/layout";
import { statsService } from "@/services";
import { titleStyle } from "@/utils/styles";

const AdminStatsPage = () => {
  const [courseWithMostLecture, setCourseWithMostLecture] = useState([]);
  const [courseWithMostRegistration, setCourseWithMostRegistration] = useState(
    [],
  );
  const [countUserByMonth, setCountUserByMonth] = useState([]);
  const [countUserUntilMonth, setCountUserUntilMonth] = useState([]);
  useEffect(() => {
    const fetchCourseWithMostLecture = async () => {
      const res = await statsService.getCourseByMostLectures();
      console.log(res.data.data);
      setCourseWithMostLecture(res.data.data);
    };
    const fetchCourseWithMostRegistration = async () => {
      const res = await statsService.getCourseByMostRegistration();
      console.log(res.data.data);
      setCourseWithMostRegistration(res.data.data);
    };
    const fetchCountUserByMonth = async () => {
      const res = await statsService.countNumberOfUserByMonth();
      console.log(res.data.data);
      setCountUserByMonth(res.data.data);
    };
    const fetchCountUserUntilMonth = async () => {
      const res = await statsService.countUserRegisterUntilMonth();
      console.log(res.data.data);
      setCountUserUntilMonth(res.data.data);
    };
    fetchCourseWithMostLecture();
    fetchCourseWithMostRegistration();
    fetchCountUserByMonth();
    fetchCountUserUntilMonth();
  }, []);
  return (
    <>
      <DefaultLayout>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            Admin
          </Link>
          <Typography color="textPrimary">Stats</Typography>
        </Breadcrumbs>
        <Typography variant="h4" style={titleStyle}>
          Stats Page
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          minHeight="400px"
        >
          <Box gridColumn="span 12" gridRow="span 2">
            <Box
              mt="25px"
              p="0 30px"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" fontWeight="600">
                User In System
              </Typography>
              <Box height="250px"></Box>
            </Box>
          </Box>
          <Box gridColumn="span 12" gridRow="span 2">
            <Box
              mt="25px"
              p="0 30px"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" fontWeight="600">
                Course In System
              </Typography>
              <Box height="250px">
                <MyBarChart
                  courseWithMostLecture={courseWithMostLecture}
                  courseWithMostRegistration={courseWithMostRegistration}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </DefaultLayout>
    </>
  );
};

export default AdminStatsPage;
