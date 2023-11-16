## get-vault-credential

### Installation

```shell
npm install get-vault-credential # with npm
yarn add get-vault-credential # with yarn
```

### Usage

```bash
get-vault-credential \
    -u vault_username \ # Vault username
    -p vault_password \ # Vault password
    --origin https://vault.example.com \ # Vault server origin
    --path secret/test/data/local_env # Path of secret engine
```
