import SmallSpinner from "@/components/SmallSpinner";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { registerUser, updateUserInfo } from "@/services/apiBlog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignUpPage = ({ userInfo, updateForm, toggleModal }) => {
    const queryClient = useQueryClient()

    const { register, handleSubmit, formState, reset, watch } = useForm({ defaultValues: userInfo ? userInfo : {} });
    const { errors } = formState

    const password = watch('password')

    const updateProfileMutation = useMutation({
        mutationFn: (data) => updateUserInfo(data),
        onSuccess: () => {
            toast.success('User updated successfully')
            toggleModal()
            queryClient.invalidateQueries({ queryKey: ['users', userInfo?.username] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const mutation = useMutation({
        mutationFn: (data) => registerUser(data),
        onSuccess: () => {
            toast.success('User registered successfully')
            reset()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    function onSubmit(data) {
        if (updateForm) {
            const formData = new FormData();
            formData.append("username", data.username);
            formData.append("first_name", data.first_name);
            formData.append("last_name", data.last_name);
            formData.append("job_title", data.job_title);
            formData.append('bio', data.bio);
            if (data.profile_picture && data.profile_picture[0]) {
                if (data.profile_picture[0] !== "/" && data.profile_picture[0] !== "h")
                    formData.append("profile_picture", data.profile_picture[0]);
            }
            updateProfileMutation.mutate(formData)
        } else {
            mutation.mutate(data)
        }
    }

    return (
        <form className={`${updateForm && 'h-[95%] overflow-auto'}md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-4 w-fit 
        rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]`}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col gap-2 justify-center items-center mb-2">
                <h3 className="font-semibold text-2xl">{updateForm ? 'Update Form' : 'SignUp Form'}</h3>
                <p>{updateForm ? 'Update your account' : 'Create your account to get started!'}</p>
            </div>

            <div>
                <Label htmlFor="username" className="dark:text-[97989F]">
                    Username
                </Label>
                <Input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    {...register("username", {
                        required: 'Username is required',
                        minLength: { value: 3, message: 'Username must be at least 3 characters' }
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                />
                {errors?.username?.message && <p className="text-red-500">{errors.username.message}</p>}
            </div>

            <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input
                    type="text"
                    id="first_name"
                    placeholder="Enter first name"
                    {...register("first_name", {
                        required: 'First name is required',
                        minLength: { value: 3, message: 'First name must be at least 3 characters' }
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                />
                {errors?.first_name?.message && <p className="text-red-500">{errors.first_name.message}</p>}
            </div>

            <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                    type="text"
                    id="last_name"
                    placeholder="Enter last name"
                    {...register("last_name", {
                        required: 'Last name is required',
                        minLength: { value: 3, message: 'Last name must be at least 3 characters' }
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                />
                {errors?.last_name?.message && <p className="text-red-500">{errors.last_name.message}</p>}
            </div>

            {updateForm && <div>
                <Label htmlFor="job_title" className='dark:text-[97989F]'>Job title</Label>
                <Input
                    type="text"
                    id="job_title"
                    placeholder="Enter job title"
                    {...register("job_title", {
                        required: 'Job title is required',
                        minLength: { value: 3, message: 'Job title must be at least 3 characters' }
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                />
                {errors?.job_title?.message && <p className="text-red-500">{errors.job_title.message}</p>}
            </div>}

            {updateForm && <div>
                <Label htmlFor='content'>Bio</Label>
                <Textarea
                    id="content"
                    placeholder="Enter bio"
                    {...register("bio", {
                        required: 'Bio is required',
                        minLength: { value: 10, message: 'Bio must be at least 10 characters' }
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                />
                {errors?.bio?.message && <p className="text-red-500">{errors.bio.message}</p>}
            </div>}

            {updateForm && <div>
                <Label htmlFor='profile_picture'>Profile Picture</Label>
                <Input
                    type="file"
                    id="picture"
                    {...register("profile_picture", {
                        required: false,
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                />
                {/*{errors?.profile_picture?.message && <p className="text-red-500">{errors.profile_picture.message}</p>}*/}
            </div>}

            {updateForm || <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    {...register("password", {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' }
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                />
                {errors?.password?.message && <p className="text-red-500">{errors.password.message}</p>}
            </div>}

            {updateForm || <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    {...register("confirmPassword", {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' },
                        validate: (value) => value === password || 'Passwords do not match'
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                />
                {errors?.confirmPassword?.message && <p className="text-red-500">{errors.confirmPassword.message}</p>}
            </div>}

            <div className="w-full flex items-center justify-center flex-col my-4">
                {updateForm ? <button className="bg-[#4fca70] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
                    {updateProfileMutation.isPending ? <><SmallSpinner /> <small className="text-[14px]">Updating account...</small></> :
                        <small className="text-[14px]">Update Account</small>}
                </button> :
                    <button className="bg-[#4fca70] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
                        {mutation.isPending ? <><SmallSpinner /> <small className="text-[14px]">Creating account...</small></> :
                            <small className="text-[14px]">Sign Up</small>}
                    </button>}

                {updateForm || <p className="text-[14px]">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>}
            </div>
        </form>
    )
}

export default SignUpPage