import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const BlogContainer = (props) => {
  const { t } = useTranslation();

  const { blogs = [], page } = props;
  return (
    <section
      data-section="comment-section"
      className="mx-auto w-full max-w-5xl px-2 md:px-6"
    ></section>
  );
};

export default BlogContainer;
