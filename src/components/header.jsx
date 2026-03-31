function header() {
    return (
        <div className="flex justify-between items-center p-4 bg-gray-100">
            <div className="flex items-center">
                <div className="w-12 h-12 bg-cyan-300 rounded-full mx-2 flex justify-center items-center p-2 text-white font-bold">AI</div>
                <div className="text-2xl font-bold">Prompt Enhancer</div>
            </div>
            <div>
                v 1.0.0
            </div>
        </div>
    )
}

export default header;