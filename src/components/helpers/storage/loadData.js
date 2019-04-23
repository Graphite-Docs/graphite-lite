import {fetchFile} from './fetch';
import { decryptContent } from 'blockstack';
import { setGlobal } from 'reactn';

export async function loadIPFS() {
    setGlobal({ loading: true });
    const object = {
            provider: 'ipfs',
            filePath: '/documents/index.json'
        };
    //Call fetchFromProvider and wait for response.
    const fetch = await fetchFile(object);
    const privKey = JSON.parse(localStorage.getItem("graphite_keys")).GraphiteKeyPair.private;
    console.log(privKey);
    const decryptedContent =
        decryptContent(fetch.data.content, {
          privateKey: privKey
        });
    if(decryptedContent) {
        setGlobal({ docs: JSON.parse(decryptedContent), loading: false });
    } else {
        setGlobal({ docs: [] });
    }
}