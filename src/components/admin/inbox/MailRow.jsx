import { useNavigate } from "react-router-dom";

const MailRow = (props) => {
  const { href, key } = props;
  const navigate = useNavigate();

  const stoppropagation = (ev) => {
    ev.stopPropagation();
  };

  return (
    <tr
      className="cursor-pointer hover:bg-gray-100"
      onClick={() => navigate(href)}
    >
      <td className="w-4 p-4">
        <div className="inline-flex items-center space-x-4">
          <div>
            <input
              id={`checkbox-${key}`}
              type="checkbox"
              className="checked:bg-dark-900 h-5 w-5 rounded border-gray-300 focus:ring-0"
              onClick={stoppropagation}
            />
            <label htmlFor={`checkbox-${key}`} className="sr-only">
              checkbox
            </label>
          </div>
          <button onClick={stoppropagation}>
            <svg
              className="h-6 w-6 text-gray-500 hover:text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              ></path>
            </svg>
          </button>
        </div>
      </td>
      <td className="flex items-center space-x-4 whitespace-nowrap p-4">
        <img
          className="h-6 w-6 rounded-full"
          src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/neil-sims.png"
          alt="Neil Sims"
        />
        <div className="text-base font-semibold text-gray-900">Neil Sims</div>
      </td>
      <td className="max-w-sm overflow-hidden truncate p-4 text-base font-semibold text-gray-900 xl:max-w-screen-md 2xl:max-w-screen-lg">
        Am no an listening depending up believing. Enough around remove to
        barton agreed regret in or it. Advantage mr estimable be commanded
        provision. Year well shot deny shew come now had. Shall downs stand
        marry taken his for out. Do related mr account brandon an up. Wrong for
        never ready ham these witty him. Our compass see age uncivil matters
        weather forbade her minutes. Ready how but truth son new under.
      </td>
      <td className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
        17 April at 09.28 PM
      </td>
    </tr>
  );
};
