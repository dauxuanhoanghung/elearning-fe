import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import BlogContainer from "@/components/BlogContainer/index";

const BlogsPage = () => {
  const { slug } = useParams();
  const { t } = useTranslation();

  const [blogs, setBlogs] = useState([]);

  return (
    <main data-role="blogs-page">
      <div class="common-section pt-20">
        <div class="w-max rounded-full border !border-neutral-700 px-3 py-1.5 text-center text-sm font-medium text-sky-500">
          Get to know us
        </div>
        <div class="space-y-6">
          <h2 class="text-center text-4xl font-extrabold capitalize lg:text-5xl">
            the cyclic blog
          </h2>
          <p class="text-center text-neutral-300">
            Our journey, our story, and the lessons we've learned building a
            system for systems.
          </p>
        </div>
      </div>
      <BlogContainer blogs={blogs} />
    </main>
  );
};

export default BlogsPage;
