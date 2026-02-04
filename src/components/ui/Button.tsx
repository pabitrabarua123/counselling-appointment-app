
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

function Button ({children, ...props} : ButtonProps) {
  return (
    <button
    
    >
     {children}
    </button>
  )
}