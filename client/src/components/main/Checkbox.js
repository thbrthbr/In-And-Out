export default function Checkbox(props) {
  const { type, name, checked, handleOnChange } = props;
  return (
    <input
      type="checkbox"
      value={type}
      name={name}
      checked={checked}
      onChange={handleOnChange}
    />
  );
}
