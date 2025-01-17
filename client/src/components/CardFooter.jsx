import { FormatDate } from '@/services/formatDate'
import { BASE_URL } from "@/api"

const CardFooter = ({ blog }) => {
    return (
        <div className="flex items-center gap=4 ">
            <span className="flex items-center gap-2">
                <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
                    <img
                        src={`${blog.author.profile_picture}`}
                        className="c rounded-full w-full h-full object-cover"
                    />
                </div>

                <small className="text-[#9a9db8] text-[12px] font-semibold">
                    {blog.author.first_name} {blog.author.last_name}
                </small>
            </span>

            <small className="text-[#9a9db8] text-[12px] font-semibold ml-3">
                {FormatDate(blog.published_time)}
            </small>
        </div>
    )
}

export default CardFooter