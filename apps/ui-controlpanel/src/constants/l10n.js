import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    LOGIN_TITLE: "Login",
    LOGIN_EMAIL_LABEL: "Enter your E-Mail",
    LOGIN_EMAIL_ERR_MSG: "E-Mail is mandatory",
    LOGIN_PASSWORD_LABEL: "Enter your Password",
    LOGIN_PASS_ERR_MSG: "Password is mandatory",
    LOGIN_BTN_LABEL: "Login",
    LOGIN_RESET_PASSWORD: "Forgot your Password?",

    RESET_PASS_TITLE: "Reset Password",
    RESET_PASS_EMAIL_LABEL: "Enter your E-Mail",
    RESET_PASS_EMAIL_ERR_MSG: "E-Mail is mandatory",
    RESET_PASS_GENERATE_OTP_BTN_LABEL: "Generate OTP",
    RESET_PASS_OTP_LABEL: "Enter OTP",
    RESET_PASS_OTP_ERR_MSG: "OTP is mandatory",
    RESET_PASS_PASSWORD_LABEL: "Enter new Password",
    RESET_PASS_PASS_ERR_MSG: "Password is mandatory",
    RESET_PASS_BTN_LABEL: "Reset Password",
    RESET_PASS_LOGIN_HERE: "Login here",
  },
});

export default strings;
