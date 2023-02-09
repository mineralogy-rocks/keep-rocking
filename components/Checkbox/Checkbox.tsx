import clsx from 'clsx';

export default function Checkbox({ label, name, value, onChange, checked = true, disabled = false, className, ...props } :
  { label: string,
    name: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    checked: boolean,
    disabled?: boolean,
    className?: string }) {
  return (
    <div className={clsx("flex items-center", className)} {...props}>
      <input type="checkbox"
             name={name}
             value={value}
             onChange={onChange}
             checked={checked}
             disabled={disabled}
             className="form-checkbox h-3 w-3 text-gray-600" />
      <label htmlFor={name} className="ml-2 text-sm text-gray-700">{label}</label>
    </div>
  )
};
