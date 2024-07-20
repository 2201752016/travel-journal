import styles from './Dropdown.module.css';

const Dropdown = ({ label, options, value, onChange }) => {
  return (
    <div className={styles.dropdown}>
      <label>{label}</label>
      <select value={value} onChange={onChange} className={styles.select}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
