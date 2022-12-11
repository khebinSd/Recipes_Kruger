import { useDispatch } from "react-redux";
import { startLoginWithEmailPassword } from "../../store/auth/thunks";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/Login-Register-Layout.css";
import { useState } from "react";

export default function LoginPage() {
	const dispatch = useDispatch();

	const loginSchema = Yup.object().shape({
		email: Yup.string().email("Invalid email").required("Email is required"),
		password: Yup.string()
			.min(6, "Password is too short - Should be 6 chars min.")
			.required("Password is required"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: loginSchema,
		onSubmit: (data) => {

			let email = data.email;
			let password = data.password;
			dispatch(startLoginWithEmailPassword({ email, password }));
			formik.resetForm();
		},
	});

	return (
		<div className="login__registre">
			<form onSubmit={formik.handleSubmit} action="#" className="sign-in-form">
				<div className="login__title">
					<h1>Login</h1>
				</div>
				<div className="login__box">
					<input
						name="email"
						type="email"
						placeholder="correo@google.com"
						defaultValue={formik.values.email}
						onChange={formik.handleChange}
						className = "w-72"
						
					/>
					<div></div>
					{formik.touched.email && formik.errors.email && (
						<span className="text-red-400 flex text-xs">
							{formik.errors.email}
						</span>
					)}
				</div>
				<div className="login__box">
					<input
						name="password"
						type="password"
						placeholder="Password"
						defaultValue={formik.values.password}
						onChange={formik.handleChange}
						className = "w-72"
						
					/>
					<div></div>
					{formik.touched.password && formik.errors.password && (
						<span className="text-red-400 flex text-xs">
							{formik.errors.password}
						</span>
					)}
				</div>
				<div >
					<button
						className="overflow-hidden
						mt-5
                        rounded-sm
                        shadow-md
                        shadow-gray-400/50
                        bg-gradient-to-r
                        from-blue-400
                        to-cyan-400
                        py-3 px-5
                        text-lg
                        font-medium
                        uppercase
                        tracking-wider
                        text-gray-50"
						type="submit">
						Login
					</button>
					
				</div>
			</form>
		</div>
	);
}
