export default function Input({ label, type, id, value, onChange, onBlur, isInvalid, errorMsg }) {
     return (
          <>
               <label htmlFor={id}>{label}</label>
               <input 
                    type={type}
                    id={id}
                    className='form-control'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
               />
               {isInvalid && (
                    <p className='mt-1 mb-0' style={{ color: '#e61818' }}>
                         {errorMsg}
                    </p>
               )}
          </>
     )
}
