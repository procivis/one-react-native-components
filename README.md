# @procivis/one-react-native-components

Common Procivis ONE UI components for react-native

## Installation

```sh
npm install @procivis/one-react-native-components
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## NPM package release management

> **_NOTE:_** Git working directory should be clean (haven't uncommitted changes)

Provide new package version with (Select from list)

```shell
npm version <newversion> [major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]
```

- Provide version from git

```shell
npm version patch
# Response might be like: v0.2.2
```

> **_NOTE:_** _New commit will be created and tagged automatically_

- (Optional) Change commit message

```shell
npm run commit -- 'v0.2.2: Fixes'
```

- Publish package to registry

```shell
git push origin v0.2.2
```

---

# Contribution

## Prerequisites

For using private Procivis registry you need to create [Personal Access token](https://gitlab.procivis.ch/-/profile/personal_access_tokens)
with API permissions

##### Libraries in the Procivis Private Registry

- @procivis/react-native-picker

As this project still use `yarn v1.22.21` we need to manage `~/.npmrc` file.
File `.yarnrc` or `.yarnrc.yml` not supported for authorization.

Run the following commands (this command add config to your `~/.npmrc` file)

```shell
export NPM_TOKEN=<your_personal_token>
npm config set -- @procivis:registry https://gitlab.procivis.ch/api/v4/packages/npm/
npm config set -- //gitlab.procivis.ch/:_authToken ${NPM_TOKEN}
npm config set -- //gitlab.procivis.ch/api/v4/packages/npm/:_authToken ${NPM_TOKEN}
```
