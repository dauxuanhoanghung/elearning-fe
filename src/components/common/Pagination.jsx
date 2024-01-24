import classNames from "classnames";

import { ChevronLeft } from "@/components/Icons";

const Pagination = (props) => {
  const { totalPage, page, onPageChange, maxItems = 5 } = props;
  // Calculate the range of page items to display
  const startPage = Math.max(1, page - Math.floor(maxItems / 2));
  const endPage = Math.min(totalPage, startPage + maxItems - 1);

  // Create an array of page numbers in the range
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const onFirst = () => onPageChange(1);
  const onPrev = () => onPageChange(Math.max(1, page - 1));
  const onNext = () => onPageChange(Math.min(totalPage, page + 1));
  const onLast = () => onPageChange(totalPage);

  return (
    <div className="flex border-x border-gray-200 bg-white bg-gradient-to-r p-0 dark:border-gray-600 dark:bg-gray-900">
      <div className="w-full">
        <div className="mx-auto w-full bg-white bg-gradient-to-r p-2 dark:bg-gray-900 sm:p-6">
          <div className="flex overflow-x-auto py-4 sm:justify-center">
            <ul className="xs:mt-0 mt-2 inline-flex items-center -space-x-px">
              <li>
                <button
                  onClick={onFirst}
                  className="ml-0 inline-flex cursor-pointer rounded-l-lg border border-gray-300 
                  bg-white px-3 py-2 leading-tight text-gray-500 opacity-50 enabled:hover:bg-gray-100
                  enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 
                  enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white"
                >
                  <span>First</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onPrev}
                  className="flex cursor-pointer items-center border border-gray-300 bg-white px-3 py-2.5 
                  leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 
                  dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 
                  enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white"
                >
                  <ChevronLeft />
                </button>
              </li>
              {pageNumbers.map((number) => (
                <li key={number} aria-current="page">
                  <button
                    className={classNames(
                      "w-12 border py-2 leading-tight dark:border-gray-700 dark:bg-gray-700 dark:text-white enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
                      {
                        "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700":
                          number === page,
                        "bg-white text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700":
                          number !== page,
                      },
                    )}
                    onClick={() => onPageChange(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={onNext}
                  className="flex cursor-pointer items-center border border-gray-300 bg-white px-3 py-2.5
                  leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 
                  dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 
                  enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white"
                >
                  <ChevronLeft className="rotate-180" />
                </button>
              </li>
              <li>
                <button
                  onClick={onLast}
                  className="cursor-pointer rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white"
                >
                  <span>Last</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
