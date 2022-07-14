import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from '../Avatar'
import { Comment } from '../Comment'

import styles from './styles.module.css'

interface PostProps {
  author: {
    name: string;
    avatarUrl: string;
    role: string;
  };
  content: Array<{
    type: 'paragraph' | 'anchor' | 'hashtag'
    content: string;
    url?: string;
  }>;
  publishedAt: string;
}

type Comment = {
  id: number;
  content: string;
  commentedAt: Date;
}

export function Post({ 
  author: { name, avatarUrl, role },
  content,
  publishedAt
}: PostProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const publishedAtDate = new Date(publishedAt)
  const publishedDateFormatted = format(publishedAtDate, `d 'de' LLLL 'ás' HH:mm'h'`, {
    locale: ptBR
  })

  const publishedDateRelativeNow = formatDistanceToNow(publishedAtDate, {
    locale: ptBR,
    addSuffix: true,
  })

  const postContent = content.filter(text => text.type !== 'hashtag')
  const hashtags = content.filter(text => text.type === 'hashtag')

  const handleSendNewComment = (event: FormEvent) => {
    event.preventDefault()

    setComments(lastComments => [...lastComments, {
      id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      content: newComment,
      commentedAt: new Date()
    }])

    setNewComment('')
  }

  const handleCommentInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.setCustomValidity('')
    setNewComment(event.target.value)
  }

  const handleNewCommandInvalid = (event: InvalidEvent<HTMLTextAreaElement>) => {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  const deleteComment = (commentId: number) => {
    const commentsWithoutDeleted = comments.filter(comment => comment.id !== commentId)

    setComments(commentsWithoutDeleted)
  }

  const newCommentIsEmpty = newComment.length === 0

  return (
    <article className={styles.container}>
      <header>
        <div className={styles.author}>
          {/* Place Avatar here */}
          <Avatar src={avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{name}</strong>
            <span>{role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted} 
          dateTime={publishedAtDate.toISOString()}
        >
          {publishedDateRelativeNow}
        </time>
      </header>

      <div className={styles.content}>
        {
          postContent.map(text => {
            if (text.type === 'paragraph') {
              return <p key={text.content}>{text.content}</p>
            }

            if (text.type === 'anchor') {
              return (
                <p key={text.content}>
                  <a href={text.url}>{text.content}</a>
                </p>
              )
            }
          })
        }

        {
          hashtags.length > 0 && (
            <p>
              {
                hashtags.map(hashtag => (
                  <a key={hashtag.content} href={`/hashtags/${hashtag.content.replace('#', '')}`}>
                    {hashtag.content}{' '}
                  </a>
                ))
              }
            </p>
          )
        }
      </div>

      <form className={styles.commentForm} onSubmit={handleSendNewComment}>
        <strong>Deixe seu feedback</strong>

        <textarea 
          placeholder="Deixe seu comentário"
          value={newComment}
          onChange={handleCommentInputChange}
          onInvalid={handleNewCommandInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={newCommentIsEmpty}>Comentar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {
          comments.map(comment => (
            <Comment 
              key={comment.content} 
              data={comment} 
              onDeleteComment={deleteComment}
            />
          ))
        }
      </div>
    </article>
  )
}