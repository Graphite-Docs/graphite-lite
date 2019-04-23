import { getGlobal, setGlobal } from 'reactn';
import { Value } from 'slate';
import {loadIPFS} from '../../helpers/storage/loadData';
import update from 'immutability-helper';
import { postData } from '../storage/post';
import { encryptContent } from 'blockstack';
var timer = null;

export async function loadSingle(id) {
    setGlobal({ loading: true });
    let thisDoc;
    let docs = getGlobal().docs;
    if(docs.length > 0) {
        const filteredDocs = docs.filter(doc => doc.id === id);
        thisDoc = filteredDocs[0];
        await setGlobal({
            title: thisDoc.title, 
            content: Value.fromJSON(thisDoc.content), 
            singleDoc: thisDoc, 
            loading: false
        })
    } else {
        await loadIPFS();
        loadSingle(id);
    }
}

export function handleTitle(e) {
    setGlobal({ title: e.target.value });
    clearTimeout(timer); 
    timer = setTimeout(() => saveDoc(), 1500);
}

export function handleChange(change) {
    setGlobal({ content: change.value })
    clearTimeout(timer); 
    timer = setTimeout(() => saveDoc(), 3000);
}

export async function saveDoc() {
    setGlobal({ autoSave: "Saving..." });
    let singleDoc = getGlobal().singleDoc;
    let docs = getGlobal().docs;
    singleDoc["title"] = getGlobal().title;
    singleDoc["content"] = getGlobal().content.toJSON();
    singleDoc["lastUpdate"] = Date.now();
    const index = await docs.map((x) => {return x.id }).indexOf(singleDoc.id);
    if(index > -1) {
        const updatedDocs = update(getGlobal().docs, {$splice: [[index, 1, singleDoc]]});
        await setGlobal({ docs: updatedDocs, singleDoc});
        const publicKey = await JSON.parse(localStorage.getItem('graphite_keys')).GraphiteKeyPair.public;
        const data = JSON.stringify(getGlobal().docs);
        const encryptedData = await encryptContent(data, { publicKey: publicKey });
        const storageProvider = JSON.parse(localStorage.getItem("storageProvider"));
        const params = {
        content: encryptedData,
        filePath: "/documents/index.json",
        provider: storageProvider,
        update: true
        };

        let postToStorage = await postData(params);
        console.log(postToStorage);
        setGlobal({ autoSave: "Saved"});
    } else {
        console.log("Error with index");
        setGlobal({ autoSave: "Error Saving"});
    }
}