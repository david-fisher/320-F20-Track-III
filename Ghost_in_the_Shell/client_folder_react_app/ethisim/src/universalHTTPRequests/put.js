import axios from 'axios';
import { baseURL } from '../Constants/Config';
// Universal put request using axios
export default function universalPut(
    setResponse,
    endpoint,
    onError,
    onSuccess,
    requestBody
) {
    console.log('Put started');
    setResponse({
        data: null,
        loading: true,
        error: null,
    });
    axios
        .put(baseURL + endpoint, requestBody)
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
            console.log(`Put failed with error ${err.message}`);
            setResponse({
                data: null,
                loading: false,
                error: err,
            });
            onError && onError();
        });
}
