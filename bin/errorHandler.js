const errorHandler = (argv) => {
    if (!argv.u) {
        throw new Error("Vault username parameter is missing!");
    }

    if (!argv.p) {
        throw new Error("Vault password parameter is missing!");
    }

    if (!argv.origin) {
        throw new Error("Vault origin parameter is missing!");
    }

    if (!argv.path) {
        throw new Error("Vault secret path parameter is missing!");
    }
};

module.exports = errorHandler;
