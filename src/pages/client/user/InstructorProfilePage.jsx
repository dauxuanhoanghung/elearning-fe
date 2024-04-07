import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const InstructorProfilePage = () => {
  const { t } = useTranslation();
  const { username } = useParams();

  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courses", "username", username],
    queryFn: async () => {
      const { data } = await courseService.getCoursesByUserId();
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Fetching courses error</div>;
  return <></>;
};

export default InstructorProfilePage;
