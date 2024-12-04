import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    APP_NAME: "Control Panel",

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

    NAV_BAR_PAGE_MICROSERVICE: "Micro Services",
    NAV_BAR_PAGE_ADMIN_USERS: "Admins",
    NAV_BAR_SETTING_PROFILE: "Profile",
    NAV_BAR_SETTING_LOGOUT: "Logout",
    NAV_BAR_TOOLTIP_OPEN_SETTINGS: "Open Settings",

    ADMINUSER_FORM_TITLE_CREATE_ADMIN: "Create Admin User",
    ADMINUSER_FORM_TITLE_UPDATE_ADMIN: "Update Admin User",
    ADMINUSER_FORM_NAME_LABEL: "Name",
    ADMINUSER_FORM_NAME_ERR_MSG: "Name is mandatory",
    ADMINUSER_FORM_EMAIL_LABEL: "E-Mail",
    ADMINUSER_FORM_EMAIL_ERR_MSG: "E-Mail is mandatory",
    ADMINUSER_FORM_PASSWORD_LABEL: "Password",
    ADMINUSER_FORM_PASSWORD_ERR_MSG: "Password is mandatory",
    ADMINUSER_FORM_CREATE_BTN_LABEL: "Create Admin",
    ADMINUSER_FORM_UPDATE_BTN_LABEL: "Update Admin",

    ADMINUSER_TABLE_COL_NAME: "Name",
    ADMINUSER_TABLE_COL_EMAIL: "E-Mail",
    ADMINUSER_TABLE_COL_ACTIONS: "Actions",
  },
});

export default strings;
