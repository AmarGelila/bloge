import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/sign-up";
import SignIn from "./pages/sign-in";
import Main from "./pages/main";
import PostPage from "./pages/post";
import Error from "./pages/error";
import AuthSuccess from "./components/authSuccess";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<>
			<Toaster
				position="top-right"
				toastOptions={{
					duration: 3000,
					className: "rounded-xl border border-slate-200 text-sm",
					style: {
						background: "var(--color-white)",
						color: "var(--color-slate-900)",
						padding: "16px",
						boxShadow:
							"0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
					},
					success: {
						iconTheme: {
							primary: "var(--color-green-600)",
							secondary: "#fff",
						},
					},
					error: {
						iconTheme: {
							primary: "#dc2626",
							secondary: "#fff",
						},
					},
				}}
			/>
			<BrowserRouter>
				<Routes>
					<Route path="/sign-up" element={<SignUp />}></Route>
					<Route path="/sign-in" element={<SignIn />}></Route>
					<Route path="/" element={<Main />}></Route>
					<Route path="/posts/:postId" element={<PostPage />}></Route>
					<Route
						path="/auth-success"
						element={<AuthSuccess />}
					></Route>
					<Route
						path="*"
						element={<Error message={"Not Found"} />}
					></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
