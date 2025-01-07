import { API } from "../constants/constants";

export const fetchData = async (route, searchParams) => {
  try {
    const response = await fetch(`${API}/api/${route}?${searchParams}`);
    const data = await response.json();
    
    if (data.message) {
      console.log(data.message);
      return { error: data.message };
    }
    else if (data.length === 0) {
      console.log('No data found');
      return { error: 'No data found' };
    }

    return data;
  } catch (error) {
    console.log(error);
    return { error: error };
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
      console.log(responseData.message);
      return { error: responseData.message };
    }
    else if (responseData.length === 0) {
      console.log('No data found');
      return { error: 'No data found' };
    }

    return responseData;
  } catch(error) {
    console.log(error);
    return { error: error };
  }
};