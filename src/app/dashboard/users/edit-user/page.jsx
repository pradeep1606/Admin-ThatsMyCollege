'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const EditUser = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className='flex gap-6 mt-5'>
      {/* info container */}
      <div className='flex-1 bg-[#182237] p-4 rounded-lg font-bold text-[#b7bac1] h-max'>
        <div className='w-full h-56 relative overflow-hidden rounded-lg mb-5'>
          {selectedImage ? (
            <Image src={selectedImage} alt="Selected Image" className="w-full h-full" fill />
          ) : (
            <Image src='/avatar.png' alt='Default Image' className="w-full h-full" fill />
          )}
        </div>
        <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
      </div>

      {/* form container */}
      <div className='flex-[3] bg-[#182237] p-4 rounded-lg'>
        <div className='text-lg font-semibold mb-4'>Edit User Details</div>
        <form className='flex flex-col gap-y-4'>
          <label className='text-sm' for="firstname">First Name</label>
          <input className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white' type="text" id="firstname" name="firstname" placeholder="First Name" required />

          <label className='text-sm' for="lastname">Last Name</label>
          <input className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white' type="text" id="lastname" name="lastname" placeholder="Last Name" required />

          <label className='text-sm' for="email">Email</label>
          <input className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white' type="email" id="email" name="email" placeholder="Email" required />

          <label className='text-sm' for="mobile">Mobile</label>
          <input className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white' type="tel" id="mobile" name="mobile" placeholder="Mobile" required />

          <label className='text-sm' for="qualificatio">Qualification</label>
          <input className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white' type="text" id="qualificatio" name="qualification" placeholder="Qualification" required />

          <label className='text-sm' for="gender">Gender</label>
          <select className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white' id="gender" name="gender" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <button className='w-full p-4 bg-teal-600 text-white rounded-lg border-none cursor-pointer' type="submit">Update</button>
        </form>

      </div>
    </div>
  )
}

export default EditUser
