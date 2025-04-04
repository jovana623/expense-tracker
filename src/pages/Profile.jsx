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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl h-full grid grid-rows-[auto_1fr] gap-6">
      <h1 className="text-2xl font-semibold text-center">Account Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        <ChangeProfileInfoForm user={currentUser} isLoading={isLoading} />
        <ChangePasswordForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="space-y-6">
          <h2 className="text-lg font-medium">App Preferences</h2>
          <div className="flex justify-between items-center">
            <span>Default Currency</span>
            <select
              className="h-10 w-30 bg-gray-200 rounded"
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

            <select className="h-10 w-14 bg-gray-200 rounded">
              <option value="on">On</option>
              <option value="off">Off</option>
            </select>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg font-medium text-red-500">Danger Zone</h2>
          {
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
          }
          {
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
          }
        </section>
      </div>
    </div>
  );
}

export default Profile;
