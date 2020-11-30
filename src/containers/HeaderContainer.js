import { connect } from 'react-redux'
import Header from '../components/Header'
import { clearUser } from '../Store/actions'

const mapStateToProps = (state) => ({
  user: state.data.user
})

export default connect(mapStateToProps, { clearUser })(Header)