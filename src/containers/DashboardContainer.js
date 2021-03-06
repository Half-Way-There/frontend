import { connect } from "react-redux"
import Dashboard from "../components/Dashboard"
import { setData } from "../state/actions"

const mapStateToProps = (state) => ({
  user: state.data.user,
  contacts: state.data.contacts,
})

export default connect(mapStateToProps, { setData })(Dashboard)
