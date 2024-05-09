import { ReactNode } from "react"

type FieldInputProps = {
    children: ReactNode
    className?: string
}
const FieldInput = ({children, className}: FieldInputProps) => {
  return (
    <div className={`form-group relative flex items-center bg-white ${className}`}>
      {children}
    </div>
  )
}

export default FieldInput
