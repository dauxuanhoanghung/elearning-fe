import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import logo from "@/assets/logo.png";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../Icons";

const sections1 = [
  {
    key: "footer.Solutions",
    children: [
      { href: "/", key: "footer.Marketing" },
      { href: "/", key: "footer.Analytics" },
      { href: "/", key: "footer.Commerce" },
      { href: "/", key: "footer.Insights" },
    ],
  },
  {
    key: "footer.Support",
    children: [
      { href: "/", key: "footer.Pricing" },
      { href: "/", key: "footer.Documentation" },
      { href: "/", key: "footer.Guides" },
      { href: "/", key: "footer.APIStatus" },
    ],
  },
];
const sections2 = [
  {
    href: "/",
    key: "footer.Company",
    children: [
      { href: "/", key: "footer.About" },
      { href: "/", key: "footer.Blog" },
      { href: "/", key: "footer.Jobs" },
      { href: "/", key: "footer.Press" },
      { href: "/", key: "footer.Partners" },
    ],
  },
  {
    href: "/",
    key: "footer.Legal",
    children: [
      { href: "/", key: "footer.Claim" },
      { href: "/", key: "footer.Privacy" },
      { href: "/", key: "footer.Terms" },
    ],
  },
];

const socialMediaData = [
  { name: "Facebook", icon: <FacebookIcon /> },
  { name: "Instagram", icon: <InstagramIcon /> },
  { name: "Twitter", icon: <TwitterIcon /> },
  { name: "GitHub", icon: <GithubIcon /> },
  { name: "YouTube", icon: <YoutubeIcon /> },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <footer className="dark:bg-gray-700">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-8  sm:pt-12 lg:px-8 lg:pt-20">
        <div className="lg:grid lg:grid-cols-3 xl:gap-8">
          <img className="h-12 lg:h-40" src={logo} alt={t("footer.User")} />
          <div className="mt-12 grid grid-cols-2 gap-8 lg:col-span-2 lg:mt-0">
            {[sections1, sections2].map((sec, i) => (
              <div key={i} className="md:grid md:grid-cols-2 md:gap-8">
                {sec.map((s, idx) => {
                  return (
                    <div key={idx}>
                      <h3 className="text-md font-semibold leading-6 text-gray-700 dark:text-white">
                        {t(s.key)}
                      </h3>
                      <ul role="list" className="mt-6">
                        {s.children.map((c, id) => (
                          <li key={id}>
                            <Link
                              href="#"
                              className="text-xs leading-6 text-gray-600 dark:text-gray-100"
                            >
                              {t(c.key)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 border-opacity-10 pt-8 sm:mt-12 lg:mt-12 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-xs font-semibold leading-6 text-gray-700 dark:text-white">
              {t("footer.Subscribe")}
            </h3>
            <p className="mt-2 text-xs leading-6 text-gray-600 dark:text-gray-100">
              {t("footer.Subscribe-detail")}
            </p>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
            <label
              htmlFor="email-address"
              className="clip-hidden whitespace-no-wrap absolute m-[-1px] h-1 w-1 overflow-hidden border-0 p-0"
            >
              {t("footer.EmailAddress")}
            </label>
            <input
              type="email"
              name="email-address"
              value={email}
              onChange={handleEmailChange}
              id="email-address"
              autoComplete="email"
              required=""
              className="w-full min-w-0 appearance-none rounded-md border bg-white px-3 
                      py-1.5 text-base leading-6 text-gray-700 shadow-sm ring-0 ring-inset
                    ring-gray-300 ring-opacity-100 sm:w-64 sm:text-xs sm:leading-5"
              placeholder={t("footer.emailPlaceholder")}
            />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-blue-500 px-3 py-2 
                text-xs font-semibold text-white shadow-sm"
              >
                {t("footer.Button")}
              </button>
            </div>
          </form>
        </div>
        <div className="mt-8 border-t border-gray-700 border-opacity-10 pt-8 md:flex md:items-center md:justify-between">
          <div className="order-2 flex">
            {socialMediaData.map((platform, index) => (
              <Link
                to="#"
                key={index}
                href="#"
                className="text-gray-500 text-opacity-100"
              >
                <span className="clip-hidden whitespace-no-wrap absolute m-[-1px] h-1 w-1 overflow-hidden border-0 p-0">
                  {platform.name}
                </span>
                {platform.icon}
              </Link>
            ))}
          </div>
          <p className="mt-8 text-xs leading-5 text-gray-500 dark:text-gray-100 md:order-1 md:mt-0">
            © {new Date().getFullYear()} {t("footer.User")}, Inc.
            {` ${t("footer.copyright")}`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
