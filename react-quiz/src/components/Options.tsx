type PropType = { options: [string, string, string, string] };

export default function Options({ options }: PropType) {
    return (
        <div className="options">
            {options.map((option) => (
                <button key={option} className="btn btn-option">
                    {option}
                </button>
            ))}
        </div>
    );
}
