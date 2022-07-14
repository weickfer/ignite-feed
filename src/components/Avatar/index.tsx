import { ImgHTMLAttributes } from 'react'
import styles from './styles.module.css'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  withBorder?: boolean;
}

export function Avatar({ withBorder = true, ...imgProps }: AvatarProps) {
  return (
    <img
      className={withBorder ? styles.containerWithBorder : styles.defaultContainer}
      {...imgProps}
    />
  )
}

//"https://github.com/weickfer.png"