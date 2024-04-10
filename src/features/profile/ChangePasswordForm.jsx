function ChangePasswordForm() {
  return (
    <form>
      <label htmlFor="password">New password</label>
      <input type="password" id="password" className="input-field" />
      <label htmlFor="confirmPassword">Confirm passwor</label>
      <input type="password" id="confirmPassword" className="input-field" />
    </form>
  );
}

export default ChangePasswordForm;
