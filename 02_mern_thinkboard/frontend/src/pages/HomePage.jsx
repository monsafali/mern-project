import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUi from "../components/RateLimitedUi";
import axios from "axios";
import toast from "react-hot-toast";

function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(true);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error in fettin data", error);
        if (error.response?.status === 429) {
          toast.error("Failed to load data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <h1 className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUi />}
    </h1>
  );
}

export default HomePage;
