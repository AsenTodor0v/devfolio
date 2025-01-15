import image from '../images/tech-image.jpg'
const Header = () => {
    return (
        <section className="max-container padding-x py-4  relative">
            <div className="w-full h-[320px] overflow-hidden rounded-lg">
                <img
                    src={image}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
        </section>
    )
}

export default Header