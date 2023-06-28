import {useEffect, useState} from 'react'
import InputField from "components/fields/InputField";

export default function SignIn() {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');


  async function loginUser(credentials) {
    return fetch(`${process.env.REACT_APP_APIURL}/login`, {
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
    console.log("credentials", username)
    const token = await loginUser({
      username,
      password
    });

    if (token !== undefined && token !== '' && token !== null && Object.keys(token).length !== 0) {
      sessionStorage.setItem('token', token.token);
      window.location.href = "/admin/default"
    }
    else {
      setError("Invalid username and password. Please try again.")
    }
    
  }

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your username and password to sign in!
        </p>
        {error !== '' &&
          <div className="text-red-500 mx-2 ml-1 text-base">{error}</div>
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
          onChange={e => setUserName(e.target.value)}
        />

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
        
        <button type="submit" className="linear mt-2 w-full rounded-xl bg-green-900 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-green-700 active:bg-green-700 dark:bg-green-900 dark:text-white dark:hover:bg-green-700 dark:active:bg-green-700">
          Sign In
        </button>
        </form>
      </div>
    </div>
  );
}
