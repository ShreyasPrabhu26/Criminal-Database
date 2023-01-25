import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

function YourComponent() {
    const [secondDoc, setSecondDoc] = useState(null);
    useEffect(() => {
        // Initialize Firebase
        const firebaseConfig = {
            // your firebase config
        };
        firebase.initializeApp(firebaseConfig);
        const firestore = firebase.firestore();
        // Reference the first collection
        const firstCollection = firestore.collection("firstCollection");
        // Reference the second collection
        const secondCollection = firestore.collection("secondCollection");
        // Add a new document to the first collection with a reference to a document in the second collection
        firstCollection.add({
            name: "John Doe",
            secondRef: secondCollection.doc("document1") // Reference to the document in the second collection
        });
        // Update an existing document in the first collection with a reference to a different document in the second collection
        firstCollection.doc("firstDoc").update({
            secondRef: secondCollection.doc("document2")
        });
        // Retrieve the document in the second collection associated with a document in the first collection
        firstCollection.doc("firstDoc").get().then(firstDoc => {
            const secondRef = firstDoc.data().secondRef;
            secondRef.get().then(secondDoc => {
                setSecondDoc(secondDoc.data());
            });
        });
    }, []);
    return (
        <div>
            {secondDoc && <p>{secondDoc.name}</p>}
        </div>
    );
}
export default YourComponent
