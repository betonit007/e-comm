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

export const handleFetchProducts = ({payload: { filterType }}) => {
    console.log('filterType', filterType)
    return new Promise(async (resolve, reject) => {


        let ref = firestore.collection('products').orderBy("createdDate")
       if (filterType) ref = ref.where('productCategory', '==', filterType)

        try {

            const productsCollection = await ref.get()
            console.log(productsCollection)
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