export default function FieldErrors({ errors }) {
  if (!errors || errors.length === 0) return null
  
  return (
    <div className="field_errors">
      {errors.map((error, index) => (
        <div key={index} className="error_message">
          {error}
        </div>
      ))}
    </div>
  )
}