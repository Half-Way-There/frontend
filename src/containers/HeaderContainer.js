import { connect } from 'react-redux'
import Header from '../components/Header'
import { clearUser } from '../Store/actions/user.actions'



export default connect(null, { clearUser })(Header)