import { Post } from "../features/postSlice";

interface CardProps {
    post: Post
}

const Card: React.FC<CardProps> = ({ post }) => {
    return (<div key={post.id} className="bg-white border overflow-hidden border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-4">
        <a href="#">
            {post.mediaUrl && <img className="rounded-t-lg" src={post.mediaUrl} alt="" />}
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.content}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">От {post.author.login} в {new Date(post.createdAt).toLocaleString()}</p>
        </div>
    </div>);
}

export default Card;