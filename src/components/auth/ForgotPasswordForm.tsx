import { useTranslation } from "react-i18next";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ForgotPasswordForm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <form className="mt-4 space-y-4 md:space-y-5 lg:mt-5" action="#">
      <div>
        <Label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {t("forgot.email")}
        </Label>
        <Input
          type="email"
          name="email"
          id="email"
          className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          placeholder="name@company.com"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
      >
        Reset passwod
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
