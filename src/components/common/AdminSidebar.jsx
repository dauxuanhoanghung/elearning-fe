const AdminSidebar = () => {
  return (
    <nav
      id="sidebar-menu"
      class="sidebar-area fixed h-screen  w-64 shadow-sm transition-all duration-500 ease-in-out"
    >
      <div class="scrollbars h-full overflow-y-auto bg-white dark:bg-gray-800">
        <div class="mh-18 py-5 text-center">
          <h2 class="hidden-compact max-h-9 overflow-hidden px-4 text-2xl font-semibold text-gray-200">
            <img
              class="-mt-1 inline-block h-8 w-8 ltr:mr-2 rtl:ml-2"
              src="/img/logo.png"
            />
            <span class="text-gray-700 dark:text-gray-200">Reactdash</span>
          </h2>
          <h2 class="logo-compact mx-auto hidden text-3xl font-semibold">
            <img class="-mt-1 inline-block h-8 w-8" src="/img/logo.png" />
          </h2>
        </div>
        <ul
          id="side-menu"
          class="float-none flex w-full flex-col font-medium ltr:pl-1.5 rtl:pr-1.5"
        >
          <li class="active relative">
            <button
              aria-expanded="false"
              aria-controls="content0"
              class="flex w-full flex-row items-center justify-between px-6 py-2.5 hover:text-indigo-500 dark:hover:text-gray-300"
            >
              <span class=" flex items-center">
                <span class="inline-block h-4 w-4 ltr:mr-3 rtl:ml-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                  >
                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"></path>
                  </svg>
                </span>
                <span class="text">Dashboards</span>
              </span>
              <span class="text inline-block ltr:float-right rtl:float-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  class="mt-1.5 h-3 w-3 -rotate-90 transform transition duration-300 rtl:rotate-90"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  ></path>
                </svg>
              </span>
            </button>
            <ul
              aria-expanded="false"
              class="cpt top-full z-50 mb-1 hidden rounded rounded-t-none py-0.5 font-normal ltr:pl-7 ltr:text-left rtl:pr-7 rtl:text-right"
            >
              <li>
                <a
                  aria-current="page"
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 text-indigo-600 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/home/cms"
                >
                  CMS
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/home/analytics"
                >
                  Analytics
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/home/ecommerce"
                >
                  Ecommerce
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/home/projects"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/home/crm"
                >
                  CRM
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/home/hosting"
                >
                  Hosting
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/home/saas"
                >
                  Saas
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/home/sales"
                >
                  Sales
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/home/marketing"
                >
                  Marketing
                </a>
              </li>
            </ul>
          </li>
          <li class="relative">
            <button
              aria-expanded="false"
              aria-controls="content1"
              class="flex w-full flex-row items-center justify-between px-6 py-2.5 hover:text-indigo-500 dark:hover:text-gray-300"
            >
              <span class=" flex items-center">
                <span class="inline-block h-4 w-4 ltr:mr-3 rtl:ml-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                  >
                    <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"></path>
                  </svg>
                </span>
                <span class="text">Ecommerce</span>
              </span>
              <span class="text inline-block ltr:float-right rtl:float-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  class="mt-1.5 h-3 w-3 -rotate-90 transform transition duration-300 rtl:rotate-90"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  ></path>
                </svg>
              </span>
            </button>
            <ul
              aria-expanded="false"
              class="cpt top-full z-50 mb-1 hidden rounded rounded-t-none py-0.5 font-normal ltr:pl-7 ltr:text-left rtl:pr-7 rtl:text-right"
            >
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/ecommerce/products"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/ecommerce/product-detail"
                >
                  Product detail
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/ecommerce/orders"
                >
                  Orders
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/ecommerce/order-detail"
                >
                  Order detail
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/ecommerce/customers"
                >
                  Customers
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/ecommerce/shopping-cart"
                >
                  Shopping Cart
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/ecommerce/checkout"
                >
                  Checkout
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/ecommerce/sellers"
                >
                  Sellers
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/ecommerce/invoice"
                >
                  Invoice
                </a>
              </li>
            </ul>
          </li>
          <li class="relative">
            <button
              aria-expanded="false"
              aria-controls="content2"
              class="flex w-full flex-row items-center justify-between px-6 py-2.5 hover:text-indigo-500 dark:hover:text-gray-300"
            >
              <span class=" flex items-center">
                <span class="inline-block h-4 w-4 ltr:mr-3 rtl:ml-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                  >
                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"></path>
                  </svg>
                </span>
                <span class="text">Projects</span>
              </span>
              <span class="text inline-block ltr:float-right rtl:float-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  class="mt-1.5 h-3 w-3 -rotate-90 transform transition duration-300 rtl:rotate-90"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  ></path>
                </svg>
              </span>
            </button>
            <ul
              aria-expanded="false"
              class="cpt top-full z-50 mb-1 hidden rounded rounded-t-none py-0.5 font-normal ltr:pl-7 ltr:text-left rtl:pr-7 rtl:text-right"
            >
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/project/project-lists"
                >
                  Lists
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/project/project-detail"
                >
                  Details
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/project/kanban"
                >
                  Kanban
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/project/create-project"
                >
                  Create
                </a>
              </li>
            </ul>
          </li>
          <li class="relative">
            <button
              aria-expanded="false"
              aria-controls="content3"
              class="flex w-full flex-row items-center justify-between px-6 py-2.5 hover:text-indigo-500 dark:hover:text-gray-300"
            >
              <span class=" flex items-center">
                <span class="inline-block h-4 w-4 ltr:mr-3 rtl:ml-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                  >
                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"></path>
                    <path d="M4.5 12.5A.5.5 0 0 1 5 12h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 10h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm1.639-3.708 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V8.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V8s1.54-1.274 1.639-1.208zM6.25 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"></path>
                  </svg>
                </span>
                <span class="text">Pages</span>
              </span>
              <span class="text inline-block ltr:float-right rtl:float-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  class="mt-1.5 h-3 w-3 -rotate-90 transform transition duration-300 rtl:rotate-90"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  ></path>
                </svg>
              </span>
            </button>
            <ul
              aria-expanded="false"
              class="cpt top-full z-50 mb-1 hidden rounded rounded-t-none py-0.5 font-normal ltr:pl-7 ltr:text-left rtl:pr-7 rtl:text-right"
            >
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/pages/profile"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/pages/services"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/pages/faq"
                >
                  Faq
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/pages/pricing"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/maintenance"
                >
                  Maintenance
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/pages/404"
                >
                  404
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/dashboard/pages/starter"
                >
                  Starter
                </a>
              </li>
            </ul>
          </li>
          <li class="relative">
            <button
              aria-expanded="false"
              aria-controls="content4"
              class="flex w-full flex-row items-center justify-between px-6 py-2.5 hover:text-indigo-500 dark:hover:text-gray-300"
            >
              <span class=" flex items-center">
                <span class="inline-block h-4 w-4 ltr:mr-3 rtl:ml-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                    ></path>
                  </svg>
                </span>
                <span class="text">Auth</span>
              </span>
              <span class="text inline-block ltr:float-right rtl:float-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  class="mt-1.5 h-3 w-3 -rotate-90 transform transition duration-300 rtl:rotate-90"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  ></path>
                </svg>
              </span>
            </button>
            <ul
              aria-expanded="false"
              class="cpt top-full z-50 mb-1 hidden rounded rounded-t-none py-0.5 font-normal ltr:pl-7 ltr:text-left rtl:pr-7 rtl:text-right"
            >
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/auth2/register"
                >
                  Register Cover
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/auth2/login"
                >
                  Login Cover
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/auth3/register"
                >
                  Register Ilustration
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/auth3/login"
                >
                  Login Ilustration
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/auth/register"
                >
                  Register Basic
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/auth/login"
                >
                  Login Basic
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/auth/forgot"
                >
                  Forgot Password
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/auth/confirm"
                >
                  Confirm Email
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/auth/change-password"
                >
                  Change Password
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/auth/logout"
                >
                  Logout Page
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              class="block px-6 py-2.5 hover:text-indigo-500 dark:hover:text-gray-300"
              href="/landing-page"
            >
              <span class="flex items-center">
                <span class="inline-block ltr:mr-3 rtl:ml-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                  >
                    <path d="M2.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"></path>
                    <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v2H1V3a1 1 0 0 1 1-1h12zM1 13V6h4v8H2a1 1 0 0 1-1-1zm5 1V6h9v7a1 1 0 0 1-1 1H6z"></path>
                  </svg>
                </span>
                <span class="text">Landing Page</span>
              </span>
            </a>
          </li>
          <li class="relative">
            <button
              aria-expanded="false"
              aria-controls="content6"
              class="flex w-full flex-row items-center justify-between px-6 py-2.5 hover:text-indigo-500 dark:hover:text-gray-300"
            >
              <span class=" flex items-center">
                <span class="inline-block h-4 w-4 ltr:mr-3 rtl:ml-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                  >
                    <path d="M14 2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12zM2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z"></path>
                    <path d="M3 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"></path>
                  </svg>
                </span>
                <span class="text">Layouts</span>
              </span>
              <span class="text inline-block ltr:float-right rtl:float-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  class="mt-1.5 h-3 w-3 -rotate-90 transform transition duration-300 rtl:rotate-90"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  ></path>
                </svg>
              </span>
            </button>
            <ul
              aria-expanded="false"
              class="cpt top-full z-50 mb-1 hidden rounded rounded-t-none py-0.5 font-normal ltr:pl-7 ltr:text-left rtl:pr-7 rtl:text-right"
            >
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/side-dark"
                >
                  Side Dark
                </a>
              </li>
              <li>
                <a
                  class="clear-both block w-full whitespace-nowrap px-6 py-2 hover:text-indigo-500 dark:hover:text-gray-300"
                  href="/compact"
                >
                  Compact
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div class="px-4">
          <div class="box-banner">
            <div class="my-8 rounded-lg bg-gray-300 bg-opacity-50 p-4 text-center dark:bg-gray-700">
              <h4 class="mb-2 inline-block font-bold">Sales Report</h4>
              <div class="mb-3 text-sm">
                Monthly sales report is ready for download!
              </div>
              <div class="grid">
                <a href="/" target="_blank">
                  <button
                    class="inline-block rounded border border-pink-500 bg-pink-500 px-4 py-2 text-center font-semibold leading-5 text-gray-100 hover:border-pink-600 hover:bg-pink-600 hover:text-white hover:ring-0 focus:border-pink-600 focus:bg-pink-600 focus:outline-none focus:ring-0"
                    type="button"
                  >
                    Download
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminSidebar;
