import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../components/Modal'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'
import Button from '../../components/forms/Button'
import './styles.scss'
import { addProductStart, fetchProductsStart, deleteProductStart } from '../../redux/products/products.actions'

const Admin = (props) => {

    const dispatch = useDispatch()
    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('mens');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);

    const toggleModal = () => setHideModal(!hideModal)

    const product = useSelector(state => state.productsData.product)
    
    useEffect(() => {
      dispatch(
          fetchProductsStart()
      )
    }, [])

    const resetForm = () => {
        setHideModal(true)
        setProductCategory('mens')
        setProductName('')
        setProductThumbnail('')
        setProductPrice(0)
    }

    const configModal = {
        hideModal,
        toggleModal
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(
            addProductStart({
                productCategory,
                productName,
                productThumbnail,
                productPrice
            })
        )
        resetForm()
    }

    return (
        <div className='admin'>
            <div className="callToActions">
                <ul>
                    <li>
                        <Button style={{padding: '10px'}} onClick={() => toggleModal()}>
                            Add new Product
                        </Button>
                    </li>
                </ul>
            </div>
            <Modal {...configModal}>
                <div className="addNewProductForm">
                    <form onSubmit={handleSubmit}>
                        <h2>Add New Product</h2>
                        <FormSelect
                            label='Category'
                            options={[{
                                value: "mens",
                                name: "Mens"
                            }, {
                                value:"womens",
                                name: "Womens"
                            }]}
                            handleChange={e => setProductCategory(e.target.value)}
                        />

                        <FormInput
                          label="Name"
                          type='text'
                          value={productName}
                          handleChange={e=>setProductName(e.target.value)}
                         />
                          <FormInput
                          label="Main Page URL"
                          type='url'
                          value={productThumbnail}
                          handleChange={e=>setProductThumbnail(e.target.value)}
                         />
                          <FormInput
                          label="Price"
                          type='number'
                          min='0.00'
                          max='10000.00'
                          step='0.01'
                          value={productPrice}
                          handleChange={e=>setProductPrice(e.target.value)}
                         />

                         <Button type="submit">
                             Add Product
                         </Button>
                    </form>
                </div>
            </Modal>
            <div className="manageProducts">
                <table border='0' cellPadding='0' cellSpacing='0'>
                    <tbody>
                        <tr>
                            <th>
                                <h1>Manage Products</h1>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <table className='results' border='0' cellPadding='10' cellSpacing='0'>
                                    <tbody>
                                        {product.map((product, i) => {
                                            const { 
                                                productName,
                                                productThumbnail,
                                                productPrice,
                                                documentID
                                            } = product
                                            return (
                                                <tr key={i}>
                                                    <td>
                                                      <img className="thumb" src={productThumbnail}/>
                                                    </td>
                                                    <td>
                                                        {productName}
                                                    </td>
                                                    <td>
                                                        ${productPrice}
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => {
                                                            
                                                            dispatch(deleteProductStart(documentID))
                                                        }}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Admin
