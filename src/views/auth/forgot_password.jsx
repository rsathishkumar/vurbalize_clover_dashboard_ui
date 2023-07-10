import {useEffect, useState} from 'react'
import InputField from "components/fields/InputField";

export default function ForgotPassword() {

  const [username, setUserName] = useState();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function loginUser(credentials) {
    return fetch(`${process.env.REACT_APP_APIURL}/forgot_password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('')
    setError('')
    console.log("credentials", username)
    const token = await loginUser({
      username
    });

    if (token !== undefined && token !== '' && token !== null && token.length !== 0) {
      if (token[0]['status'] === 'success') {
        setMessage("We have sent reset mail to your email id. Please click that link and set your password.")
        setUserName('')
      }
      else {
        setError(token[0]['error'])
      }
    }
    else {
      setError("Invalid username and password. Please try again.")
    }
    
  }

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Forgot Password
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email id
        </p>
        {error !== '' &&
          <div className="text-red-500 mb-6 ml-1 text-base">{error}</div>
        } 
        {message !== '' &&
        <div className="text-green-500 mb-6 ml-1 text-base">{message}</div>
        }
        {/* Email */}
        <form onSubmit={handleSubmit}>
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="username"
          id="email"
          type="text"
          value={username}
          onChange={e => setUserName(e.target.value)}
        />

        <div className="mb-4 flex items-center justify-end px-2">
          <a
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href="/auth/sign-in"
          >
            Sign In
          </a>
        </div>
        
        <button type="submit" className="linear mt-2 w-full rounded-xl bg-green-900 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-green-700 active:bg-green-700 dark:bg-green-900 dark:text-white dark:hover:bg-green-700 dark:active:bg-green-700">
          Send Reset Link
        </button>
        </form>
      </div>
    </div>
  );
}
