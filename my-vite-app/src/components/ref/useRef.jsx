import { useEffect, useRef, useState } from "react";

function FocusInput() {
  const count = useRef(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    count.current += 1;
    console.log("Render lần:", count.current);
  });

  useEffect(() => {
    setValue((value) => value + 1);
    console.log("Render lần:", count.current);
  }, []);

  return (
    <div>
      <p className="m-5">Giá trị: {value}</p>
      <button
        className="m-5 bg-green border border-amber-400"
        onClick={() => setValue(value + 1)}
      >
        Tăng
      </button>
    </div>
  );
}
export default FocusInput;
