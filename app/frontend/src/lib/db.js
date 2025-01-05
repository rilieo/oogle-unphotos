import { API } from "../constants";

export const get = async (route, searchParams) => {
    fetch(`${API}/api/${route}?${searchParams}`);
};

export const post = async (route, data) => {
    fetch(`${API}/api/${route}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
};

export const fetchData = async (fn) => {
  let data = [];

  try {
    const response = await fn();
    const dataObj = await response.json();
    
    if (data.message) {
      alert('Failed to fetch data');
      console.error(data.message);
      return;
    }

    data = dataObj;

  } catch (error) {
    console.log(error);
    console.error('Error fetching photos:', error);
  }
};