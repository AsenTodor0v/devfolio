import { useState } from "react"
import { getBlogs } from "@/services/apiBlog"
import BlogContainer from "@/components/BlogContainer"
import Header from "@/components/Header"
import PagePagination from "@/components/PagePagination"
import { useQuery, keepPreviousData } from "@tanstack/react-query"


const HomePage = () => {
    const [page, setPage] = useState(1)
    const numOfBlogPerPage = 3

    const { isPending, isError, error, data } = useQuery({
        queryKey: ['blogs', page],
        queryFn: () => getBlogs(page),
        placeholderData: keepPreviousData
    })


    const blogs = data?.results || []
    const totalPages = Math.ceil(data?.count / numOfBlogPerPage)

    function handlePageChange(newPage) {
        setPage(newPage)
    }

    function increasePage() {
        setPage(page => page + 1)
    }

    function decreasePage() {
        setPage(page => page - 1)
    }

    return (
        <>
            <Header />
            <BlogContainer isPending={isPending} blogs={blogs} />
            <PagePagination page={page} increasePage={increasePage} decreasePage={decreasePage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </>
    )
}

export default HomePage