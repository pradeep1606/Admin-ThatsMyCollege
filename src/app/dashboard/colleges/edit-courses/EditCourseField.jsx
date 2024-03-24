import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '@/config/AxiosIntercepter';
import { toast } from 'react-toastify';
import { fetchCourse } from '@/store/slices/courseSlice';

const EditCourseField = ({ clgId, clgName }) => {
    const Api = process.env.SERVICE_BASE_URL;
    const dispatch = useDispatch();
    const { courses, status, error } = useSelector((state) => state.Course);
    const [courseFields, setCourseFields] = useState([{ id: 1, label: "Course 1" }]); // Initial CourseField
    console.log(courses)

    useEffect(() => {
        dispatch(fetchCourse(`/courses/college/${clgId}`));
    }, [dispatch, clgId]);

    const handleAddMore = () => {
        const lastCourseId = courseFields[courseFields?.length - 1]?.id || 0;
        const newId = lastCourseId + 1;
        setCourseFields(prevFields => [...prevFields, { id: newId, label: `Course ${newId}` }]);
    };
    const handleDeleteCourse = (id) => {
        setCourseFields(prevFields => {
            const filteredFields = prevFields.filter(field => field.id !== id);
            return filteredFields;
        });
    };

    // handle form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            collegeId: clgId,
            courses: courseFields.map(field => ({
                courseName: event.target.elements[`courseName-${field.id}`]?.value,
                fullName: event.target.elements[`fullName-${field.id}`]?.value,
                fee: event.target.elements[`fee-${field.id}`]?.value,
                branches: event.target.elements[`branches-${field.id}`]?.value.split(','), // Assuming branches are comma-separated values
                eligibility: event.target.elements[`eligibility-${field.id}`]?.value,
                duration: event.target.elements[`duration-${field.id}`]?.value,
            }))
        };
        try {
            const response = await axiosInstance.post(`${Api}/courses`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // console.log(response);
            toast.success(response.data.message)
            setCourseFields([]);
        } catch (error) {
            // console.error('Error submitting course:', error);
            toast.success(error)
            toast.error(error.response?.data.message)
        }
    };
    return (
        <>
            <form className='flex flex-col gap-x-4 gap-y-4' onSubmit={handleSubmit}>
                <div className='col-span-2'>
                    <label className='text-sm' htmlFor="collegeType">Search and select a college</label>
                    <div className="relative w-full">
                        <input
                            className='p-2 w-full border-2 rounded border-solid border-[#2e374a] bg-[#151c2c] text-white col-span-2'
                            type="text"
                            id="collegeType"
                            name="collegeType"
                            placeholder="Search for a college"
                            value={clgName}
                            required
                        />
                    </div>
                </div>

                {/* course fields */}
                {courseFields.map((field, index) => (
                    <div key={field.id} className='grid grid-cols-2 gap-x-4 gap-y-1 pt-3'>
                        <div className='col-span-2 flex justify-between'>
                            <span className=''>Course {field.id}</span>
                            <button className='py-1 px-2 bg-red-500 text-white rounded-md' onClick={() => handleDeleteCourse(field.id)}>Delete </button>
                        </div>
                        {/* <CourseField /> */}
                        {/* course field start */}
                        <div className='flex flex-col'>
                            <label className='text-sm' htmlFor={`courseName-${field.id}`}>Course Name</label>
                            <input
                                className='p-2 border-2 border-solid rounded text-sm border-[#2e374a] bg-[#151c2c] text-white col-span-2'
                                type="text"
                                id={`courseName-${field.id}`}
                                name={`courseName-${field.id}`}
                                placeholder="Course Name"
                                required
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm' htmlFor={`fullName-${field.id}`}>Full Name</label>
                            <input
                                className='p-2 border-2 border-solid rounded text-sm border-[#2e374a] bg-[#151c2c] text-white col-span-2'
                                type="text"
                                id={`fullName-${field.id}`}
                                name={`fullName-${field.id}`}
                                placeholder="Full Name"
                                required
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm' htmlFor={`fee-${field.id}`}>Fee</label>
                            <input
                                className='p-2 border-2 border-solid rounded text-sm border-[#2e374a] bg-[#151c2c] text-white'
                                type="text"
                                id={`fee-${field.id}`}
                                name={`fee-${field.id}`}
                                placeholder="Fee"
                                required
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm' htmlFor={`branches-${field.id}`}>Branches</label>
                            <input
                                className='p-2 border-2 border-solid rounded text-sm border-[#2e374a] bg-[#151c2c] text-white'
                                type="text"
                                id={`branches-${field.id}`}
                                name={`branches-${field.id}`}
                                placeholder="Branches"
                                required
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm' htmlFor={`eligibility-${field.id}`}>Eligibility</label>
                            <input
                                className='p-2 border-2 border-solid rounded text-sm border-[#2e374a] bg-[#151c2c] text-white'
                                type="text"
                                id={`eligibility-${field.id}`}
                                name={`eligibility-${field.id}`}
                                placeholder="Eligibility"
                                required
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm' htmlFor={`duration-${field.id}`}>Duration</label>
                            <input
                                className='p-2 border-2 border-solid rounded text-sm border-[#2e374a] bg-[#151c2c] text-white'
                                type="text"
                                id={`duration-${field.id}`}
                                name={`duration-${field.id}`}
                                placeholder="Duration"
                                required
                            />
                        </div>
                        {/* course field end */}
                        <div className='bg-white h-[1px] col-span-2 mt-2'></div>
                    </div>
                ))}
                {/* add more course button */}
                <div className='flex justify-end col-span-2'>
                    <button type='button' className='bg-blue-500 px-3 py-1 rounded-md' onClick={handleAddMore}>
                        + Add More
                    </button>
                </div>

                <button className='col-span-2 w-full p-4 bg-teal-600 text-white rounded-lg border-none cursor-pointer' type="submit">Submit</button>
            </form>
        </>
    )
}

export default EditCourseField
