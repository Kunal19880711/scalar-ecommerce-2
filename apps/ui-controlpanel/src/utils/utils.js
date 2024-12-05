import constants from "../constants/constants";
import l10n from "../constants/l10n";
const { toasterSeverity } = constants;

export const entityChangeTypes = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
};

export function getToasterParams({ entityName, changeType, success }) {
  const successTmpl = {
    [entityChangeTypes.CREATE]: l10n.TOASTER_CREATE_SUCCESS,
    [entityChangeTypes.UPDATE]: l10n.TOASTER_UPDATE_SUCCESS,
    [entityChangeTypes.DELETE]: l10n.TOASTER_DELETE_SUCCESS,
  };
  const failureTmpl = {
    [entityChangeTypes.CREATE]: l10n.TOASTER_CREATE_FAIL,
    [entityChangeTypes.UPDATE]: l10n.TOASTER_UPDATE_FAIL,
    [entityChangeTypes.DELETE]: l10n.TOASTER_DELETE_FAIL,
  };
  if (success) {
    return {
      msg: successTmpl[changeType].replace("{ENTITY_NAME}", entityName),
      severity: toasterSeverity.SUCCESS,
    };
  }

  return {
    msg: failureTmpl[changeType].replace("{ENTITY_NAME}", entityName),
    severity: toasterSeverity.ERROR,
  };
}
