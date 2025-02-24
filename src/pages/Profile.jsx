import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../features/authentification/useCurrentUser";
import { useDeleteCurrentUser } from "../features/authentification/useDeleteCurrentUser";
import ChangePasswordForm from "../features/profile/ChangePasswordForm";
import ChangeProfileInfoForm from "../features/profile/ChangeProfileInfoForm";
import ConfirmDelete from "../ui/ConfirmDelete";
import Modal from "../ui/Modal";
import { useResetCurrentUser } from "../features/authentification/useResetCurrentUser";

function Profile() {
  const { data: currentUser, isLoading } = useCurrentUser();
  const { deleteCurrentUser } = useDeleteCurrentUser();
  const { resetCurrentUser } = useResetCurrentUser();
  const navigate = useNavigate();

  function handleDeleteAccount() {
    deleteCurrentUser();
    navigate("/login");
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
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
          </div>
          <div className="flex justify-between items-center">
            <span>Notifications</span>
            <div className="h-10 w-10 bg-gray-200 rounded"></div>
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
