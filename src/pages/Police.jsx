import { React, useState, useEffect } from 'react'
import { doc, collection, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db, storage } from "../firebase";
import "@pathofdev/react-tag-input/build/index.css"
import Spinner from '../components/spinner';
import { toast } from "react-toastify";
import Tags from '../components/Tags';
import TagsPage from "./TagsPage"
import PoliceCards from '../components/PoliceCards';
import ScrollToTop from '../utility/ScrollToTop'
import AboutPolice from "../components/AboutPolice"

const Police = ({ user, setActive }) => {

  const [loading, setLoading] = useState(true);
  const [polices, setPolices] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "polices"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        })
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setPolices(list);
        setLoading(false);
        setActive("home")
      }, (error) => {
        console.log(`Error:`, error);
      }
    )
    return () => {
      unsub();
    }
  }, [setActive]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the Police Details?")) {
      try {
        setLoading(true)
        await deleteDoc(doc(db, "polices", id));
        toast.success("Police Data Deleted Sucessfully!")
        setLoading(false);
      } catch (err) {
        console.log(`Error`, err);
      }
    }
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div>
      <ScrollToTop />
      <AboutPolice />
      <PoliceCards polices={polices} user={user} handleDelete={handleDelete} />
    </div>
  )
}

export default Police


