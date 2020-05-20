import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Form'
import axios from 'axios'
import * as yup from 'yup'
import formSchema from './formSchema'

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  termsOfService: false,

}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
}

const initialUsers = []
const initialDisabled = true

function App() {
  // ~~~~~~~~States!
  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)


  // ~~~~~~~~Helper functions!
  const getUsers = () => {

    axios.get('https://reqres.in/api/users')

      .then(response => {
        setUsers(response.data.data)
        // debugger
      })

      .catch(error => {
        debugger
      })
  }


  
  const postNewUser = newUser => {

    axios.post('https://reqres.in/api/users' , newUser)
    
    .then( response => {
      // debugger
      setUsers([response.data, ...users])
      
    })
    .catch( error => {
      debugger
    })
    .finally(()=> {
      setFormValues(initialFormValues)
    })
  }


  const onInputChange = event => {
    const { name } = event.target
    const { value } = event.target

    yup
      .reach(formSchema, name)
      // we can then run validate using the value
      .validate(value)
      .then(valid => {
        // happy path, we can clear the error message
        setFormErrors({
          ...formErrors,
          [name]: ''
        })
      })
      .catch(err => {
        // sad path, does not validate so we set the error message to the message 
        // returned from yup (that we created in our schema)
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      })

    setFormValues({ ...formValues, [name]: value })
  }


  const onCheckboxChange = event => {
    const { name } = event.target
    const { checked } = event.target
// debugger
    setFormValues({
      ...formValues, [name]: checked
    })
  }


  const onSubmit = event => {
    event.preventDefault()

    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      termsOfService: formValues.termsOfService
    }
    postNewUser(newUser)

  }

  function User({ details }) {

    if (!details) {
      return <h3> Still fetching a user</h3>
    }
    // debugger
    return (
      <div className='user-container'>
        <h2>{details.name} </h2>
        <h2>{details['first_name']} {details['last_name']}</h2>
        <img src={details.avatar} alt='🤭'/>  
        <p>email: {details.email} </p>
      
        {/* <p>{details.password} </p> */}

      </div>

    )

  }

  // ~~~~~~Side Effects
  useEffect(() => {
    getUsers()
  }, [])


  useEffect(() => {
    formSchema.isValid(formValues)
    .then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])


  return (
    <div className="App">
      <header className="App-header">

        <Form
          values={formValues}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          // Today's stuff
          disabled={disabled}
          errors={formErrors}
          onCheckboxChange={onCheckboxChange}
        />



        {users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
        }

      </header>
    </div>
  );
}

export default App;
