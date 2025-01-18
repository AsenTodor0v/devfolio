import Badge from "./Badge"
import CardFooter from "./CardFooter"
import { Link } from "react-router-dom"

const BlogCard = ({ blog }) => {
    return (
        <div className="px-4 py-4 rounded-md w-[300px] h-auto flex flex-col gap-4 dark:border-gray-800 border shadow-lg">
            <div className="w-full h-[200px] border rounded-md overflow-hidden">
                <img
                    src={`${blog.featured_image}`}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            <Badge blog={blog} />

            <Link to={`blogs/${blog.slug}`}>
                <h3 className="font-semibold  leading-normal text-[#1b1d2b] mb-0 dark:text-white">
                    {blog.title.length > 25 ? `${blog.title.slice(0, 25)}...` : blog.title}
                </h3>
            </Link>


            <CardFooter blog={blog} />
        </div>
    )
}

export default BlogCard