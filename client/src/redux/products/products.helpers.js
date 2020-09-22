import { firestore } from '../../firebase/config'
import { getSnapShotFromUserAuth } from '../User/user.sagas'

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

export const handleFetchProducts = ({ payload: { filterType, startAfterDoc, persistProducts=[] } }) => {
    const countSize = 6
    return new Promise(async (resolve, reject) => {


        let ref = firestore.collection('products').orderBy("createdDate").limit(countSize)
        if (filterType) ref = ref.where('productCategory', '==', filterType)
        if (startAfterDoc) ref = ref.startAfter(startAfterDoc)

        try {

            const productsCollection = await ref.get()
            const totalCount = productsCollection.size
            const data = [...persistProducts, ...productsCollection.docs.map(doc => {
                return {
                    ...doc.data(),
                    documentID: doc.id
                }
            })
            ]
            resolve({
                data,
                queryDoc: productsCollection.docs[totalCount - 1],
                isLastPage: totalCount < 1
            })

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