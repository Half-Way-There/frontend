import { connect } from 'react-redux'
import Header from '../components/Header'
import { clearUser } from '../Store/actions'



export default connect(null, { clearUser })(Header)