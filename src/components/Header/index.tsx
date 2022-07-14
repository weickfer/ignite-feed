import styles from './styles.module.css'

import logoImg from '../../assets/logo.svg'

export function Header() {
  return (
    <header className={styles.container}>
      <div>
        <img src={logoImg} alt="Logo do Ignite" />
        <strong>Ignite Feed</strong>
      </div>
    </header>
  )
}