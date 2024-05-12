'use client'
import { fetchSingleUser } from '@/store/slices/userSlice'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '@/config/AxiosIntercepter'


const EditUser = () => {
  const router = useRouter()
  const Api = process.env.SERVICE_BASE_URL;
  const pathname = usePathname();
  const dispatch = useDispatch();
  const userId = pathname.split('/').pop();
  const { singleUser, status1, error1 } = useSelector(state => state.User);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    gender: '',
    lastName: '',
    phone: '',
    qualification: '',
    profilePic: ''
  });

  useEffect(() => {
    if (status1 !== 'succeeded') {
      dispatch(fetchSingleUser(userId));
    }
  }, [dispatch, userId, status1]);

  useEffect(() => {
    if (singleUser?.data) {
      const { email, firstName, gender, lastName, phone, qualification, role, profilePic } = singleUser.data;
      // console.log("roless", role, singleUser)
      setFormData({
        firstName,
        gender,
        lastName,
        phone,
        qualification,
        profilePic
      });
      // setSelectedOptions(role);
    }
  }, [singleUser]);


  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    }
    setFormData({
      ...formData,
      role: isChecked ? [...formData.role, value] : formData.role.filter(role => role !== value)
    });
  };

  if (status1 === 'loading') {
    return <div>Loading...</div>;
  }
  if (status1 === 'failed') {
    return <div>Api Error: {error1}</div>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    // if (formData.role.length === 0) {
    //   alert("Please select at least one role.");
    //   return;
    // }
    if (!formData.profilePic) {
      delete formData.profilePic;
    }
    try {
      const response = await axiosInstance.patch(`${Api}/users/${userId}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsLoading(false);
      router.push(`/dashboard/users/${'User Details'}&${userId}`)
      toast.success(response.data.message);
    } catch (error) {
      setIsLoading(false)
      console.error('Error updating user:', error);
    }
  };
  const handleCancel=()=>{
    router.back()
  }

  return (
    <div className='flex gap-6 mt-5'>
      {/* info container */}
      <div className='flex-1 bg-[#182237] p-4 rounded-lg font-bold text-[#b7bac1] h-max'>
        <div className='w-full h-56 relative overflow-hidden rounded-lg mb-5'>
          <Image src={formData?.profilePic || `/avatar.png`} alt="Selected Image" className="w-full h-full" fill />
        </div>
        <p>{(formData?.firstName + ' ' + formData?.lastName)}</p>
      </div>

      {/* form container */}
      <div className='flex-[3] bg-[#182237] p-4 rounded-lg'>
        <div className='text-lg font-semibold mb-4'>Edit Profile</div>
        <label className='text-sm' htmlFor="email">Email: </label>
        <span className='text-white ml-4'>
          {singleUser?.data?.email}
        </span>
        <div className='text-sm mb-5'>
          <span>Role: </span>
          <span className='ml-4'>
            {
              singleUser?.data?.role.map((rl, index) => (
                <span key={index}>{rl.charAt(0).toUpperCase() + rl.slice(1).toLowerCase()} </span>
              ))
            }
          </span>
        </div>

        <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>
          <label className='text-sm' htmlFor="firstname">First Name</label>
          <input
            className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white'
            type="text"
            id="firstname"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <label className='text-sm' htmlFor="lastname">Last Name</label>
          <input
            className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white'
            type="text"
            id="lastname"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <label className='text-sm' htmlFor="mobile">Mobile</label>
          <input
            className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white'
            type="tel"
            id="mobile"
            name="phone"
            placeholder="Mobile"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label className='text-sm' htmlFor="qualification">Qualification</label>
          <input
            className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white'
            type="text"
            id="qualification"
            name="qualification"
            placeholder="Qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
          />

          <label className='text-sm' htmlFor="gender">Gender</label>
          <select
            className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white'
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>

          {/* <label htmlFor="role">Select Roles</label>
          <div className="space-x-4">
            <label><input type="checkbox" value="USER" checked={selectedOptions.includes("USER")} onChange={handleCheckboxChange} /> USER</label>
            <label><input type="checkbox" value="ADMIN" checked={selectedOptions.includes("ADMIN")} onChange={handleCheckboxChange} /> ADMIN</label>
            <label><input type="checkbox" value="SUPER_ADMIN" checked={selectedOptions.includes("SUPER_ADMIN")} onChange={handleCheckboxChange} /> SUPER_ADMIN</label>
          </div>
          <div className="selected-items">
            {selectedOptions?.map((option, index) => (
              <div key={index}>{option}</div>
            ))}
          </div> */}

            <button className='w-full p-4 bg-teal-600 text-white rounded-lg border-none cursor-pointer' type="submit">
              {isLoading ?
                <div className='flex justify-center items-center'>
                  <RotatingLines strokeColor="white" strokeWidth="4" animationDuration="0.75" width="25" visible={true} />
                </div>
                :
                'Update'}
            </button>
        </form>
            <button className='w-full p-4 mt-5 bg-gray-600 text-white rounded-lg border-none cursor-pointer' onClick={handleCancel}>
              Cancel
            </button>

      </div>
    </div>
  )
}

export default EditUser
