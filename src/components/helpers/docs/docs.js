import { Document } from './docModel.js';
import { setGlobal, getGlobal } from 'reactn';
import { encryptContent } from 'blockstack';
import { postData } from '../../helpers/storage/post';
import { Value } from 'slate';
import initialValue from './initialValue.json';

export async function newDoc() {
    const doc = new Document();
    await setGlobal({ loading: true, docs: [...getGlobal().docs, doc ], title: "", content: Value.fromJSON(initialValue)});
    const publicKey = JSON.parse(localStorage.getItem('graphite_keys')).GraphiteKeyPair.public;
    const data = getGlobal().docs;
    const encryptedData = await encryptContent(JSON.stringify(data), {publicKey: publicKey})
    const docParams = {
        content: encryptedData,
        filePath: '/documents/index.json',
        provider: "ipfs"
    }
    const docCollection = await postData(docParams);
    console.log(docCollection);
    window.location.replace(`${window.location.origin}/documents/${doc.id}`)
}

export async function deleteDoc(doc) {
    setGlobal({ loading: true })
    let docs = await getGlobal().docs;
    let index = await docs.map((x) => {return x.id }).indexOf(doc.id);
    docs.splice(index, 1);
    await setGlobal({ docs });
    const publicKey = JSON.parse(localStorage.getItem('graphite_keys')).GraphiteKeyPair.public;
    const data = getGlobal().docs;
    const encryptedData = await encryptContent(JSON.stringify(data), {publicKey: publicKey})
    const docParams = {
        content: encryptedData,
        filePath: '/documents/index.json',
        provider: "ipfs"
    }
    const docCollection = await postData(docParams);
    console.log(docCollection);
    setGlobal({ loading: false})
}