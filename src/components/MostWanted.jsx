import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, storage } from "../firebase";
import { Link } from "react-router-dom";
import Spinner from '../components/spinner';
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    limit,
    onSnapshot,
    query,
    orderBy,
    where,
    startAfter,
} from "firebase/firestore";


const MostWanted = ({ user }) => {
    const navigate = useNavigate();
    const [criminals, setCriminals] = useState([]);
    const [mostWantedCriminals, setmostWantedCriminals] = useState([]);
    const [loading, setLoading] = useState(true);

    //THIS IS USING QUERY APPROACH
    const getMostWanted = async () => {
        const criminalRef = collection(db, "criminals");
        const mostWantedQuery = query(criminalRef, where("mostWanted", "==", "yes"));
        const querySnapshot = await getDocs(mostWantedQuery);
        let mostWantedCriminals = [];
        querySnapshot.forEach((doc) => {
            mostWantedCriminals.push({ id: doc.id, ...doc.data() });
        });
        setmostWantedCriminals(mostWantedCriminals);
    };

    // APPROACH II
    useEffect(() => {
        getMostWanted();
        const unsub = onSnapshot(
            collection(db, "criminals"),
            (snapshot) => {
                let list = [];
                snapshot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                })
                setCriminals(list);
                // console.log(`Criminals`, criminals);
                // setMWFunction(list) Linked to line 50
                // console.log(`Most WANTED`, mwList);
                setLoading(false)
            }, (error) => {
                console.log(`Error:`, error);
            }
        )
        return () => {
            unsub();
            getMostWanted()
        }
    }, []);

    // function setMWFunction(criminals) {
    //     let mwList = [];
    //     for (let i = 0; i < criminals.length; i++) {
    //         if (criminals[i].mostWanted === "yes") {
    //             mwList.push(criminals[i]);
    //         }
    //     }
    //     setmostWantedCriminals(mwList);
    // }


    if (loading) {
        return <Spinner />
    }
    return (
        <div className="mostWantedCriminalContainer">
            <h1 className='mostWantedCriminalTitle criminalHeading'>Most Wanted</h1>
            <div className="criminalCardMainContainer">
                {mostWantedCriminals?.map((item) => (
                    <div className="criminalCardContainer" key={item.id}>
                        <div className="criminalCardConatiner Flex-center">
                            <div className="criminalImage Flex-center">
                                <img src={item.imgUrl} alt="" />
                            </div>
                            <div className="criminalName Flex-center">
                                {item.fullName}
                            </div>
                            <div className="criminalCrime Flex-center">
                                <div>Icon</div>
                                <div>{item.crimeCategory}</div>
                            </div>
                            <div className="criminalTime Flex-center">
                                <div>Icon</div>
                                {item.timestamp.toDate().toDateString()}
                            </div>
                            <Link to={`/CriminalDetail/${item.id}`}>
                                <button
                                    className="btnF btn-criminalReadMore Flex-center">
                                    Read More
                                </button>
                            </Link>
                            <div className="CardfooterElements">
                                {(user?.uid === item.userId) && (
                                    <Link to={`/update/${item.id}`}>
                                        <div className="btn-delete-container">
                                            <button
                                                className="btnF btn-edit"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </Link>
                                )}
                                {(user?.uid === item.userId) && (
                                    <div className="btn-delete-container">
                                        <button
                                            className="btnF btn-delete"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    );
}

export default MostWanted
