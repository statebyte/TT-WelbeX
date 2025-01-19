interface ButtonProps {
    onClick: () => void;
    color: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet';
    children: React.ReactNode;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { color, onClick, children, disabled = false } = props;
    const colorClasses = {
        red: 'bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800',
        orange: 'bg-orange-700 hover:bg-orange-800 focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800',
        yellow: 'bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800',
        green: 'bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
        blue: 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
        indigo: 'bg-indigo-700 hover:bg-indigo-800 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800',
        violet: 'bg-violet-700 hover:bg-violet-800 focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800',
    };

    return (
        <button
            className={`transition-all text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none ${colorClasses[color]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;