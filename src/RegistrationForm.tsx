import React from "react";
import { z } from "zod";
import { Formik, Field, Form, ErrorMessage } from "formik";

const ValidationSchema = z.object({
	username: z
		.string()
		.min(3, "Username is too short")
		.max(20, "Username is too long"),
	email: z.string().email("Invalid email address").min(5, "Email is too short"),
	password: z.string().min(8, "Password is too short"),
});

type FormValues = z.infer<typeof ValidationSchema>;

const RegistrationForm = () => {
	const validateForm = (values: FormValues) => {
		try {
			ValidationSchema.parse(values);
		} catch (error) {
			if (error instanceof z.ZodError) {
				return error.formErrors.fieldErrors;
			}
		}
	};

	return (
		<Formik<FormValues>
			initialValues={{
				username: "",
				email: "",
				password: "",
			}}
			onSubmit={(values) => {
				// Handle form submission
				console.log(values);
			}}
			validate={validateForm}
		>
			<Form>
				<div>
					<label htmlFor='username'>Username</label>
					<Field type='text' id='username' name='username' />
					<ErrorMessage name='username' component='div' />
				</div>
				<div>
					<label htmlFor='email'>Email</label>
					<Field type='email' id='email' name='email' />
					<ErrorMessage name='email' component='div' />
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<Field type='password' id='password' name='password' />
					<ErrorMessage name='password' component='div' />
				</div>
				<button type='submit'>Submit</button>
			</Form>
		</Formik>
	);
};

export default RegistrationForm;
