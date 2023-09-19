export function checkvalidation(email, password) {
  const emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );
  const pwdValidate =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!emailValidate && !pwdValidate)
    return "Either email or password is wrong";
  if (!emailValidate) return "Enter correct email";
  if (!pwdValidate) return "Enter correct password";

  return null;
}
