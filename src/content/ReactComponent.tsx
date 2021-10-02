import React from 'react'

interface IReactComponentProps {
  className?: string
}

export abstract class ReactComponent<T extends IReactComponentProps, V> extends React.Component<T, V> {

  getClassName(): string {
    const className = this.props.className
    if (!className) {
      return ""
    }
    return className
  }
}