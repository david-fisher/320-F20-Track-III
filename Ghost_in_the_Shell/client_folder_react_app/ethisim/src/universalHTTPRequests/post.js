import axios from 'axios';
import { baseURL } from '../Constants/Config';
// Universal post request using axios
export default function universalPost(
    setResponse,
    endpoint,
    onError,
    onSuccess,
    requestBody
) {
    console.log('Post started');
    setResponse({
        data: null,
        loading: true,
        error: null,
    });
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
            onSuccess && onSuccess(resp);
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
