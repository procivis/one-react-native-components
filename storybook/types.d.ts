declare module '*.png' {
  import { ImageRequireSource } from 'react-native'
  const content: ImageRequireSource
  export = content;
}
