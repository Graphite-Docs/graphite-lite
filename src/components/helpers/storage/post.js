import axios from 'axios';
const keys = require('../keys/prod');

export async function postData(params) {
    const jsonBody = {
        pinataMetadata: {
            name: 'Data',
            keyvalues: {
                ID: params.filePath,
                date: Date.now()
            }
        },
        pinataContent: {
            content: params.content
        }
  
      }
  
    const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
    await axios.post(url, jsonBody, {
      headers: {
        'pinata_api_key': keys.PINATA_API_KEY,
        'pinata_secret_api_key': keys.PINATA_SECRET_API_KEY
      }
    })
    .then((response) => {
      console.log("Saved to the distributed web!")
      console.log(response)
    })
    .then(async () => {
      //Now we need to fetch our pins, filtered by this particular file
      const url = `https://api.pinata.cloud/data/userPinList/hashContains/*/pinStart/*/pinEnd/*/unpinStart/*/unpinEnd/*/pinSizeMin/*/pinSizeMax/*/pinFilter/*/pageLimit/10/pageOffset/0?metadata[keyvalues][ID]={"value":${JSON.stringify(params.filePath)},"op":"eq"}`
      await axios
          .get(url, {
              headers: {
                  'pinata_api_key': keys.PINATA_API_KEY,
                  'pinata_secret_api_key': keys.PINATA_SECRET_API_KEY
              }
          })
          .then(function (response) {
            console.log(response)
            if(response.data.count > 1) {
              const url = `https://api.pinata.cloud/pinning/removePinFromIPFS`;
              const body = {
                ipfs_pin_hash: response.data.rows[1].ipfs_pin_hash
              };
              //Here we need to grab the older pinned hash and remove it.
              axios
              .post(
                  url,
                  body,
                  {
                      headers: {
                          'pinata_api_key': keys.PINATA_API_KEY,
                          'pinata_secret_api_key': keys.PINATA_SECRET_API_KEY
                      }
                  }
              ).then(function (response) {
                console.log("Pins updated.")
              })
              .catch(function (error) {
                console.log(error)
              });
            }
  
          })
          .catch(function (error) {
            console.log(error)
          });
    })
    .catch(error => console.log(error))
}