import React, {useState} from 'react'
import Modal from '../../components/Modal'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'
import Button from '../../components/forms/Button'
import './styles.scss'

const Admin = (props) => {

    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('mens');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);

    const toggleModal = () => setHideModal(!hideModal)

    const configModal = {
        hideModal,
        toggleModal
    }

    const handleSubmit = e => {
        e.preventDefault()
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
        </div>
    )
}

export default Admin
