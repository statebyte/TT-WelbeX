const NotFoundPage = () => {
    return (
        <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Страница не найдена</h1>
            <p className="text-lg text-gray-700 mb-6">Извините, но страница, которую вы ищете, не существует.</p>
            <a href="/" className="text-blue-500 hover:underline">Главная</a>
        </div>
    );
};

export default NotFoundPage;