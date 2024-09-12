const Button = ({
  type,
  label,
  classname,
  onClick,
  disabled,
}: {
  type: "button" | "submit" | "reset";
  label: string;
  classname?: string;
  disabled?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type={type}
      className={`w-full px-2 py-3 text-white font-semibold bg-black rounded-lg hover:opacity-70 ${classname}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
