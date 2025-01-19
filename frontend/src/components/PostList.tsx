import { Post } from "../features/postSlice"
import Card from "./Card"

interface PostListProps {
    posts: Post[]
}

const PostList: React.FC<PostListProps> = ({posts}) => {
    return (
        <div className="mt-4">
            {posts.length === 0 && <div className="text-center">No posts yet</div>}
            {[...posts].sort((a, b) => b.id - a.id).map(post => (
                <Card post={post} />
            ))}
        </div>
    )
}

export default PostList
