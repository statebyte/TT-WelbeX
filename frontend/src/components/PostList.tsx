import { Post } from "../features/postSlice"
import Card from "./Card"
import { useState } from 'react'
import PostForm from "./PostForm"

interface PostListProps {
    posts: Post[]
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
    const [editPost, setEditPost] = useState<Post | null>(null)

    const handleEdit = (post: Post) => {
        setEditPost(post)
    }

    const handleEditComplete = () => {
        setEditPost(null)
    }

    return (
        <div className="mt-4">
            {editPost && <PostForm editPost={editPost} onEditComplete={handleEditComplete} />}
            {posts.length === 0 && <div className="text-center">No posts yet</div>}
            {[...posts].sort((a, b) => b.id - a.id).map(post => (
                <Card key={post.id} post={post} onEdit={handleEdit} />
            ))}
        </div>
    )
}

export default PostList
