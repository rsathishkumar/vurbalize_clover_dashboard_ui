import {useEffect, useState} from 'react'
import InputField from "components/fields/InputField";
import Dropdown from 'react-dropdown';
import { useParams } from 'react-router-dom';

const UserAccount = () => {

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: "",
    merchant_id: "",
    id: ''
  });

  const [error, setError] = useState('');
  const [merchant, setMerchant] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      getUserDetails(id);
    }
    getAllMerchants();
  },[])

  const handleChange = (e) => {
    console.log(e.target.name)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  async function getUserDetails(userid) {
    return fetch(`${process.env.REACT_APP_APIURL}/get_user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: userid})
    }).then(response => response.json())
      .then(data => {
        setFormData({ ...data, [id]: userid });
      })
  }

  function getAllMerchants() {
    fetch(`${process.env.REACT_APP_APIURL}/merchants_list`, {
      method: 'get',
      headers: {'Content-Type':'application/json'}
     }).then(response => response.json())
     .then(data => {
      const uniqueArray = data;
      var list = []
      uniqueArray.map((item,index) => {
        list.push({value:item.id, label:item.name})
      })
      setMerchant(list)
     })
     .catch((error) => {
      console.error(error);
    });
  }

  const handleSubmit = async e => {
    setError('')
    e.preventDefault();
    console.log("credentials", formData)
    const token = await createUser(formData);
    console.log(token);
    if (token !== undefined && token !== '' && token !== null && token.length !== 0 && token[0]['status'] === 'success') {
      window.location.href = "/admin/user_list"
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
        label="First name*"
        placeholder="First name"
        name="firstname"
        id="firstname"
        type="text"
        value={formData.firstname}
        onChange={e => handleChange(e)}
      />

      <InputField
        variant="auth"
        extra="mb-3"
        label="Last name*"
        placeholder="Last name"
        name="lastname"
        id="lastname"
        type="text"
        value={formData.lastname}
        onChange={e => handleChange(e)}
      />

      <InputField
        variant="auth"
        extra="mb-3"
        label="Email*"
        placeholder="Email"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={e => handleChange(e)}
      />

      <label className="py-4"> Merchant
      <Dropdown options={merchant} name="merchant_id" value={formData.merchant_id} onChange={(e) => {setFormData({ ...formData, 'merchant_id': e.value });}} placeholder="Select an option" className="font-poppins font-medium text-sm text-secondaryColor mb-4" />
      </label>
      <button type="submit" className="linear mt-2 w-full rounded-xl bg-green-900 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-green-700 active:bg-green-700 dark:bg-green-900 dark:text-white dark:hover:bg-green-700 dark:active:bg-green-700">
        Add User
      </button>
      </form>
    </div>
  </div>
  );
};

export default UserAccount;
