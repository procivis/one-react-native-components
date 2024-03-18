# Deploying Components library Storybook library for React Native

#### Check existing pods:

```shell
kubectl -n components get pods
```

Update the deployment:

Verify template

```shell
helm template . --values values/app-components.dev.eid-plus.yaml
```

```shell
helm upgrade --install react-native-components . --values values/app-components.dev.eid-plus.yaml --namespace components
```
