import BlogContainer from "@/components/BlogContainer"
import Hero from "@/components/Hero"
import Modal from "@/components/Modal"
import Spinner from "@/components/Spinner"
import { getUserInfo } from "@/services/apiBlog"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import SignUpPage from "./SignupPage"
import { useState } from "react"

const ProfilePage = ({ authUsername }) => {
    const { username } = useParams()
    const [showModal, setShowModal] = useState(false)

    const toggleModal = () => { setShowModal(curr => !curr) }

    const { isPending, data } = useQuery({
        queryKey: ['users', username],
        queryFn: () => getUserInfo(username)
    })

    const blogs = data?.author_posts

    if (isPending) {
        return <Spinner />
    }
    return (
        <>
            <Hero userInfo={data} authUsername={authUsername} toggleModal={toggleModal} />
            <BlogContainer blogs={blogs} title={`${username}'s Posts`} />

            {showModal && (<Modal toggleModal={toggleModal}>
                <SignUpPage userInfo={data} updateForm={true} toggleModal={toggleModal} /></Modal>)}
        </>
    )
}

export default ProfilePage