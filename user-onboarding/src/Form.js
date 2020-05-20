import React from 'react';

function Form(props) {

    const {
        values,
        onInputChange,
        onSubmit,
        // today's stuff
        disabled,
        errors,
        onCheckboxChange,
    } = props

    return (
        <form onSubmit={onSubmit}>
            <div>
                <h2>Add User</h2>
                <button disabled={disabled}>submit</button>

                <div className='errors'>
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.termOfService}</div>
                </div>
            </div>

            <div className='form inputs'>
                <h4>General Info</h4>

                {/* ```Inputs/Labels```` */}
                <label>Name:
        <input
                        value={values.name}
                        onChange={onInputChange}
                        name='name'
                        type='text'
                        placeholder='Type name'
                    />
                </label>

                <label>Email:
            <input
                        value={values.email}
                        onChange={onInputChange}
                        name='email'
                        type='email'
                        placeholder='Type email'
                    />
                </label>

                <label>Password:
            <input
                        value={values.password}
                        onChange={onInputChange}
                        name='password'
                        type='text'
                        placeholder='Type password'
                    />
                </label>

                <label>Terms of service:
            <input
                        type='checkbox'
                        name='termsOfService'
                        checked={values.termOfService}
                        onChange={onCheckboxChange}
                    />
                </label>
            </div>

        </form>
    )
}



export default Form