import { PencilLine } from 'phosphor-react'

import { Avatar } from '../Avatar'
import styles from './styles.module.css'

export function Sidebar() {
  return (
    <aside className={styles.container}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50" 
      />

      <div className={styles.profile}>
        <Avatar src="https://github.com/weickfer.png" />

        <strong>Weickmam Ferreira</strong>
        <span>Backend Developer</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}