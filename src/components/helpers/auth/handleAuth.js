import { Connect } from "uport-connect";
import { setGlobal, getGlobal } from 'reactn';
import {
makeECPrivateKey,
getPublicKeyFromPrivate
} from "blockstack";
import { makeProfile as profileCheck } from "./profiles";
const uport = new Connect("Graphite", {
  network: "rinkeby"
});
const reqObj =  {
    requested: ["name", "image"],
    verified: ["GraphiteKeyPair"],
    notifications: true
  };
let did;
let didProfile;

export async function signIn() {
        //Create the requested authentication items. 
          uport.requestDisclosure(reqObj);
      
          uport
            .onResponse("disclosureReq")
            .then(async res => {
              console.log(res.payload);
              //Check if one of the verified creds received is the Graphite Keypair.
              if (res.payload.verified) {
                const verifications = res.payload.verified;
                let i;
                let found = false;
                let keypair;
                //There could be multiple verifications, so loop through them. 
                for (i = 0; i < verifications.length; i++) {
                  console.log(verifications[i].claim)
                  if(verifications[i].claim.GraphiteKeyPair) {
                    found = true
                    keypair = verifications[i].claim;
                  }
                }
                if(found) {
                  //Store the keys in local storage for quick access
                  localStorage.setItem('graphite_keys', JSON.stringify(keypair))
                  localStorage.setItem("authProvider", JSON.stringify("uPort"));
                  localStorage.setItem("uPortUser", JSON.stringify(res));
                  setGlobal({
                    loading: true,
                    signedIn: true
                  })
                  //Set the foundProfile variable with the below function:
                  foundProfile(true)
                } else {
                  //If the Graphite Keypair doesn't already exist as a verification, create new keypair.

                  const privateKey = await makeECPrivateKey();
                  const publicKey = await getPublicKeyFromPrivate(privateKey);
                  //Send the verification request (user will have to approve this or risk losing all data)
                  uport.sendVerification(
                    {
                      /*Need to think about this and when it should expire.*/
                      exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000 * 10000000000000000, // Set exp for way in the future until we can figure out key rotation
                      claim: {
                        GraphiteKeyPair: {
                          public: publicKey,
                          private: privateKey
                        }
                      }
                    },
                    "graphite_keys"
                  );
                  //Prep the keypair for local storage since we aren't getting it from uPort on this run.
                  const keyPairClaim = {
                    GraphiteKeyPair: {
                      public: publicKey,
                      private: privateKey
                    }
                  }
                  //After verification is sent, store appropriate data to local storage for quick access. 
                  uport.onResponse("graphite_keys").then(async credential => {
                      localStorage.setItem('graphite_keys', JSON.stringify(keyPairClaim));
                      localStorage.setItem("authProvider", JSON.stringify("uPort"));
                      localStorage.setItem("uPortUser", JSON.stringify(res));
                      setGlobal({
                        loading: true,
                        isSignedIn: true
                      })
                      //set the foundProfile variable with this call
                      foundProfile(true)
                  });
                }
              } else {
                //if no verifications found at all, generate keypair then send it as a new verification.
                const privateKey = await makeECPrivateKey();
                const publicKey = await getPublicKeyFromPrivate(privateKey);
                uport.sendVerification(
                  {
                    /*Need to think about this and when it should expire.*/
                    exp: new Date().getTime() + 30 * 24 * 60 * 60 * 10000000000000000, // 30 days from now
                    claim: {
                      GraphiteKeyPair: {
                        public: publicKey,
                        private: privateKey
                      }
                    }
                  },
                  "graphite_keys"
                );
                uport.onResponse("graphite_keys").then(async credential => {
                  const keyPairClaim = {
                    GraphiteKeyPair: {
                      public: publicKey,
                      private: privateKey
                    }
                  }
                  localStorage.setItem('graphite_keys', JSON.stringify(keyPairClaim))
                  localStorage.setItem("authProvider", JSON.stringify("uPort"));
                  localStorage.setItem("uPortUser", JSON.stringify(res));
                  setGlobal({
                    loading: true,
                    isSignedIn: true
                  })
                  foundProfile(true)
                });
              }
            })
            .then(() => {
              foundProfile(true)
            })
            .catch(error => console.log(error));
}

export function handleSignOut() {
    localStorage.removeItem("profileFound");
    localStorage.removeItem("authProvider");
    localStorage.removeItem("graphite_keys");
    localStorage.removeItem("storageProvider");
    localStorage.removeItem("uPortUser");
    window.location.reload();
}

export async function foundProfile(initialSignIn) {
    console.log(initialSignIn)
    //Here we will query the Graphite DB for the profile and fallback to IPFS if Graphite is inaccessible.
    if (JSON.parse(localStorage.getItem("oauthData"))) {
      return true;
    } else if(JSON.parse(localStorage.getItem('storageProvider')) === 'ipfs') {
      return true;
    } else {
      if (getGlobal().signedIn) {
        let fullProfile;
        did = await JSON.parse(localStorage.getItem("uPortUser")).payload.did;
        didProfile = await JSON.parse(localStorage.getItem("uPortUser")).payload;
        fullProfile = await {
        did: did,
        profile: didProfile,
        profileLastUpdated: Date.now(),
        create: true
        };
        const response = await profileCheck(fullProfile);
        // return response;
        if (response) {
          console.log("response");
          console.log(response);
          if(initialSignIn) {
            console.log("initial sign in");
            window.location.reload();
          } else {
            return response;
          }
        } else if(JSON.parse(localStorage.getItem('profileFound'))) {
          window.location.reload();
        } else {
          console.log("no response");
          if (initialSignIn) {
            console.log("initial sign in");
            window.location.reload();
          }
          return false;
        }
      } else {
        return false;
      }
    }
  }