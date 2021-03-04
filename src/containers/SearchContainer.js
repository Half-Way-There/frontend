import { connect } from "react-redux"
import Search from "../components/Search"
import { setData, setSearch } from "../state/actions"

const mapStateToProps = (state) => ({
  data: state.data,
  searchInfo: state.searchInfo,
})
export default connect(mapStateToProps, { setSearch, setData })(Search)
