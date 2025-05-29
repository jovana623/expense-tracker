import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../features/authentification/useCurrentUser";
import { useDeleteCurrentUser } from "../features/authentification/useDeleteCurrentUser";
import { useResetCurrentUser } from "../features/authentification/useResetCurrentUser";
import { useUpdateUserCurrency } from "../features/authentification/useUpdateUserCurrency";
import ChangePasswordForm from "../features/profile/ChangePasswordForm";
import ChangeProfileInfoForm from "../features/profile/ChangeProfileInfoForm";
import ConfirmDelete from "../ui/ConfirmDelete";
import Modal from "../ui/Modal";
import Spinner from "../ui/Spinner";

/* eslint-disable react/prop-types */
function ProfileSectionCard({ children, title }) {
  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-lg flex flex-col">
      {title && (
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
          {title}
        </h2>
      )}
      <div className="flex-grow">{children}</div>
    </div>
  );
}

function Profile() {
  const { data: currentUser, isLoading } = useCurrentUser();
  const { deleteCurrentUser } = useDeleteCurrentUser();
  const { resetCurrentUser } = useResetCurrentUser();
  const { updateUserCurrency, isLoading: isUpdatingCurrency } =
    useUpdateUserCurrency();
  const navigate = useNavigate();

  const currency = localStorage.getItem("currency");

  function handleDeleteAccount() {
    deleteCurrentUser();
    navigate("/login");
  }

  function handleCurrencyChange(e) {
    const newCurrency = e.target.value;
    updateUserCurrency(newCurrency);
  }

  if (isLoading && !currentUser) return <Spinner />;

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 overflow-hidden">
      <div className="flex-grow overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="lg:col-span-2 flex flex-col gap-3 sm:gap-4 overflow-hidden">
          <ProfileSectionCard title="Profile Information" className="flex-grow">
            <ChangeProfileInfoForm user={currentUser} isLoading={isLoading} />
          </ProfileSectionCard>

          <ProfileSectionCard title="Change Password" className="flex-grow">
            <ChangePasswordForm />
          </ProfileSectionCard>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-3 sm:gap-4 overflow-hidden">
          <ProfileSectionCard title="App Preferences" className="flex-shrink-0">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Default Currency
                </span>
                <select
                  className="h-9 w-28 text-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500 border border-gray-300 rounded px-2 focus:ring-1 focus:ring-indigo-500"
                  onChange={handleCurrencyChange}
                  value={currency}
                  disabled={isUpdatingCurrency || isLoading}
                >
                  {!isLoading &&
                    currentUser?.currency_choices?.map(({ code, symbol }) => (
                      <option key={code} value={code}>
                        {symbol} ({code})
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Notifications
                </span>
                <select className="h-9 w-20 text-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500 border border-gray-300 rounded px-2 focus:ring-1 focus:ring-indigo-500">
                  <option value="on">On</option>
                  <option value="off">Off</option>
                </select>
              </div>
            </div>
          </ProfileSectionCard>

          <ProfileSectionCard title="Danger Zone" className="flex-shrink-0">
            <div className="space-y-3">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Be careful, these actions are irreversible.
              </p>
              <Modal>
                <Modal.OpenButton opens="reset-account">
                  <button className="w-full px-3 py-1.5 text-sm text-red-600 dark:text-red-400 bg-white dark:bg-gray-700 border border-red-500 dark:border-red-400 rounded-md transition-all duration-200 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 dark:hover:text-gray-100">
                    Reset Account Data
                  </button>
                </Modal.OpenButton>
                <Modal.Window name="reset-account">
                  <ConfirmDelete
                    nameModal="all your account data"
                    onConfirm={resetCurrentUser}
                  />
                </Modal.Window>
              </Modal>

              <Modal>
                <Modal.OpenButton opens="delete-account">
                  <button className="w-full px-3 py-1.5 text-sm text-white bg-red-500 rounded-md transition-all duration-200 hover:bg-red-600 dark:hover:bg-red-700">
                    Delete Account Permanently
                  </button>
                </Modal.OpenButton>
                <Modal.Window name="delete-account">
                  <ConfirmDelete
                    nameModal="your entire account"
                    onConfirm={handleDeleteAccount}
                  />
                </Modal.Window>
              </Modal>
            </div>
          </ProfileSectionCard>
        </div>
      </div>
    </div>
  );
}

export default Profile;
