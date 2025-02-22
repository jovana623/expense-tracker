import { useCurrentUser } from "../features/authentification/useCurrentUser";
import ChangeProfileInfoForm from "../features/profile/ChangeProfileInfoForm";

function Profile() {
  const { data: currentUser, isLoading } = useCurrentUser();
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl h-full grid grid-rows-[auto_1fr] gap-6">
      <h1 className="text-2xl font-semibold text-center">Account Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        <ChangeProfileInfoForm user={currentUser} isLoading={isLoading} />

        <section className="space-y-6">
          <h2 className="text-lg font-medium">Change Password</h2>
          <div className="space-y-2">
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg w-full">
            Update Password
          </button>
        </section>
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
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg w-full">
            Delete Account
          </button>
        </section>
      </div>
    </div>
  );
}

export default Profile;
