<div role="dialog" className="relative z-20">
  <div
    className="fixed inset-0 bg-black bg-opacity-60 transition-opacity"
    style={{ display: "none" }}
  ></div>
  <div
    className="fixed inset-0 z-10 h-full overflow-y-auto"
    style={{ display: "none" }}
  >
    <div
      id="close-modal"
      className="flex h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
    >
      <div className="overflow-x-hidden">
        <div className="w-[18.75rem] rounded bg-white py-6 dark:bg-gray-800">
          <div>
            <div className="mb-6 flex items-center justify-between px-5">
              <p
                className="text-xl leading-4 tracking-[.01rem] text-black opacity-60 dark:text-white"
                id="modal-title"
                tabindex="0"
              >
                <span>Contact</span> Info
              </p>
              <button
                tabindex="0"
                className="group group flex items-center justify-center rounded-sm border border-gray-200 p-3 px-4 py-2 outline-none transition-all duration-200 ease-out hover:border-red-100 hover:bg-red-100 focus:border-red-100 focus:bg-red-100 focus:outline-none dark:border-white dark:border-opacity-70 dark:hover:border-red-400 dark:hover:bg-red-400 dark:focus:border-red-400 dark:focus:bg-red-400"
              >
                <p className="text-xs font-light leading-4 tracking-[.01rem] text-black opacity-60 outline-none dark:text-white dark:opacity-70">
                  esc
                </p>
              </button>
            </div>
            <div className="w-full p-5 pb-6">
              <div className="flex">
                <div className="mr-5">
                  <button className="outline-none" aria-label="view avatar">
                    <div
                      className="h-[2.375rem] w-[2.375rem] rounded-full bg-cover bg-center"
                      //style='background-image: url("https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=387&amp;q=80");'
                    ></div>
                  </button>
                </div>
                <div className="flex w-full justify-between">
                  <div>
                    <p className="mb-3 mr-5 text-start text-sm font-semibold leading-4 tracking-[.01rem] text-black opacity-60 outline-none dark:text-white dark:opacity-70">
                      <span>Dylan Billy</span>
                    </p>
                    <p className="text-start text-sm font-extralight leading-4 tracking-[.01rem] text-black opacity-60 outline-none dark:text-white dark:opacity-70">
                      <span> Last seen Dec 16, 2019 </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full border-t border-gray-100 py-5 dark:border-gray-700">
              <div className="flex items-center px-5 pb-5">
                <div className="flex w-full items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="mr-6 h-[1.25rem] w-[1.25rem] text-black opacity-50 transition-all duration-200 group-hover:text-indigo-500 group-active:text-indigo-600
              dark:text-white dark:opacity-70 dark:group-hover:text-indigo-300 dark:group-active:text-indigo-400"
                  >
                    <path
                      stroke-linecap="round"
                      d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                    ></path>
                  </svg>
                  <div className="flex grow items-start justify-start">
                    <p className="text-sm font-normal leading-4 tracking-[.01rem] text-black opacity-50 outline-none group-hover:text-indigo-500 group-active:text-indigo-600 dark:text-white dark:opacity-70 dark:group-hover:text-indigo-300 dark:group-active:text-indigo-400">
                      user@gmail.com
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center px-5">
                <div className="flex w-full items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="mr-6 h-[1.25rem] w-[1.25rem] text-black opacity-50 transition-all duration-200 group-hover:text-indigo-500 group-active:text-indigo-600
dark:text-white dark:opacity-70 
dark:group-hover:text-indigo-300 dark:group-active:text-indigo-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    ></path>
                  </svg>
                  <div className="flex grow items-start justify-start">
                    <p className="text-sm font-normal leading-4 tracking-[.01rem] text-black opacity-50 outline-none group-hover:text-indigo-500 group-active:text-indigo-600 dark:text-white dark:opacity-70 dark:group-hover:text-indigo-300 dark:group-active:text-indigo-400">
                      notifications
                    </p>
                  </div>
                  <div
                    role="switch"
                    aria-checked="true"
                    aria-label="Switch checked"
                    className="relative flex select-none outline-none transition-all duration-200 ease-in"
                    tabindex="0"
                  >
                    <input
                      type="checkbox"
                      className="foucs:outline-none absolute right-0 block h-5 w-5 scale-[0.6] cursor-pointer appearance-none rounded-full bg-white transition-all duration-300"
                      tabindex="-1"
                    />
                    <label
                      className="block h-5 w-7 cursor-pointer rounded-full bg-indigo-400 outline-none"
                      tabindex="-1"
                    ></label>
                  </div>
                </div>
              </div>
              <div className="flex items-center px-5 pt-5">
                <button className="group flex w-full items-center outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="mr-6 h-[1.25rem] w-[1.25rem] text-black opacity-50 transition-all duration-200 group-hover:text-indigo-500 group-active:text-indigo-600
dark:text-white dark:opacity-70 
dark:group-hover:text-indigo-300 dark:group-active:text-indigo-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                    ></path>
                  </svg>
                  <div className="flex grow items-start justify-start">
                    <p className="text-sm font-normal leading-4 tracking-[.01rem] text-black opacity-50 outline-none transition-all duration-200 group-hover:text-indigo-500 group-active:text-indigo-600 dark:text-white dark:opacity-70 dark:group-hover:text-indigo-300 dark:group-active:text-indigo-400">
                      shared media
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-[1.25rem] w-[1.25rem] text-black opacity-50 duration-200 group-hover:text-indigo-500 group-active:text-indigo-600
dark:text-white dark:opacity-70 
dark:group-hover:text-indigo-300 dark:group-active:text-indigo-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full border-t border-gray-100 dark:border-gray-700">
              <div className="group px-5 pt-5">
                <button className="group flex w-full items-center outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="mr-6 h-[1.25rem] w-[1.25rem] text-red-400 transition-all duration-200 group-hover:text-red-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    ></path>
                  </svg>
                  <div className="flex grow items-start justify-start">
                    <p className="text-sm font-normal leading-4 tracking-[.01rem] text-red-400 outline-none transition-all duration-200 group-hover:text-red-500">
                      block contact
                    </p>
                  </div>
                </button>
              </div>
              <div className="group px-5 pt-5">
                <button className="group flex w-full items-center outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="mr-6 h-[1.25rem] w-[1.25rem] text-red-400 transition-all duration-200 group-hover:text-red-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    ></path>
                  </svg>
                  <div className="flex grow items-start justify-start">
                    <p className="text-sm font-normal leading-4 tracking-[.01rem] text-red-400 outline-none transition-all duration-200 group-hover:text-red-500">
                      delete contact
                    </p>
                  </div>
                </button>
              </div>
            </div>
            <div
              data-v-3eb397e8=""
              className="relative z-10"
              aria-label="media carousel"
              role="dialog"
              aria-modal="true"
            >
              <div
                className="fixed inset-0 bg-black bg-opacity-60 transition-opacity"
                style={{ display: "none" }}
              ></div>
              <div
                className="fixed inset-0 z-10 overflow-y-auto"
                style={{ display: "none" }}
              >
                <div className="flex h-full flex-col p-5">
                  <div className="flex w-full justify-end">
                    <button
                      className="rounded-full p-2 transition-all duration-200 hover:bg-white hover:bg-opacity-10 active:bg-opacity-20"
                      aria-label="previous item"
                    >
                      <svg
                        data-v-3eb397e8=""
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-7 w-7 stroke-1 text-white"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div
                    data-v-3eb397e8=""
                    className="flex h-full justify-between"
                  >
                    <div
                      data-v-3eb397e8=""
                      className="basis[90%] flex h-full w-full items-center justify-center px-5"
                    >
                      <img
                        data-v-3eb397e8=""
                        src="https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=387&amp;q=80"
                        alt="avatar"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>;
