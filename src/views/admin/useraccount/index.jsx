import {useEffect, useState} from 'react'
import InputField from "components/fields/InputField";


const UserAccount = () => {

  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');

  useEffect(() => {

  },[])

  async function createUser(details) {
    return fetch(`${process.env.REACT_APP_APIURL}/create_user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    })
      .then(data => data.json())
   }

  const handleSubmit = async e => {
    setError('')
    e.preventDefault();
    console.log("credentials", username)
    const token = await createUser({
      username,
      email,
      password
    });
    console.log(token);
    if (token !== undefined && token !== '' && token !== null && token.length !== 0 && token[0]['status'] === 'success') {
      window.location.href = "/admin/iuser_list"
    }
    else {
      setError(token[0]['error'])
    }
    
  }

  return (
    <div className="mt-2 mb-16 flex h-full w-full px-2 md:mx-0 md:px-0 lg:mb-10 justify-center">
    {/* Sign in section */}
    <div className="mt-[5vh] w-full max-w-full flex-col md:pl-4 lg:pl-0 xl:max-w-[420px]">
      {error !== '' &&
        <div className="text-red-500 mx-2 ml-1 text-base">{error}</div>
      }
      {/* Email */}
      <form onSubmit={handleSubmit}>

      <InputField
        variant="auth"
        extra="mb-3"
        label="Email*"
        placeholder="Email"
        id="email"
        type="email"
        onChange={e => setEmail(e.target.value)}
      />

      <InputField
        variant="auth"
        extra="mb-3"
        label="Username*"
        placeholder="username"
        id="username"
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
        Add User
      </button>
      </form>
    </div>
  </div>
  );
};

export default UserAccount;
