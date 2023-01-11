import { React, useState, useEffect } from 'react'
import CriminalCards from "../components/CriminalCards"
import { doc, collection, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db, storage } from "../firebase";
import "@pathofdev/react-tag-input/build/index.css"
import Spinner from '../components/spinner';

const Criminals = ({ setActive, user }) => {

  const [loading, setLoading] = useState(true);
  const [criminals, setCriminals] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "criminals"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        })
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
  }, []);

  if (loading) {
    return <Spinner />
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the Criminal Details?")) {
      try {
        setLoading(true)
        await deleteDoc(doc(db, "criminals", id));
        setLoading(false);
      } catch (err) {
        console.log(`Error`, err);
      }
    }
  }
  // console.log(`Criminals:`, criminals);

  return (
    <div>
      {/* ADD SOMETHING WHICH ADDS THE INFO ON CRIMINAL HEADER */}
      <h1>Criminals</h1>
      <CriminalCards criminals={criminals} user={user} handleDelete={handleDelete} />
    </div>
  )
}

export default Criminals