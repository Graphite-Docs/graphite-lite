import axios from 'axios';
const keys = require('../keys/prod');

export async function fetchFile(params) {
    const url = `https://api.pinata.cloud/data/userPinList/hashContains/*/pinStart/*/pinEnd/*/unpinStart/*/unpinEnd/*/pinSizeMin/*/pinSizeMax/*/pinFilter/*/pageLimit/10/pageOffset/0?metadata[keyvalues][ID]={"value":${JSON.stringify(params.filePath)},"op":"eq"}`
    return  axios
        .get(url, {
            headers: {
                'pinata_api_key': keys.PINATA_API_KEY,
                'pinata_secret_api_key': keys.PINATA_SECRET_API_KEY
            }
        })
        .then(async (response) => {
            console.log(response)
            if(response.data.rows.length > 0) {
            console.log(response)
            console.log(response.data.rows[0])
            return axios.get(`https://gateway.pinata.cloud/ipfs/${response.data.rows[0].ipfs_pin_hash}`)
                .then((res) => {
                console.log("returning response...");
                console.log(res)
                return res;
                })
                .catch(error => {
                console.log(error);
                })
            }
        })
        .catch(function (error) {
            console.log(error)
        });
}