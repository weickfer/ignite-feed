import staticPosts from '../posts.static.json'

import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";

import styles from './styles/App.module.css'

export default function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar /> 

        <main>
          {
            staticPosts.data.map(({ author, ...post }) => (
              <Post
                key={post.id}
                author={{
                  name: author.name,
                  avatarUrl: author.avatar_url,
                  role: author.role
                }}
                content={post.content}
                publishedAt={post.published_at}
              />
            ))
          }
        </main>
      </div>
    </>
  )
}
