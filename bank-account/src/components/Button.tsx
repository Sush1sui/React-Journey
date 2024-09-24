type PropType = {
    handleClick: () => void;
    isDisabled: boolean;
    children: React.ReactNode;
};

export default function Button({
    handleClick,
    isDisabled,
    children,
}: PropType) {
    return (
        <p>
            <button onClick={handleClick} disabled={!isDisabled}>
                {children}
            </button>
        </p>
    );
}
