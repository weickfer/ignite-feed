import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Trash, ThumbsUp } from 'phosphor-react'

import personImg from '../../assets/avatars/my-love.jpg'
import { useTime } from '../../hooks/time'

import { Avatar } from '../Avatar'
import styles from './styles.module.css'

interface CommentProps {
  data: {
    id: number;
    commentedAt: Date;
    content: string;
  };
  onDeleteComment(id: number): void;
}

export function Comment({ data: { id, commentedAt, content }, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0)
  const time = useTime(commentedAt)
  const commentedAtFormatted = format(commentedAt, `d 'de' LLLL 'ás' HH:mm'h'`, {
    locale: ptBR
  })

  const handleDeleteComment = () => {
    onDeleteComment(id)
  }

  const handleIncrementLikeCount = () => {
    setLikeCount(likeCount + 1)
  }

  return (
    <div className={styles.container}>
      <Avatar src={personImg} withBorder={false} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Heloísa Martins</strong>
              <time
                title={commentedAtFormatted}
                dateTime={commentedAt.toISOString()}
              >{time}</time>
            </div>

            <button title="Deletar comentário" onClick={handleDeleteComment}>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleIncrementLikeCount}>
            <ThumbsUp /> 
            Aplaudir<span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}