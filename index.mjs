// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./database.mjs";

let user = 10;

getUserData(user)

async function getUserData(user) {
    let userObj = {}
    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3
    };

    try {
        const centralDbs = await central(user)
        const vaultData = await vault(user)
        const centralData = await dbs[centralDbs](user)

        userObj = {
            "id" : user,
            "name" : vaultData.name,
            "email" : vaultData.email,
            "address" : vaultData.address,
            "phone" : vaultData.phone,
            "website" : centralData.website,
            "company" : centralData.company,
        }
        
        return console.log(userObj)

    } catch (error) {
        console.error(error)

    }


}





