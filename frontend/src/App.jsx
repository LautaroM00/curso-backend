import { Route, Routes } from "react-router-dom"
import { HomeScreen, LoginScreen, RegisterScreen, ValidateEmailScreen, SosGrosoSabeloScreen } from "./Screens"


function App() {
	return (
		<Routes>
			<Route path='/' element={<HomeScreen />} />
			<Route path='/register' element={<RegisterScreen />}/>
			<Route path='/login' element={<LoginScreen />}/>
			<Route path='/validate-email' element={<ValidateEmailScreen />}/>
			<Route path='/sos-groso-sabelo' element={<SosGrosoSabeloScreen />} />
		</Routes>
	)
}

export default App
