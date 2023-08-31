import { useEffect, useState } from 'react';
import { db } from '../firebase.config';
import { collection, onSnapshot } from 'firebase/firestore';

const useGetData = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const collectionRef = collection(db, collectionName);

    const getData = async () => {
      try {
        // Firestore realtime data update
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
          setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          setLoading(false);
        });

        return () => {
          // Unsubscribe from the snapshot listener when component unmounts
          unsubscribe();
        };
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    getData();
  }, [collectionName]);

  return { data, loading };
};

export default useGetData;
