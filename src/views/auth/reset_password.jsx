import {useEffect, useState} from 'react'
import InputField from "components/fields/InputField";
import { useParams } from 'react-router-dom';

export default function SignIn() {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false)
  const { token } = useParams();
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  useEffect(() => {
    if (token !== undefined) {
      checkValidToken(token);
    }
    else {
      setError("Invalid token")
    }
  }, [])

  async function checkValidToken(token) {
    return fetch(`${process.env.REACT_APP_APIURL}/checktoken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: token})
    }).then(response => response.json())
    .then(data => {
      console.log("data", data[0]['status'])
      if (data[0]['status'] === 'error') {
        setError("Invalid token value.")
      }
      else {
        setShowForm(true);
      }
    })
   }

   async function updatePassword(password) {
    return fetch(`${process.env.REACT_APP_APIURL}/updatepassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password: password, token: token})
    }).then(response => response.json())
    .then(data => {
      console.log("data", data[0]['status'])
      
      if (data[0]['status'] === 'success') {
        setMessage("Password changed successfully. Please <a href='/auth/sign-in' class='underline'>login</a> to the site.")
      }
      else {
        setError(data[0]['error'])
      }
      
    })
   }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!await validatePassword(password)) {
      return;
    }
    setError('');
    if (password !== confirmPassword) {
      setError("Confirm password and password not match.")
      return;
    }
    await updatePassword(password);
    
  }

  const validatePassword = (password) => {

    const hasMinimumLength = password.length >= 8;
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    if (hasMinimumLength && hasSpecialCharacter && hasNumber) {
      setIsPasswordValid(hasMinimumLength && hasSpecialCharacter && hasNumber);
      return true;
    }
    else {
      setIsPasswordValid(hasMinimumLength && hasSpecialCharacter && hasNumber);
      return false;
    }
    
  };


  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      {showForm && (
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Set Password
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter password
        </p>
        {error !== '' &&
          <div className="text-red-500 mx-2 ml-1 text-base">{error}</div>
        }
        {message !== '' &&
        <div className="text-green-900 mb-6 ml-1 text-xl" dangerouslySetInnerHTML={{__html: message}} />
        }
        {/* Email */}
        <form onSubmit={handleSubmit}>

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />

      {!isPasswordValid && (
        <div className="text-red-500 mx-2 mb-6 ml-1 text-base">
          Password should be at least 8 characters long and contain special characters and numbers.
        </div>
      )}

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Confirm Password*"
          placeholder="Min. 8 characters"
          id="confirm_password"
          type="password"
          onChange={e => setConfirmPassword(e.target.value)}
        />

        <div className="mb-4 flex items-center justify-end px-2">
          <a
            className="text-xl font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href="/auth/sign-in"
          >
            Sign In
          </a>
        </div>
        
        <button type="submit" className="linear mt-2 w-full rounded-xl bg-green-900 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-green-700 active:bg-green-700 dark:bg-green-900 dark:text-white dark:hover:bg-green-700 dark:active:bg-green-700">
          Set Password
        </button>
        </form>
      </div>
     )}
     {!showForm && (
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:w-[420px]">
      <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          {error}
        </h4>
        </div>
      )}
    </div>
  );
}
