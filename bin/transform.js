const envStringToObject = (string) => {
    if (!string.trim()) {
        return {};
    }
    return string
        .split("\n")
        .filter(Boolean)
        .reduce((prev, item) => {
            const [key, value] = item.split("=");
            return { ...prev, [key]: value };
        }, {});
};

const envObjectToString = (object) => {
    return Object.entries(object)
        .map(([key, value]) => `${key}=${value}`)
        .join("\n");
};

module.exports = { envObjectToString, envStringToObject };
