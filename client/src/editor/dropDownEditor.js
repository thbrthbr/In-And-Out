const titles = ["식비", "교통비", "전화비"];

export default function dropDownEditor({ row, onRowChange }) {
  return (
    <select
      value={row.category}
      onChange={(event) =>
        onRowChange({ ...row, category: event.target.value }, true)
      }
      autoFocus
    >
      {titles.map((title) => (
        <option key={title} value={title}>
          {title}
        </option>
      ))}
    </select>
  );
}
