import * as yup from 'yup'

const formSchema = yup.object().shape({

first_name: yup.string()
.trim()
.min(3, 'name has to be at least 3 characters long')
.required('name is required field'),
last_name: yup.string()
.trim()
.min(3, 'name has to be at least 3 characters long')
.required('name is required field'),
email: yup.string()
.email('Email muust have the correct email form')
.required('email is required field'),
password: yup.string()
.trim()
.min(5, 'password at least 5 chars long')
.required ('password is required field'),
termsOfService: yup.boolean()
// .required('Temrs of service needs to be checked'),
.oneOf([true], 'Must Accept Terms and Conditions')
})

export default formSchema