#!/usr/bin/env node
require("dotenv").config();
const yargs = require("yargs");
const _path = require("path");
const fs = require("fs");

const errorHandler = require("./errorHandler");
const { envObjectToString, envStringToObject } = require("./transform");

const { u: username, p: password, origin, path } = yargs.argv;

errorHandler(yargs.argv);

const config = {
    vault: {
        apiVersion: "v1",
        endpoint: origin,
        username,
        password,
        envPath: path,
    },
    envFilePath: _path.resolve(".env"),
};

const versionKey = "_VAULT_VERSION";

const vault = require("node-vault")({
    apiVersion: config.vault.apiVersion,
    endpoint: config.vault.endpoint,
});

const login = async () => {
    const res = await vault.userpassLogin({
        username: config.vault.username,
        password: config.vault.password,
    });

    vault.token = res.auth.client_token;
};

const getCurrentVersion = () => {
    if (!fs.existsSync(config.envFilePath)) {
        return 0;
    }

    const envFileContent =
        fs.readFileSync(config.envFilePath, {
            encoding: "utf-8",
        }) ?? "";

    const object = envStringToObject(envFileContent);
    return Number(object[versionKey] ?? 0);
};

const run = async () => {
    await login();

    const {
        data: { data, metadata },
    } = await vault.read(config.vault.envPath);

    const { version } = metadata;

    if (version === getCurrentVersion()) {
        return;
    }

    fs.writeFileSync(
        config.envFilePath,
        `${versionKey}=${version}\n\n${envObjectToString(data)}`,
        {
            encoding: "utf-8",
        }
    );
};

run();
