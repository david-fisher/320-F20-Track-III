import axios from 'axios';

import { baseURL } from './../Constants/Config';

// Universal fetch request using axios
export default function universalFetch(
    setResponse,
    endpoint,
    onError,
    onSuccess
) {
    console.log('Fetch started');
    setResponse({
        data: null,
        loading: true,
        error: null,
    });
    console.log('sets response');
    axios
        .get(baseURL + endpoint)
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
            console.log(`Fetch failed with error ${err.message}`);
            setResponse({
                data: null,
                loading: false,
                error: err,
            });
            onError && onError(err);
        });
}
