import { ReactNode } from "react"

type FieldBoxProps = {
    label: string | ReactNode
    isRequired?: boolean
    className?: string
    inputType?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const FieldBox = ({label, isRequired, inputType = "text", className, onChange, ...args}: FieldBoxProps) => {
  return (
    <div className={`form-group relative flex items-center bg-white ${className}`}>
      <label>{label}</label>
      <input type={inputType} {...args} />
    </div>
  )
}

export default FieldBox
