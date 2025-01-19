import { Post } from "../features/postSlice";
import { useAppSelector } from '../store/hooks';
import { useAppDispatch } from '../store/hooks';
import { deletePost } from '../features/postSlice';
import Button from "./Button";

interface CardProps {
    post: Post;
    onEdit: (post: Post) => void;
}

const Card: React.FC<CardProps> = ({ post, onEdit }) => {
    const login = useAppSelector(state => state.auth.login);
    const dispatch = useAppDispatch();

    const isImage = (url: string) => /\.(jpg|jpeg|png|gif)$/i.test(url);
    const isYouTubeVideo = (url: string) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/i.test(url);

    const handleDelete = async () => {
        await dispatch(deletePost(post.id));
    };

    return (
        <div key={post.id} className="bg-white border overflow-hidden border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-4">
            {post.mediaUrl && isImage(post.mediaUrl) && <img className="rounded-t-lg" src={post.mediaUrl} alt="" />}
            {post.mediaUrl && isYouTubeVideo(post.mediaUrl) && (
                <iframe
                    className="rounded-t-lg"
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${new URL(post.mediaUrl).searchParams.get('v')}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            )}
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.content}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">От {post.author.login} в {new Date(post.createdAt).toLocaleString()}</p>
                {login === post.author.login && (
                    <div className="flex space-x-2">
                        <Button onClick={() => onEdit(post)} color="green">
                            Редактировать
                        </Button>
                        <button onClick={handleDelete} className="text-red-600">Удалить</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Card;