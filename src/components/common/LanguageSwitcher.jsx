import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { languages } from "@/app/i18n";
import { ArrowDown } from "@/components/Icons";

const LanguageSwitcher = (props) => {
  const { showFull = true, isAdminPage = false } = props;
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  // #region language switcher
  const langBtnRef = useRef();
  const [openLanguage, setOpenLanguage] = useState(false);
  const toggleOpen = () => setOpenLanguage((prev) => !prev);
  const changeLanguage = (e, language) => {
    e.preventDefault();
    i18n.changeLanguage(language);
  };

  const DisplayLanguage = () => {
    return languages
      .filter((lng) => currentLanguage === lng.lang)
      .map((lng, idx) => (
        <React.Fragment key={idx}>
          <lng.icon />
          {showFull && (
            <span className="mr-2 hidden text-black dark:text-gray-200 md:inline md:w-16">
              {lng.text}
            </span>
          )}
        </React.Fragment>
      ));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (langBtnRef.current && !langBtnRef.current.contains(event.target))
        setOpenLanguage(false);
    };
    if (openLanguage) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openLanguage]);
  // #endregion

  return (
    <button
      title="Language switcher"
      ref={langBtnRef}
      className="relative inline-flex items-center rounded-lg px-2 py-2 text-sm font-medium text-gray-50
       hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 dark:text-gray-300 
       dark:hover:bg-gray-700 dark:focus:ring-gray-700 lg:px-3 lg:py-2.5"
      onClick={toggleOpen}
    >
      <DisplayLanguage />
      {showFull && <ArrowDown />}
      <div
        className={classNames(
          "absolute z-50 m-0 my-2 w-48 list-none divide-y-[1px] rounded-sm border-gray-300 bg-white text-base shadow dark:bg-gray-700",
          {
            hidden: !openLanguage,
            block: openLanguage,
            "top-8 lg:top-10": !isAdminPage,
            "-top-8 lg:-top-24": isAdminPage,
          },
        )}
        style={openLanguage ? { transform: "translate(-1.5rem)" } : null}
      >
        <ul className="p-1">
          {languages.map((lng, idx) => (
            <li key={idx}>
              <span
                className="block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100
                          dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={(e) => changeLanguage(e, lng.lang)}
              >
                <div className="inline-flex items-center">
                  <lng.icon className="mr-2 h-3.5 w-3.5" />
                  {lng.fullText}
                </div>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
};

export default LanguageSwitcher;
