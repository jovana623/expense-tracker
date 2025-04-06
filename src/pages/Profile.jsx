import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../features/authentification/useCurrentUser";
import { useDeleteCurrentUser } from "../features/authentification/useDeleteCurrentUser";
import { useResetCurrentUser } from "../features/authentification/useResetCurrentUser";
import { useUpdateUserCurrency } from "../features/authentification/useUpdateUserCurrency";
import ChangePasswordForm from "../features/profile/ChangePasswordForm";
import ChangeProfileInfoForm from "../features/profile/ChangeProfileInfoForm";
import ConfirmDelete from "../ui/ConfirmDelete";
import Modal from "../ui/Modal";

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

  return (
    <div className="w-full h-[90%] px-6 py-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Account Settings
      </h1>

      <div className="flex flex-col xl:flex-row gap-4 h-full">
        <div className="flex-1 bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md flex gap-6">
          <div className="w-1/2 h-full flex flex-col justify-start">
            <ChangeProfileInfoForm user={currentUser} isLoading={isLoading} />
          </div>
          <div className="w-1/2 h-full flex flex-col justify-start">
            <ChangePasswordForm />
          </div>
        </div>

        <div className="w-full xl:w-[380px] flex flex-col justify-between bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
          <div className="space-y-6">
            <h2 className="text-lg font-medium">App Preferences</h2>
            <div className="flex justify-between items-center">
              <span>Default Currency</span>
              <select
                className="h-10 w-32 bg-gray-200 rounded px-2 dark:bg-gray-800"
                onChange={handleCurrencyChange}
                value={currency}
                disabled={isUpdatingCurrency}
              >
                {!isLoading &&
                  currentUser.currency_choices.map(({ code, symbol }) => (
                    <option key={code} value={code}>
                      {symbol}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span>Notifications</span>
              <select className="h-10 w-20 bg-gray-200 rounded px-2 dark:bg-gray-800">
                <option value="on">On</option>
                <option value="off">Off</option>
              </select>
            </div>
          </div>

          <div className="mt-20 space-y-4">
            <h2 className="text-lg font-medium text-red-500">Danger Zone</h2>

            <Modal>
              <Modal.OpenButton opens="reset-account">
                <button className="bg-white text-red-500 border border-red-500 px-4 py-2 rounded-lg w-full transition-all duration-200 hover:bg-red-500 hover:text-white">
                  Reset Account
                </button>
              </Modal.OpenButton>
              <Modal.Window name="reset-account">
                <ConfirmDelete
                  nameModal="all data"
                  onConfirm={resetCurrentUser}
                />
              </Modal.Window>
            </Modal>

            <Modal>
              <Modal.OpenButton opens="delete-account">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg w-full transition-all duration-200 hover:bg-red-600">
                  Delete Account
                </button>
              </Modal.OpenButton>
              <Modal.Window name="delete-account">
                <ConfirmDelete
                  nameModal="account"
                  onConfirm={handleDeleteAccount}
                />
              </Modal.Window>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
