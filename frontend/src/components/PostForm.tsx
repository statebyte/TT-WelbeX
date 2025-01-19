import { useAppDispatch } from '../store/hooks'
import { createPost, Post, updatePost } from '../features/postSlice'
import { useState, useEffect } from 'react'
import Button from './Button'

interface PostFormProps {
    editPost?: Post | null
    onEditComplete?: () => void
}

const PostForm: React.FC<PostFormProps> = ({ editPost, onEditComplete }) => {
    const dispatch = useAppDispatch()
    const [content, setContent] = useState('')
    const [mediaUrl, setMediaUrl] = useState('')

    useEffect(() => {
        if (editPost) {
            setContent(editPost.content)
            setMediaUrl(editPost.mediaUrl || '')
        }
    }, [editPost])

    const handleSubmit = async () => {
        if (editPost) {
            await dispatch(updatePost({ id: editPost.id, content, mediaUrl }))
            if (onEditComplete) onEditComplete()
        } else {
            await dispatch(createPost({ content, mediaUrl }))
        }
        setContent('')
        setMediaUrl('')
    }

    return (
        <div className="flex gap-2 mb-4">
            <div className='flex flex-col w-full'>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{editPost ? 'Редактировать пост' : 'Создать пост'}</h3>
                    </div>
                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label htmlFor="content" className="sr-only">Что нового?</label>
                        <textarea id="content" className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 focus:outline-none" placeholder="Что нового?" required value={content} onChange={e => setContent(e.target.value)}></textarea>
                    </div>
                    <div className="px-4 py-2 bg-white dark:bg-gray-800">
                        <label htmlFor="media" className="sr-only">Media URL</label>
                        <input id="media" type="url" className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 focus:outline-none" placeholder="Media URL" value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <Button onClick={handleSubmit} color={editPost ? "green" : "blue"} disabled={content == ""}>
                            {editPost ? 'Изменить' : 'Опубликовать'}
                        </Button>
                    </div>
                </div>
                <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Оставьте здесь смайлик или &lt;3, если смотрели эту страницу :)</p>
            </div>
        </div>
    )
}

export default PostForm
