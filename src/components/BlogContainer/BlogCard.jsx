import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const BlogCard = (props) => {
  const { t } = useTranslation();
  const { href, title, thumpnail, description } = props;

  return (
    <Link
      role="blog-card"
      to="/"
      href="/posts/how-a-phishing-scampage-works"
      class="group col-span-1 hover:no-underline"
    >
      <div class="flex flex-col gap-3">
        <img
          src="/_nuxt/image/16fbfd.webp"
          width="350"
          height="240"
          alt="How phishing scampages work and what they have to do with pizza"
          loading=""
          sizes="(max-width: 640px) 380px, 350px"
          srcset="/_nuxt/image/6eb912.webp 380w, /_nuxt/image/16fbfd.webp 350w"
          class="w-full rounded-xl object-cover"
        />
        <div class="space-y-4">
          <div class="flex w-full items-center justify-between">
            <div class="rounded-full border border-black px-2 py-1 text-xs capitalize text-gray-300">
              engineering
            </div>
            <span class="text-xs font-semibold capitalize text-sky-500">
              by mike korostelev
            </span>
          </div>
          <h2 class="text-3xl font-bold group-hover:underline">
            How phishing scampages work and what they have to do with pizza
          </h2>
          <p class="text-sm text-gray-400">
            The post discusses phishing scams on free hosting platforms like
            ours, exposing techniques like obfu...
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
