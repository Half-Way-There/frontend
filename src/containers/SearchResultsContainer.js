import { connect } from 'react-redux'
import SearchResults from '../components/SearchResults'
import { setData, setSearch } from '../Store/actions'


const mapStateToProps = (state) => ({
  data: state.data,
  searchInfo: state.searchInfo
})
export default connect(mapStateToProps, { setSearch, setData })(SearchResults)