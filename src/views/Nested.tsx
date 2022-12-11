import React from 'react'
import { useFieldArray } from "react-hook-form";

interface NestedProps {
  nestIndex: any
  control: any
  register: any
}

const Nested: React.FC<NestedProps> = ({ nestIndex, control, register }) => {

  const { fields, remove, append } = useFieldArray({
    control,
    name: `description[${nestIndex}].material`
  });

  return (
    <div>
      {fields.map((item, k) => {
        return (
          <div key={item.id} style={{ marginLeft: 20 }}>
            <input
              {...register(`description[${nestIndex}].material[${k}].field2` as const)}
            />
            <button type="button" onClick={() => remove(k)}>
              Delete Nested
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() =>
          append({
            field1: "field1",
            field2: "field2"
          })
        }
      >
        Append Nested
      </button>

      <hr />
    </div>
  )
}

export default Nested