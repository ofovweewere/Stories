"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDisplayName = void 0;
function UserDisplayName(req) {
    var diff_ms = Date.now() - req.body.birthDate.getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970) + "";
}
exports.UserDisplayName = UserDisplayName;
//# sourceMappingURL=CalculateAge.js.map