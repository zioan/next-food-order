import { useRef } from 'react';

function InputField(props) {
  const { label, altLabel, type, placeholder, inputValue } = props;
  const inputRef = useRef();
  inputValue = inputRef.current.value;

  return (
    <div className='form-control w-full max-w-xs'>
      <label className='label'>
        <span className='label-text'>{label}</span>
        <span className='label-text-alt'>{altLabel ? altLabel : ''}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className='input input-bordered w-full max-w-xs'
        ref={inputRef}
      />
    </div>
  );
}

export default InputField;
