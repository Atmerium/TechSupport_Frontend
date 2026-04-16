import { useState, useEffect } from 'react';
import type { Comment } from '../Interfaces/CommentInterface';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../Context/AuthContext';
import { useCookies } from 'react-cookie';



const Comments = () => {
    const [cookies] = useCookies(['user']);
    const { isLoggedIn } = useAuth();
    const { buildId } = useParams<{ buildId: string }>();
    const navigate = useNavigate();

    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [newComment, setNewComment] = useState("");

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    const loadComments = async () => {
        try {
            const response = await fetch('http://localhost:3000/comments');
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            const data = await response.json();

            const filteredComments = data.filter((comment: Comment) => comment.buildId === Number(buildId));
            setComments(filteredComments);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    const handleSubmit = async () => {
        if (!newComment.trim()) return;

        const newCommentPayload = {
            commentText: newComment,
            commentDate: new Date().toISOString(),
            commentVisible: true,
            userId: cookies.user?.userId,
            buildId: Number(buildId)
        };

        try {
            const response = await fetch('http://localhost:3000/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCommentPayload)
            });

            if (!response.ok) {
                throw new Error('Failed to post comment');
            }

            setNewComment("");
            await loadComments();
        } catch (err) {
            console.error('Error posting comment:', err);
            alert("Sikertelen beküldés. Kérjük ellenőrizze az API kapcsolatát!");
        }
    };

    useEffect(() => {
        if (buildId) {
            setLoading(true);
            loadComments().finally(() => setLoading(false));
        }
    }, [buildId]);

    if (loading) {
        return <div className="container mt-5 text-center"><div className="spinner-border text-primary"></div><p>Kommentek betöltése...</p></div>;
    }
    if (error) {
        return <div className="container mt-5 alert alert-danger">Hiba: {error}</div>;
    }

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-4" onClick={() => navigate('/building')}>
                &larr; Vissza az összeállítottakhoz
            </button>
            <h2 className="mb-4">Hozzászólások a konfigurációhoz</h2>
            
            {comments.length === 0 ? (
                <div className="alert alert-info">Jelenleg nincsenek kommentek ehhez az összeállításhoz.</div>
            ) : (
                <div className="row">
                    {comments.map((comment) => (
                        comment.commentVisible !== false && (
                            <div key={comment.commentId} className="col-12 mb-3">
                                <div className="card shadow-sm border-0">
                                    <div className="card-body bg-body-tertiary rounded">
                                        <p className="card-text fs-5">{comment.commentText}</p>
                                        <div className="text-end text-muted small mt-2">
                                            <span>Felhasználó ID: {comment.userId}</span>
                                            <span className="ms-3">| Dátum: {new Date(comment.commentDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}
            {!isLoggedIn && (
                <div className="alert alert-warning mt-4">
                    Hozzászóláshoz kérjük <a href="/login" className="alert-link">jelentkezz be</a>!
                </div>
            )}
            {isLoggedIn && (
                <div className="card shadow-sm border-0 mt-4">
                    <div className="card-body bg-body-tertiary rounded">
                        <h4 className="card-title mb-3">Új hozzászólás</h4>
                        <div className="mb-3">
                            <textarea 
                                className="form-control" 
                                rows={1} 
                                value={newComment}
                                onChange={handleTextareaChange}
                                placeholder="Írd le a véleményed..."
                                style={{ minHeight: '60px', resize: 'none', overflow: 'hidden' }}
                            ></textarea>
                        </div>
                        <div className="text-end">
                            <button className="btn btn-primary" onClick={handleSubmit} disabled={!newComment.trim()}>
                                Küldés
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Comments;