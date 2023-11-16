## get-vault-credential

### Installation

```shell
npm install get-vault-credential # with npm
yarn add get-vault-credential # with yarn
```

### Usage

-   Set up a record with the secret engine KV in the same format as the `.env` file:

    ![Instruction 1](/doc/images/instruction_1.png)

-   Then use the path of the newly created record as the value for the `--path` option:

    ![Instruction 2](/doc/images/instruction_2.png)

-   Execute command `get-vault-credential` with options:

    ```bash
    npx get-vault-credential \
        -u vault_username \ # Vault username
        -p vault_password \ # Vault password
        --origin https://vault.example.com \ # Vault server origin
        --path secret/test/data/local_env # Path of secret engine
    ```

-   After executing the command above, you will get the `.env` file with content similar to the content of the record on the vault server along with the version of that record:

    ![Instruction 3](/doc/images/instruction_3.png)
