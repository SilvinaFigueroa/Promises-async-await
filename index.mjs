// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./database.mjs";

let user = 5;

// getUserData(user)
//  console.time("time")
// async function getUserData(user) {
//     let userObj = {}
//     const dbs = {
//         db1: db1,
//         db2: db2,
//         db3: db3
//     };
//     try {
//         const centralDbs = await central(user)
//         const vaultData = await vault(user)
//         const centralData = await dbs[centralDbs](user)

//         userObj = {
//             "id" : user,
//             "name" : vaultData.name,
//             "email" : vaultData.email,
//             "address" : vaultData.address,
//             "phone" : vaultData.phone,
//             "website" : centralData.website,
//             "company" : centralData.company,
//         }

//         console.log(userObj)
//         console.timeEnd("time")

//     } catch (error) {
//         console.error(error)
//         console.timeEnd("time")
//     }

// }



getUserData(user)
function getUserData(user) {
    console.time("time")
    let userObj = {}
    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3
    };
    // ________________________________________________________________________

    Promise.all([getId(user), getVault(user)])
        .then(([central, vault]) => {
            console.log(`central value ${central}`)
            console.log(`vault value ${vault.name}`)

            const dbsNum = dbs[central];
            // const centralDb = dbsNum(user);

            return dbsNum(user).then(centralDb => {

                userObj = {
                    "id": user,
                    "name": vault.name,
                    "username": centralDb.username,
                    "email": vault.email,
                    "address": vault.address,
                    "phone": vault.phone,
                    "website": centralDb.website,
                    "company": centralDb.company,
                };

                console.log(userObj),
                    console.timeEnd("time")
                });
            })
                .catch(error => {
                    console.error("Promise rejected with error:", error);
                });
        }
 // ________________________________________________________________________


function getId(user) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        try {
                            resolve(central(user))
                        } catch (error) {
                            reject(error);
                        }
                    }, 50)
                })
            }

function getVault(user) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        try {
                            const vaultData = vault(user)
                            resolve(vaultData)

                        } catch (error) {
                            reject(error);
                        }
                    }, 50)
                })
            }