type labelProps = {
  htmlFor: string;
  label: string;
};

const Label = (props: labelProps) => {
  const { htmlFor, label } = props;
  return (
    <label htmlFor={htmlFor} className="text-sm text-neutral-700 font-semibold">
      {label}
    </label>
  );
};

export default Label;
