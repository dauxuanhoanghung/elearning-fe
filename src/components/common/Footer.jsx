import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import logo from "@/assets/logo.png";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../Icons";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <footer className="mx-auto max-w-7xl px-6 pb-8 pt-8 sm:pt-12 lg:px-8 lg:pt-20">
      <div className="xl:grid xl:grid-cols-3 xl:gap-8">
        <img className="h-40" src={logo} alt={t("footer.User")} />
        <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-md font-semibold leading-6 text-gray-700">
                {t("footer.Solutions")}
              </h3>
              <ul role="list" className="mt-6">
                <li>
                  <a href="#" className="text-xs leading-6 text-gray-600">
                    {t("footer.Marketing")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs leading-6 text-gray-600">
                    {t("footer.Analytics")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs leading-6 text-gray-600">
                    {t("footer.Commerce")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs leading-6 text-gray-600">
                    {t("footer.Insights")}
                  </a>
                </li>
              </ul>
            </div>
            <div className="kw ckv">
              <h3 className="text-md font-semibold leading-6 text-gray-700">
                {t("footer.Support")}
              </h3>
              <ul role="list" className="abw mt-6">
                <li>
                  <a href="#" className="text-xs leading-6 text-gray-600">
                    {t("footer.Pricing")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs leading-6 text-gray-600">
                    {t("footer.Documentation")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs leading-6 text-gray-600">
                    {t("footer.Guides")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs leading-6 text-gray-600">
                    {t("footer.APIStatus")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-md font-semibold leading-6 text-gray-700">
                {t("footer.Company")}
              </h3>
              <ul role="list" className="abw mt-6">
                <li>
                  <a href="#" className="text-xs leading-6 text-gray-600">
                    {t("footer.About")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs leading-6 text-gray-600">
                    {t("footer.Blog")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs leading-6 text-gray-600">
                    {t("footer.Jobs")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs leading-6 text-gray-600">
                    {t("footer.Press")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs leading-6 text-gray-600">
                    {t("footer.Partners")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-md font-semibold leading-6 text-gray-700">
                {t("footer.Legal")}
              </h3>
              <ul role="list" className="mt-6">
                <li>
                  <a href="#" className="text-xs leading-6 text-gray-600">
                    {t("footer.Claim")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs leading-6 text-gray-600">
                    {t("footer.Privacy")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs leading-6 text-gray-600">
                    {t("footer.Terms")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 border-opacity-10 pt-8 sm:mt-12 lg:mt-12 lg:flex lg:items-center lg:justify-between">
        <div>
          <h3 className="text-xs font-semibold leading-6 text-gray-700">
            {t("footer.Subscribe")}
          </h3>
          <p className="mt-2 text-xs leading-6 text-gray-600">
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
          <a href="#" className="text-gray-500 text-opacity-100">
            <span className="clip-hidden whitespace-no-wrap absolute m-[-1px] h-1 w-1 overflow-hidden border-0 p-0">
              Facebook
            </span>
            <FacebookIcon />
          </a>
          <a href="#" className="text-gray-500 text-opacity-100">
            <span className="clip-hidden whitespace-no-wrap absolute m-[-1px] h-1 w-1 overflow-hidden border-0 p-0">
              Instagram
            </span>
            <InstagramIcon />
          </a>
          <a href="#" className="text-gray-500 text-opacity-100">
            <span className="clip-hidden whitespace-no-wrap absolute m-[-1px] h-1 w-1 overflow-hidden border-0 p-0">
              Twitter
            </span>
            <TwitterIcon />
          </a>
          <a href="#" className="text-gray-500 text-opacity-100">
            <span className="clip-hidden whitespace-no-wrap absolute m-[-1px] h-1 w-1 overflow-hidden border-0 p-0">
              GitHub
            </span>
            <GithubIcon />
          </a>
          <a href="#" className="text-gray-500 text-opacity-100">
            <span className="clip-hidden whitespace-no-wrap absolute m-[-1px] h-1 w-1 overflow-hidden border-0 p-0">
              YouTube
            </span>
            <YoutubeIcon />
          </a>
        </div>
        <p className="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">
          © {new Date().getFullYear()} {t("footer.User")}, Inc.
          {" " + t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
