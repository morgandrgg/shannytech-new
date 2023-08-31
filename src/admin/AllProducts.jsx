import { useEffect, useState } from 'react';
import { db } from '../firebase.config';
import { collection, getDocs } from 'firebase/firestore';

const useGetData = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName]);

  return { data, loading };
};

export default useGetData;
