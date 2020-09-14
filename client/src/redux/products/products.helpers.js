import { firestore } from '../../firebase/config'

export const handleAddProduct = product => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .doc()
            .set(product)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const handleFetchProducts = () => {
    return new Promise(async (resolve, reject) => {
        try {

            const productsCollection = await firestore.collection('products').get()
            console.log(productsCollection.docs)
            const productsArray = productsCollection.docs.map(doc => {
                return {
                    ...doc.data(),
                    documentID: doc.id
                }
            })
            console.log(productsArray)
            resolve(productsArray)

        } catch (error) {
            console.log(error)
            reject(error)
        }



        // firestore
        //   .collection('products')
        //   .get()
        //   .then(snapshot => {
        //       const productsArray = snapshot.docs.map(doc => {
        //           return {
        //               ...doc.data(),
        //               documentID: doc.id
        //           }
        //       })
        //       resolve(productsArray)
        //   })
        //   .catch(err => {
        //       reject(err)
        //   })
    })
}

export const handleDeleteProduct = documentID => {

    return new Promise(async (resolve, reject) => {
        
        try {
            await firestore.collection('products').doc(documentID).delete()
            resolve()
        } catch (err) {
            console.log(err)
            reject(err)
        }
       
    })
}