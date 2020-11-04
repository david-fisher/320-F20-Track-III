import axios from 'axios';
import { baseURL } from '../Constants/Config';
// Universal fetch request using axios
export default function universalFetch(
    setResponse,
    endpoint,
    onError,
    onSuccess
) {
    console.log('GET started');
    axios
        .get(endpoint)
        .then((resp) => {
            console.log('Response received');
            console.log(resp);
            setResponse(resp.data);
            onSuccess && onSuccess();
        })
        .catch((err) => {
            console.log(`Fetch failed with error ${err.message}`);
            setResponse({
                data: null,
                loading: false,
                error: err,
            });
            onError && onError();
        });
}
