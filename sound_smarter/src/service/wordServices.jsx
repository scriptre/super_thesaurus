import axios from 'axios'

const options = {
  method: 'GET',
  url: 'https://wordsapiv1.p.rapidapi.com/words/hatchback/typeOf',
  headers: {
    'X-RapidAPI-Key': 'd81d65a20emsh02e31624cfbeb50p1432f1jsn1552763ee756',
    'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log('request here', response.data);
} catch (error) {
	console.error(error);
}


const getAll = () => {
  const request = axios(options)
  return request.then(response => response.data)
}

const requestAll = () =>{
  const req = axios.request(options)
  return req.then(response => response.data)
  
}

  
  export default { 
    getAll: getAll, 
    requestAll: requestAll
 
  }