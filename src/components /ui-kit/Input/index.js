import cn from 'classnames';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import InputMask from 'react-input-mask';

const Input = ({
  error = '',
  value = '',
  type = '',
  placeholder = 'text',
  onChange = () => {},
  className,
  style,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const inputRef = React.createRef();

  return (
    <div className={cn(styles.input_wrapper, style)} style={props.styles}>
      <div
        onClick={() => inputRef.current.focus()}
        className={cn(
          styles.placeholder,
          (focus || value.length > 0) && styles.placeholder_top,
          focus && styles.green_color,
        )}
      >
        {placeholder}
      </div>
      {type === 'phone' ? (
        <InputMask
          mask="+7 999 999-99-99"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          {() => (
            <input
              ref={inputRef}
              className={cn(styles.input_base, error.length > 0 && !focus && styles.error_input, className)}
              {...props}
            />
          )}
        </InputMask>
      ) : (
        <input
          ref={inputRef}
          className={cn(styles.input_base, error.length > 0 && !focus && styles.error_input, className)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={value}
          onChange={e => onChange(e.target.value)}
          {...props}
        />
      )}
      {error.length > 0 && !focus && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Input;
