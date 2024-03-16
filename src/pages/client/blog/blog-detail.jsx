import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const { t } = useTranslation();

  return <main data-role="blog-detail-page"></main>;
};

export default BlogDetailsPage;
