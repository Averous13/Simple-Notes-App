import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import api from '../lib/axios'
import toast from 'react-hot-toast'
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from 'lucide-react'

const NoteDetailPage = () => {
    const [note, setNote] = useState('');
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect( () => {
        const fetchNote = async () =>
        {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data);
            } catch(error) {
                console.log("Error in fetching note", error);
                toast.error("Failed to fetch note");
            } finally {
                setLoading(false)
            }
        }


        fetchNote()
    }, [id])

    if (loading) {
        return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <LoaderIcon className="animate-spin size-10" />
        </div>
        )
    }

    const handleDelete = async () => {
        if (!window.confirm("Are you sure want to delete this note?") )return;

        try {
            await api.delete(`/notes/${id}`);
            toast.success('Note deleted succesfully');
            navigate('/');
        } catch (error) {
            console.log('Error deleting note:', error);
            toast.error("Failed to delete note")
        }
    }

    const handleSave = async () => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Please change the note");
            return;
        }

        setSaving(true);

        try {
            await api.put(`/notes/${id}`, note);
            toast.success("Note updated successfully"); 
            navigate('/');
        } catch (error) {
            console.log("Error saving note",error);
            toast.error("Failed to Update");
        } finally {
            setSaving(false);
        }
    }



    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeftIcon className="h-5 w-5" />
                            Back to Notes
                        </Link>
                        <button onClick={handleDelete} className="btn btn-error btn-outline">
                            <Trash2Icon className="h-5 w-5" />
                            Delete Note
                        </button>
                    </div>

                    <div className="card bg-base-100">
                        <div className="card-body">
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    className="input input-bordered"
                                    type="text"
                                    placeholder="Note Title" 
                                    value={note.title}
                                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                                />
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Content</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered"
                                    placeholder="Write your note here..." 
                                    value={note.content}
                                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                                />
                            </div>

                            <div className="card-actions justify-end"> 
                                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                                    {saving ? "Saving..." : "Save changes"}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default NoteDetailPage