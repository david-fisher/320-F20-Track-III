import axios from 'axios';
import { baseURL } from '../Constants/Config';
// Universal delete request using axios
export default function universalDelete(
    setResponse,
    endpoint,
    onError,
    onSuccess,
    requestBody
) {
    console.log('DELETE started');
    setResponse({
        data: null,
        loading: true,
        error: null,
    });
    axios
        .delete(baseURL + endpoint, requestBody)
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
            console.log(`Delete failed with error ${err.message}`);
            setResponse({
                data: null,
                loading: false,
                error: err,
            });
            onError && onError(resp);
        });
}
