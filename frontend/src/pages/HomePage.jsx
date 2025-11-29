// import '../index.css'

import Navbar from "../components/Navbar"
import { useState } from "react"
import RateLimitedToast from "../components/RateLimitedToast" 
import NoteCard from "../components/NoteCard"
import { useEffect } from "react"
import { toast } from "react-hot-toast"
import api from "../lib/axios"
import CardIsNotFound from "../components/CardIsNotFound"


const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(true);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/notes");
        setNotes(response.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log('Error fetching notes:', error.response);
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);


  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedToast/>}
      {/* {notes} */}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isLoading && <div className="text-center text-primary py-10">Loading notes...</div>}
        
        {notes.length <= 0 && !isRateLimited && <CardIsNotFound/>}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}</div>
        )}
      </div>
    </div>
  )
}

export default HomePage
