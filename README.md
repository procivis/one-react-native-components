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
