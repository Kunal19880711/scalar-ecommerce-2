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

    ADMINUSER_ENTITY_NAME: "Admin User",

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
    CANCEL_BTN_LABEL: "Cancel",

    ADMINUSER_TABLE_COL_NAME: "Name",
    ADMINUSER_TABLE_COL_EMAIL: "E-Mail",
    COL_ACTIONS: "Actions",

    MICROSERVICE_ENTITY_NAME: "Microservice",

    MICROSERVICE_FORM_TITLE_CREATE_MICROSERVICE: "Create Microservice",
    MICROSERVICE_FORM_TITLE_UPDATE_MICROSERVICE: "Update Microservice",
    MICROSERVICE_FORM_SERVICE_NAME_LABEL: "Service Name",
    MICROSERVICE_FORM_SERVICE_NAME_ERR_MSG: "Service Name is mandatory",
    MICROSERVICE_FORM_SERVICE_URL_LABEL: "Service URL",
    MICROSERVICE_FORM_SERVICE_URL_ERR_MSG: "Service URL is mandatory",
    MICROSERVICE_FORM_CREATE_BTN_LABEL: "Create Microservice",
    MICROSERVICE_FORM_UPDATE_BTN_LABEL: "Update Microservice",

    MICROSERVICE_TABLE_COL_SERVICE_NAME: "Service Name",
    MICROSERVICE_TABLE_COL_SERVICE_URL: "Service URL",

    DELETE_MODAL_TITLE: "Delete {ENTITY_NAME}",
    DELETE_MODAL_MSG: "Are you sure you want to delete this {ENTITY_NAME}?",
    DELETE_MODAL_CANCEL_BTN_LABEL: "Cancel",
    DELETE_MODAL_DELETE_BTN_LABEL: "Delete",

    PROFILE_TITLE: "Profile",
    PROFILE_NAME_LABEL: "Name",
    PROFILE_NAME_ERR_MSG: "Name is mandatory",
    PROFILE_EMAIL_LABEL: "E-Mail",
    PROFILE_EMAIL_ERR_MSG: "E-Mail is mandatory",
    PROFILE_VALID_EMAIL_ERR_MSG: "Please enter a valid E-Mail",
    PROFILE_PASSWORD_LABEL: "Password",
    PROFILE_UPDATE_BTN_LABEL: "Update Profile",

    TOASTER_CREATE_SUCCESS: "{ENTITY_NAME} created successfully.",
    TOASTER_UPDATE_SUCCESS: "{ENTITY_NAME} updated successfully.",
    TOASTER_DELETE_SUCCESS: "{ENTITY_NAME} deleted successfully.",
    TOASTER_CREATE_FAIL: "Failed to create {ENTITY_NAME}.",
    TOASTER_UPDATE_FAIL: "Failed to update {ENTITY_NAME}.",
    TOASTER_DELETE_FAIL: "Failed to delete {ENTITY_NAME}.",
  },
});

export default strings;
