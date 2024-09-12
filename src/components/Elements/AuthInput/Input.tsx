type inputProps = {
  type: string;
  name: string;
  placeholder: string;
};

const Input = (props: inputProps) => {
  const { type, name, placeholder } = props;
  return (
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      className="w-full px-2 py-3 border border-neutral-200 rounded-lg shadow-sm"
    />
  );
};

export default Input;
