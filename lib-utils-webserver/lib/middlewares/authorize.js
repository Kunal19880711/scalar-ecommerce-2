import User from "models/UserSchema";
import constants from "lib-constants-system";

const { userRoles } = constants;

function authorizeUserRole(allowedRoles) {
  return async (req, res, next) => {
    const userId = req.body.user?.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findOne({
      _id: userId,
      role: { $in: allowedRoles },
    });

    if (!user) {
      return res.status(403).json({ success: false, message: "Access Denied" });
    }

    next();
  };
}

export const authorizeAdmin = authorizeUserRole([userRoles.ADMIN]);
export const authorizeUser = authorizeUserRole([userRoles.USER]);
export const authorizePartner = authorizeUserRole([userRoles.PARTNER]);
