import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { fetchPosts } from "../features/postSlice"
import PostList from "../components/PostList"
import PostForm from "../components/PostForm"

interface HomePageProps {
    
}
 
const HomePage: React.FC<HomePageProps> = () => {
    const dispatch = useAppDispatch()
    const { posts } = useAppSelector(state => state.posts)
    const token = useAppSelector(state => state.auth.token)

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    return (
        <div className="p-4">
            {token && <PostForm />}
            <PostList posts={posts} />
        </div>
    )
}
 
export default HomePage;