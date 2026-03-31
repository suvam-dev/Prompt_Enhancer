export default function Message({ message, user }) {
    return (
        <div className="flex mx-12 my-2">
            <div className="w-12 h-12 bg-red-500 rounded-full mx-2 flex justify-center items-center p-2 text-white font-bold">{user}</div>
            <div className="message p-2 rounded bg-gray-300 rounded-2xl w-full">{message}</div>
        </div>
    )
}