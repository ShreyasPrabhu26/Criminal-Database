import { React, useState, useEffect } from 'react'
import CriminalCards from "../components/CriminalCards"
import { doc, collection, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db, storage } from "../firebase";
import "@pathofdev/react-tag-input/build/index.css"
import Spinner from '../components/spinner';
import { toast } from "react-toastify";
import Tags from '../components/Tags';
import TagsPage from "./TagsPage"
import ScrollToTop from '../utility/ScrollToTop'

const Criminals = ({ setActive, user }) => {

  const [loading, setLoading] = useState(true);
  const [criminals, setCriminals] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "criminals"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        })
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setCriminals(list);
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

  if (loading) {
    return <Spinner />
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the Criminal Details?")) {
      try {
        setLoading(true)
        await deleteDoc(doc(db, "criminals", id));
        TTT.success("Criminal Data Deleted Sucessfully!")
        setLoading(false);
      } catch (err) {
        console.log(`Error`, err);
      }
    }
  }
  // console.log(`Criminals:`, criminals);

  return (
    <div>
      <ScrollToTop />
      {/* ADD SOMETHING WHICH ADDS THE INFO ON CRIMINAL HEADER */}
      <h1 className='criminalHeading'>Criminals</h1>
      <CriminalCards criminals={criminals} user={user} handleDelete={handleDelete} />
      {/* <TagsPage tags={tags} /> */}
    </div>
  )
}

export default Criminals;