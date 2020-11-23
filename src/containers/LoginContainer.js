import { connect } from 'react-redux'
import Login from '../components/Login'
import { setData } from '../Store/actions'



export default connect(null, { setData })(Login)