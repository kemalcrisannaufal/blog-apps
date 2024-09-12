import Input from "./Input";
import Label from "./Label";

const AuthInput = ({
  name,
  type,
  placeholder,
  label,
}: {
  name: string;
  type: string;
  placeholder: string;
  label: string;
}) => {
  return (
    <div className="w-full mb-3">
      <Label htmlFor={name} label={label} />
      <Input type={type} name={name} placeholder={placeholder} />
    </div>
  );
};

export default AuthInput;
