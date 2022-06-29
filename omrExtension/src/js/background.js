var _0x4808 = ["action", "setProfiles", "data", "setNewProfile", "push", "updateProfile", "profileName", "getProfile", "addListener", "onMessage", "runtime"];
let data;
chrome["runtime"]["onMessage"]["addListener"](function (profile, _0x15ddx3, func) {
    if (profile["action"] == "setProfiles") {
        data = profile["data"]
    }
    if (profile["action"] == "setNewProfile") {
        data["push"](profile["data"])
    }
    if (profile["action"] == "updateProfile") {
        for (let tmp_profile in data) {
            if (data[tmp_profile]["profileName"] == profile["data"]["profileName"]) {
                data[tmp_profile] = profile["data"]
            }
        }
    }
    if (profile["action"] === "getProfile") {
        for (let tmp_profile of data) {
            if (tmp_profile["profileName"] == profile["profileName"]) {
                func(tmp_profile);
                return true
            }
        }
    }
});