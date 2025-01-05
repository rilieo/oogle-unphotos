import { useEffect, useState } from "react";
import { fetchData } from "./db";

const useDB = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(fetchData());
  }, []);

  return { data }
}

export default useDB;