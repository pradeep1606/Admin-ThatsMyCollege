import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '@/config/AxiosIntercepter';
import { toast } from 'react-toastify';
import { fetchCourse } from '@/store/slices/courseSlice';
import { navigateToCollege } from '@/app/action';
import { RotatingLines } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';

const EditCourseField = ({ clgId, clgName }) => {
    const router = useRouter()
    const Api = process.env.SERVICE_BASE_URL;
    const dispatch = useDispatch();
    const { courses } = useSelector((state) => state.Course);
    const [courseFields, setCourseFields] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        dispatch(fetchCourse(`/courses/college/${clgId}`));
    }, [dispatch, clgId]);

    useEffect(() => {
        if (courses?.data?.courses) {
            const loadedCourses = courses.data.courses.map((course, index) => ({
                id: index + 1, 
                ...course, 
            }));
            setCourseFields(loadedCourses);
        }
    }, [courses]);

    const handleAddMore = () => {
        const lastCourseId = courseFields[courseFields?.length - 1]?.id;
        const newId = lastCourseId + 1;
        setCourseFields(prevFields => [...prevFields, { id: newId, label: `Course ${newId}` }]);
    };

    const handleDeleteCourse = (id) => {
        setCourseFields(courseFields.filter(field => field.id !== id));
    };

    const handleChange = (id, event) => {
        const { name, value } = event.target;
        setCourseFields(courseFields.map(field => field.id === id ? { ...field, [name]: value } : field));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        const payload = {
            collegeId: clgId,
            courses: courseFields.map(({ id, label, branches, ...rest }) => {
                const processedBranches = typeof branches === 'string' ? branches.split(',').map(branch => branch.trim()) : branches;
                return {
                    ...rest,
                    branches: processedBranches,
                };
            })
        };
        try {
            const response = await axiosInstance.patch(`${Api}/courses/college/${clgId}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            toast.success(response.data.message);
            setIsLoading(false)
            router.push(`/dashboard/colleges/${clgId}`)
        } catch (error) {
            toast.success(error);
            setIsLoading(false)
            toast.error(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-x-4 gap-y-4">
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
                            readOnly
                        />
                    </div>
                </div>
                {/* Repeated fields for each course */}
                {courseFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-2 gap-x-4 gap-y-1 pt-3">
                        <div className="col-span-2 flex justify-between">
                            <span>Course {field.id}</span>
                            <button
                                type="button"
                                className="py-1 px-2 bg-red-500 text-white rounded-md"
                                onClick={() => handleDeleteCourse(field.id)}
                            >
                                Delete
                            </button>
                        </div>
                        {/* Dynamically generated input fields for each course attribute */}
                        <div className='flex flex-col text-sm'>
                            <label className="text-white" htmlFor={`courseName-${field.id}`}>Course Name</label>
                            <input
                                className="p-2 border-2 border-solid rounded border-[#2e374a] bg-[#151c2c] text-white"
                                type="text"
                                name="courseName"
                                id={`courseName-${field.id}`}
                                placeholder="Course Name"
                                value={field.courseName}
                                onChange={(e) => handleChange(field.id, e)}
                                required
                            />
                        </div>
                        <div className='flex flex-col text-sm'>
                            <label className="col-span-2 text-white" htmlFor={`fullName-${field.id}`}>Full Name</label>
                            <input
                                className="p-2 border-2 border-solid rounded text-sm border-[#2e374a] bg-[#151c2c] text-white"
                                type="text"
                                name="fullName"
                                id={`fullName-${field.id}`}
                                placeholder="Full Name"
                                value={field.fullName}
                                onChange={(e) => handleChange(field.id, e)}
                                required
                            />
                        </div>
                        <div className='flex flex-col text-sm'>
                            <label className="text-white" htmlFor={`fee-${field.id}`}>Fee</label>
                            <input
                                className="p-2 border-2 border-solid rounded text-sm border-[#2e374a] bg-[#151c2c] text-white"
                                type="text"
                                name="fee"
                                id={`fee-${field.id}`}
                                placeholder="Fee"
                                value={field.fee}
                                onChange={(e) => handleChange(field.id, e)}
                                required
                            />
                        </div>
                        <div className='flex flex-col text-sm'>
                            <label className="text-white" htmlFor={`branches-${field.id}`}>Branches</label>
                            <input
                                className="p-2 border-2 border-solid rounded text-sm border-[#2e374a] bg-[#151c2c] text-white"
                                type="text"
                                name="branches"
                                id={`branches-${field.id}`}
                                placeholder="Branches"
                                value={field.branches}
                                onChange={(e) => handleChange(field.id, e)}
                                required
                            />
                        </div>
                        <div className='flex flex-col text-sm'>
                            <label className="text-white" htmlFor={`eligibility-${field.id}`}>Eligibility</label>
                            <input
                                className="p-2 border-2 border-solid rounded text-sm border-[#2e374a] bg-[#151c2c] text-white"
                                type="text"
                                name="eligibility"
                                id={`eligibility-${field.id}`}
                                placeholder="Eligibility"
                                value={field.eligibility}
                                onChange={(e) => handleChange(field.id, e)}
                                required
                            />
                        </div>
                        <div className='flex flex-col text-sm'>
                            <label className="text-white" htmlFor={`duration-${field.id}`}>Duration</label>
                            <input
                                className="p-2 border-2 border-solid rounded text-sm border-[#2e374a] bg-[#151c2c] text-white"
                                type="text"
                                name="duration"
                                id={`duration-${field.id}`}
                                placeholder="Duration"
                                value={field.duration}
                                onChange={(e) => handleChange(field.id, e)}
                                required
                            />
                        </div>
                    </div>
                ))}
                <div className="flex justify-end col-span-2">
                    <button type="button" className="bg-blue-500 px-3 py-1 rounded-md" onClick={handleAddMore}>
                        + Add More
                    </button>
                </div>
                <button
                    className="col-span-2 w-full p-4 bg-teal-600 text-white rounded-lg border-none cursor-pointer"
                >
                    {isLoading ?
                        <div className='flex justify-center items-center'>
                            <RotatingLines strokeColor="white" strokeWidth="4" animationDuration="0.75" width="25" visible={true} />
                        </div>
                        :
                        'Submit'
                    }
                </button>
            </form>
        </>
    );
};

export default EditCourseField;
