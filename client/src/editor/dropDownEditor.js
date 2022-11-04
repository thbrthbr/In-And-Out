import { useCategoryDropDownItemStore } from "../store/store.js";
// const titles = ["", "교통비", "전화비", "식비"];

export default function DropDownEditor({ row, onRowChange }) {
  const { categoryItemList, setCategoryItemList } =
    useCategoryDropDownItemStore();

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
