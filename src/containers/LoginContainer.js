import { connect } from 'react-redux'
import Login from '../components/Login'
import { setUser } from '../Store/actions/user.actions'



export default connect(null, { setUser })(Login)
