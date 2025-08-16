/// <reference types="vite/client" />
/// <reference types="react/jsx-runtime" />

import 'react'

declare module 'react' {
  export * from 'react'
  export { default } from 'react'
  
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any
    }
  }
}