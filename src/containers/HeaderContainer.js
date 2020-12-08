import { connect } from 'react-redux'
import Header from '../components/Header'
import { clearUser, setSearch } from '../Store/actions'


const mapStateToProps = (state) => ({
  data: state.data
})

export default connect(mapStateToProps, { setSearch, clearUser })(Header)