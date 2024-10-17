![Procivis One](docs/assets/logo_dark_Procivis_One.png#gh-light-mode-only)
![Procivis One](docs/assets/logo_light_Procivis_One.png#gh-dark-mode-only)

# One Core React Components

React Native UI components for the [Procivis One Wallet][wallet].

The Procivis One Wallet uses the [Procivis One Core][core] for all SSI functionality
via the [One Core React Native SDK][rncore].

The Procivis One Core is a complete solution capable of powering every element
of the digital identity credential lifecycle. See the complete solution [architecture][archi].

## How to use the One Core React Components

- Use the library for UI elements for your digital wallet app
- Use the [Procivis One Wallet][wallet] for a free-standing solution that can be white-labeled
- Use the [One Core React Native SDK][rncore] to embed wallet capabilities into an existing app

## Getting started

### Trial

The fastest way to get started with the Procivis One Wallet is to download the app
from the iOS or Android app stores and [join our Trial Environment][trial].
In the trial environment, you are given control of an organization on our server
solution, the Procivis One Desk, and can quickly begin issuing and verifying credentials.

### Documentation

See our documentation:

- [Core SDK Reference][sdkref]
- [Docs home][docs]

## Installation

```sh
npm install @procivis/one-react-native-components
```

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

## Support

Need support or have feedback? [Contact us](https://www.procivis.ch/en/contact).

## License

Some rights reserved. This library is published under the [Apache License
Version 2.0](./LICENSE).

![Procivis AG](docs/assets/logo_light_mode_Procivis.svg#gh-light-mode-only)
![Procivis AG](docs/assets/logo_dark_mode_Procivis.svg#gh-dark-mode-only)

© Procivis AG, [https://www.procivis.ch](https://www.procivis.ch).

[archi]: https://github.com/procivis#architecture
[core]: https://github.com/procivis/one-core
[docs]: https://docs.procivis.ch/
[rncore]: https://github.com/procivis/react-native-one-core
[sdkref]: https://docs.procivis.ch/sdk/overview
[trial]: https://docs.procivis.ch/trial/intro
[wallet]: https://github.com/procivis/one-wallet
