import ChangePasswordForm from "../features/profile/ChangePasswordForm";
import ChangeProfileInfoForm from "../features/profile/ChangeProfileInfoForm";
import FormContainer from "../features/profile/FormContainer";

function Profile() {
  return (
    <div>
      <FormContainer>
        <ChangeProfileInfoForm />
      </FormContainer>
      <FormContainer>
        <ChangePasswordForm />
      </FormContainer>
    </div>
  );
}

export default Profile;
