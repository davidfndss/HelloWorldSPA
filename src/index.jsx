import * as React from "react"
import ReactDOM from "react-dom/client"
import { Home } from "./pages/Home/Home"
import { SignIn } from "./pages/Auth/SignIn/SignIn"
import { SignUp } from "./pages/Auth/SignUp/SignUp"
import { ReadPost } from "./pages/Post/ReadPost/ReadPost"
import { Profile } from "./pages/Profile/Profile"
import { Logout } from "./pages/Logout/Logout"
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import { UserProvider } from "./Context/UserContext"
import { LoadingProvider } from "./Context/LoadingContext"
import "./index.css"

const router = createBrowserRouter([
	// Home feed
	{
		path: "/",
		element: <Home />
	},

	// Sign-in
	{
		path: "/signin",
		element: <SignIn />
	},
	
	// Sign-up
	{
		path: "/signup",
		element: <SignUp />
	},
	
	// Read post
	{
		path:"/post/:id",
		element: <ReadPost />
	},

	// Profile
	{
		path:"/profile/:username",
		element: <Profile />
	},
	
	// Profile
	{
		path:"/logout",
		element: <Logout />
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<UserProvider>
			<LoadingProvider>
				<RouterProvider router={router} />
			</LoadingProvider>
		</UserProvider>
	</React.StrictMode>
)