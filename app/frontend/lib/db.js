import { API } from "../constants/constants";

export const fetchData = async (route, searchParams) => {
  try {
    const response = await fetch(`${API}/api/${route}?${searchParams}`);
    const data = await response.json();
    
    if (data.message) {
      alert(data.message);
      console.log(data.message);
      return [];
    }
    else if (data.length === 0) {
      alert('No data found');
      console.log('No data found');
      return [];
    }

    return data;
  } catch (error) {
    alert(error);
    console.log(error);
    return [];
  }
};

export const postData = async (route, data) => {
  try {
    const response = await fetch(`${API}/api/${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    
    if (responseData.message) {
      alert(responseData.message);
      console.log(responseData.message);
      return [];
    }
    else if (responseData.length === 0) {
      alert('No data found');
      console.log('No data found');
      return [];
    }

    return responseData;
  } catch(error) {
    alert(error);
    console.log(error);
    return [];
  }
};