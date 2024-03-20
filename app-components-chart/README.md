# Deploying Components library Storybook library for React Native

#### Check existing pods:

```shell
kubectl -n components get pods
```

### Update the deployment:

* Verify template
```shell
helm template . --values values/app-components.dev.procivis-one.yaml
```

* Install StoryBook
```shell
helm upgrade --install react-native . --values values/app-components.dev.procivis-one.yaml --namespace default
```

* Uninstall
```shell
helm uninstall react-native-component --namespace default
```
