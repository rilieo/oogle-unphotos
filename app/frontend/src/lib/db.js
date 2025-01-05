import { API } from "../constants";

export const get = async (route, searchParams) => {
    return fetch(`${API}/api/${route}?${searchParams}`);
};

export const post = async (route, data) => {
    return fetch(`${API}/api/${route}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
};

export const fetchData = async (fn) => {
  try {
    const response = await fn();
    const data = await response.json();
    
    if (data.length === 0) {
      alert('No data found');
      console.log( 'No data found');
      return [];
    }

    return data;

  } catch (error) {
    alert(error);
    console.log(error);
    return [];
  }
};