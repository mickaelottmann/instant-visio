import { combineReducers } from 'redux'
import { snackbarReducer } from '../components/App/Snackbar/snackbarReducer'
import { SnackbarState } from '../components/App/Snackbar/snackbarSelector'
import { userReducer, UserState } from '../components/App/userReducer'
import { LoginModalState } from '../components/LoginModal/loginModalSelector'
import { roomReducer, RoomState } from '../pages/PremiumVideoCall/roomReducer'
import { loginModalReducer } from '../components/LoginModal/loginModalReducer'
import { BackdropState } from '../components/App/Backdrop/backdropSelector'
import { backdropReducer } from '../components/App/Backdrop/backdropReducer'
import { JoinGroupModalState } from '../components/JoinGroup/joinGroupModalSelector'
import { joinGroupModalReducer } from '../components/JoinGroup/joinGroupModalReducer'

export interface AppState {
    user: UserState
    room: RoomState
    snackbar: SnackbarState
    backdrop: BackdropState
    loginModal: LoginModalState
    joinGroupModal: JoinGroupModalState
}

const rootReducer = combineReducers({
    user: userReducer,
    room: roomReducer,
    snackbar: snackbarReducer,
    backdrop: backdropReducer,
    loginModal: loginModalReducer,
    joinGroupModal: joinGroupModalReducer,
})

export default rootReducer
