import axios from 'axios';
//import { baseURL } from './../Constants/Config';
// Universal fetch request using axios
export default function universalFetch(
    setResponse,
    endpoint,
    onError,
    onSuccess,
    requestBody
) {
    console.log('Fetch started');
    setResponse({
        data: null,
        loading: true,
        error: null,
    });
    const baseURL = 'http://127.0.0.1:8000/api/';
    axios
        .post(baseURL + endpoint, requestBody)
        .then((resp) => {
            console.log('Response received');
            console.log(resp);
            setResponse({
                data: resp.data,
                loading: false,
                error: null,
            });
            onSuccess && onSuccess();
        })
        .catch((err) => {
            console.log(`Post failed with error ${err.message}`);
            setResponse({
                data: null,
                loading: false,
                error: err,
            });
            onError && onError();
        });
}
