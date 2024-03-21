import axiosInstance from '@/config/AxiosIntercepter';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';

const FormComp = ({ initialForm, method, path }) => {
    const [loading, setLoading] = useState(false)
    const Api = process.env.SERVICE_BASE_URL;
    const [formData, setFormData] = useState(initialForm);

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'collegeType' || name === 'contact' || name === 'image') {
            setFormData({ ...formData, [name]: value.split(',').map(item => item.trim()) });
        } else if (name === 'established' || name === 'rating') {
            setFormData({ ...formData, [name]: parseFloat(value) });
        } else if (name === 'featured') {
            setFormData({ ...formData, [name]: value === 'true' });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axiosInstance[method](`${Api}${path}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setFormData(initialForm);
            setLoading(false)
            toast.success(response.data.message);
        } catch (error) {
            setLoading(false)
            console.error('Error submitting college:', error);
        }
    };

    return (
        <form className='grid grid-cols-2 gap-x-4 gap-y-4' onSubmit={handleSubmit}>
            {/* College Name */}
            <div className='flex flex-col'>
                <label className='text-sm' htmlFor="name">College Name</label>
                <input
                    className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white'
                    type="text"
                    id="name"
                    name="name"
                    placeholder="College Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Address */}
            <div className='flex flex-col'>
                <label className='text-sm' htmlFor="address">Address</label>
                <input
                    className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white'
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Contact */}
            <div className='flex flex-col'>
                <label className='text-sm' htmlFor="contact">Contact</label>
                <input
                    className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white rounded'
                    type="text"
                    id="contact"
                    name="contact"
                    placeholder="Contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                // required
                />
            </div>

            {/* City */}
            <div className='flex flex-col'>
                <label className='text-sm' htmlFor="city">City</label>
                <input
                    className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white rounded'
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* State */}
            <div className='flex flex-col'>
                <label className='text-sm' htmlFor="state">State</label>
                <input
                    className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white rounded'
                    type="text"
                    id="state"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* College Type */}
            <div className='flex flex-col'>
                <label className='text-sm' htmlFor="collegeType">College Type (comma-separated)</label>
                <input
                    className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white'
                    type="text"
                    id="collegeType"
                    name="collegeType"
                    placeholder="College Type"
                    value={formData.collegeType}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Established */}
            <div className='flex flex-col'>
                <label className='text-sm' htmlFor="established">Established</label>
                <input
                    className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white rounded'
                    type="number"
                    id="established"
                    name="established"
                    placeholder="Established"
                    value={formData.established}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* University */}
            <div className='flex flex-col'>
                <label className='text-sm' htmlFor="university">University</label>
                <input
                    className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white rounded'
                    type="text"
                    id="university"
                    name="university"
                    placeholder="University"
                    value={formData.university}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Logo */}
            <div className='flex flex-col'>
                <label className='text-sm' htmlFor="logo">Logo</label>
                <input
                    className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white rounded'
                    type="text"
                    id="logo"
                    name="logo"
                    placeholder="Logo"
                    value={formData.logo}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Image */}
            <div className='flex flex-col'>
                <label className='text-sm' htmlFor="image">Image</label>
                <textarea
                    className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white rounded'
                    id="image"
                    name="image"
                    placeholder="Image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Message */}
            <div className='flex flex-col'>
                <label className='text-sm' htmlFor="message">Message</label>
                <textarea
                    className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white rounded'
                    id="message"
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Details */}
            <div className='flex flex-col'>
                <label className='text-sm' htmlFor="details">Details</label>
                <textarea
                    className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white rounded'
                    id="details"
                    name="details"
                    placeholder="Details"
                    value={formData.details}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Rating */}
            <div className='flex flex-col'>
                <label className='text-sm' htmlFor="rating">Rating</label>
                <input
                    className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white rounded'
                    type="number"
                    id="rating"
                    name="rating"
                    placeholder="Rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Featured */}
            <div className='flex flex-col'>
                <label className='text-sm' htmlFor="featured">Featured</label>
                <select
                    className='p-2 border-2 border-solid border-[#2e374a] bg-[#151c2c] text-white rounded'
                    id="featured"
                    name="featured"
                    value={formData.featured}
                    onChange={handleInputChange}
                    required
                >
                    <option value="false">False</option>
                    <option value="true">True</option>
                </select>
            </div>

            {/* Submit button */}
            <button className='col-span-2 w-full p-4 bg-teal-600 text-white rounded-lg border-none cursor-pointer' type="submit">
                {loading ?
                    <div className='flex justify-center items-center'>
                        <RotatingLines strokeColor="white" strokeWidth="4" animationDuration="0.75" width="25" visible={true} />
                    </div>
                    :
                    'Submit'}
            </button>
        </form>
    )
}

export default FormComp
