import { useState } from "react";

export default function App() {
  const [data, setData] = useState<string[][]>([["hello world"]]);
  const [lowerRow, setLowerRow] = useState<boolean>(false);
  const [higherRow, setHigherRow] = useState<boolean>(false);
  const [startCol, setStartCol] = useState<boolean>(false);
  const [endCol, setEndCol] = useState<boolean>(false);
  const [editing, setEditing] = useState<[number, number]>([-1, -1]);

  const transposedData = data[0].map((_, colIndex) =>
    data.map((row) => row[colIndex])
  );

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div
        className="flex flex-col flex-nowrap border p-2"
        onMouseLeave={() => {
          setLowerRow(false);
          setHigherRow(false);
          setStartCol(false);
          setEndCol(false);
        }}
      >
        <div
          onClick={() => setData([["hello world"]])}
          className="cursor-pointer"
        >
          reset
        </div>
        {higherRow && (
          <div
            className="cursor-pointer bg-black text-white p-1 font-semibold"
            onClick={() => {
              const sample: string[] = [];
              data.forEach(() => {
                sample.push("");
              });
              setData([sample, ...data]);
            }}
          >
            add row
          </div>
        )}
        <div className="flex relative">
          {startCol && (
            <div
              className="cursor-pointer bg-black text-white p-1 font-semibold absolute -right-[6.5rem] h-full flex flex-col justify-center text-center"
              onClick={() => {
                const updatedData = data.map((row) => [...row, ""]);
                setData(updatedData);
              }}
            >
              add column
            </div>
          )}
          {transposedData.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="flex flex-col"
              onMouseEnter={() => {
                if (columnIndex === data[0].length - 1) {
                  setStartCol(true);
                  setEndCol(false);
                } else if (columnIndex === 0) {
                  setEndCol(true);
                  setStartCol(false);
                } else {
                  setEndCol(false);
                  setStartCol(false);
                }
              }}
            >
              {column.map((cell, rowIndex) => (
                <div
                  key={`${columnIndex}-${rowIndex}`}
                  className="border border-black p-2 hover:bg-slate-300 cursor-pointer mx-0 my-1 h-12 min-w-8"
                  title={`${rowIndex}, ${columnIndex}`}
                  onMouseEnter={() => {
                    if (rowIndex === column.length - 1) {
                      setLowerRow(true);
                      setHigherRow(false);
                    } else if (rowIndex === 0) {
                      setHigherRow(true);
                      setLowerRow(false);
                    } else {
                      setHigherRow(false);
                      setLowerRow(false);
                    }
                  }}
                  onDoubleClick={() => setEditing([rowIndex, columnIndex])}
                >
                  {editing[0] === rowIndex && editing[1] === columnIndex ? (
                    <>
                      <input
                        className="outline-none"
                        value={data[rowIndex][columnIndex]}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setData((prevData) => {
                            const newData = [...prevData];
                            newData[rowIndex][columnIndex] = newValue;
                            return newData;
                          });
                        }}
                      />
                      <span onClick={() => setEditing([-1, -1])}>update</span>
                    </>
                  ) : (
                    cell
                  )}
                </div>
              ))}
            </div>
          ))}
          {endCol && (
            <div
              className="cursor-pointer bg-black text-white p-1 font-semibold absolute -left-[6.5rem] h-full flex flex-col justify-center text-center"
              onClick={() => {
                const updatedData = data.map((row) => ["", ...row]);
                setData(updatedData);
              }}
            >
              add column
            </div>
          )}
        </div>
        {lowerRow && (
          <div
            className="cursor-pointer bg-black text-white p-1 font-semibold"
            onClick={() => {
              setData([...data, []]);
            }}
          >
            add row
          </div>
        )}
      </div>
    </main>
  );
}
