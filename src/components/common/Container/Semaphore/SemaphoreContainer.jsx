
const SemaphoreContainer = ({ title, subTitle = "", messages = "", children, ...props }) => {
    return (
        <div className="mx-8" {...props} >
            <h3 className="text-center text-xl font-bold mb-8">
                {title}
            </h3>

            {subTitle &&
                <h5 className="text-xl font-bold mb-8">
                    {subTitle}
                </h5>
            }

            {messages &&
                <div className="bg-blue-100 text-blue-700 p-4 rounded-lg my-4 text-center">
                    {messages}
                </div>
            }

            <div>
                {children}
            </div>
        </div>
    )
}

export default SemaphoreContainer;