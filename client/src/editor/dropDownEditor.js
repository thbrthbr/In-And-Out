import { useCategoryDropDownItemStore } from "../store/store.js";
import Dropdown from "react-multilevel-dropdown";

export default function DropDownEditor({ row, onRowChange }) {
  const { mainCategoryList, categoryItemList } = useCategoryDropDownItemStore();

  return (
    <Dropdown
      position={row.rowNum <= row.totalRow / 2 ? "down-left" : "top-left"}
      title={row.category}
      style={{ width: 200 }}
    >
      {Object.keys(mainCategoryList).map((title) => (
        <div>
          <Dropdown.Item style={{ fontWeight: 900 }}>{title}</Dropdown.Item>
          <Dropdown.Item>
            {mainCategoryList[title].map((detail) => (
              <Dropdown.Item
                onClick={(event) => {
                  console.log(event.target.innerText);
                  onRowChange(
                    { ...row, category: event.target.innerText },
                    true
                  );
                }}
              >
                {detail}
              </Dropdown.Item>
            ))}
          </Dropdown.Item>
        </div>
      ))}
    </Dropdown>
  );
}
