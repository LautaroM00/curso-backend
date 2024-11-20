import { Route, Routes } from "react-router-dom"
import { HomeScreen, LoginScreen, RegisterScreen, ValidateEmailScreen, SosGrosoSabeloScreen, ForgotPasswordScreen } from "./Screens"
import ResetPasswordScreen from "./Screens/ResetPasswordScreen.jsx/ResetPasswordScreen"
import PruebaScreen from "./Screens/PruebaScreen/PruebaScreen"


function App() {
	return (
		<Routes>
			<Route path='/' element={<HomeScreen />} />
			<Route path='/register' element={<RegisterScreen />}/>
			<Route path='/login' element={<LoginScreen />}/>
			<Route path='/validate-email' element={<ValidateEmailScreen />}/>
			<Route path='/sos-groso-sabelo' element={<SosGrosoSabeloScreen />} />
			<Route path='/forgot-password' element={<ForgotPasswordScreen />}/>
			<Route path='/reset-password/:resetToken' element={<ResetPasswordScreen />} />
			<Route path='/prueba' element={<PruebaScreen/>} />
		</Routes>
	)
}

export default App
