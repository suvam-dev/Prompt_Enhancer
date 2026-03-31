import header from "../components/header"
import chatbox from "../components/chatbox"
function landingPage() {
    return (
        <>
            {header()}
            {chatbox()}
        </>
    )
}

export default landingPage