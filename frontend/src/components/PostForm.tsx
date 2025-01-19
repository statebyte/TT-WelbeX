import { useAppDispatch } from '../store/hooks'
import { createPost } from '../features/postSlice'
import { useState } from 'react'
import Button from './Button'

interface PostFormProps {
}

const PostForm: React.FC<PostFormProps> = () => {
    const dispatch = useAppDispatch()
    const [content, setContent] = useState('')
    const [mediaUrl, setMediaUrl] = useState('')

    const handleSubmit = async () => {
        await dispatch(createPost({ content, mediaUrl }))
        setContent('')
        setMediaUrl('')
    }

    return (
        <div className="flex gap-2 mb-4">
            <input
                placeholder="Что нового?"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="border p-2 flex-1"
            />
            <input
                placeholder="Media URL"
                value={mediaUrl}
                onChange={e => setMediaUrl(e.target.value)}
                className="border p-2 flex-1"
            />
            <Button onClick={handleSubmit} color="blue">
                Опубликовать
            </Button>
        </div>
    )
}

export default PostForm
