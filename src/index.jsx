import * as React from "react"
import ReactDOM from "react-dom/client"
import { Home } from "./pages/Home/Home"
import { SignIn } from "./pages/Auth/SignIn/SignIn"
import { SignUp } from "./pages/Auth/SignUp/SignUp"
import { ReadPost } from "./pages/Post/ReadPost/ReadPost"
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import { UserProvider } from "./Context/UserContext"
import { LoadingProvider } from "./Context/LoadingContext"
import "./index.css"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />
	},
	{
		path: "/signin",
		element: <SignIn />
	},
	{
		path: "/signup",
		element: <SignUp />
	},
	{
		path:"/post/:id",
		element: <ReadPost />
	}
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