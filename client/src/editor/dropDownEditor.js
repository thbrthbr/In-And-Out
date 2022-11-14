import { useCategoryDropDownItemStore } from "../store/store.js";

export default function DropDownEditor({ row, onRowChange }) {
  const { categoryItemList } = useCategoryDropDownItemStore();

  return (
    <select
      value={row.category}
      onChange={(event) =>
        onRowChange({ ...row, category: event.target.value }, true)
      }
      autoFocus
    >
      {categoryItemList.map((title) => (
        <option key={title} value={title}>
          {title}
        </option>
      ))}
    </select>
  );
}
