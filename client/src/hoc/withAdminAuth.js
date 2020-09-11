import { useAdminAuth } from '../customHooks'

const WithAdminAuth = props => useAdminAuth(props) && props.children; // if useAdminAuth returns user render props.children else it should redirect with useAdminAuth

export default WithAdminAuth