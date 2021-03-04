import { connect } from "react-redux"
import Login from "../components/Login"
import { setData } from "../state/actions"

export default connect(null, { setData })(Login)
