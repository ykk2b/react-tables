import { useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

export default function App() {
  const [data, setData] = useState<string[][]>([["hello world"]]);
  const [lowerRow, setLowerRow] = useState<boolean>(false);
  const [higherRow, setHigherRow] = useState<boolean>(false);
  const [startCol, setStartCol] = useState<boolean>(false);
  const [endCol, setEndCol] = useState<boolean>(false);
  const [editing, setEditing] = useState<[number, number]>([-1, -1]);

  const transposeAddData = data[0].map((_, colIndex) =>
    data.map((row) => row[colIndex])
  );

  const transposeRemoveData = (): string[][] => {
    return data.map((row) => row.slice(0, -1));
  };

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
        {higherRow && (
          <div className="flex w-full gap-x-2">
            <div
              className="cursor-pointer bg-black text-white p-1 font-semibold flex justify-center w-full"
              onClick={() => {
                const sample: string[] = [];
                data.forEach(() => {
                  sample.push("");
                });
                setData([sample, ...data]);
              }}
            >
              <FaPlus size={20} />
            </div>
            <div
              className="cursor-pointer bg-black text-white p-1 font-semibold flex justify-center w-full"
              onClick={() => {
                setData(data.reverse().slice(0, -1));
              }}
            >
              <FaMinus size={20} />
            </div>
          </div>
        )}
        <div className="flex relative">
          {startCol && (
            <div className="flex flex-col absolute -right-[2.2rem] h-full gap-y-2">
              <div
                className="cursor-pointer bg-black text-white p-1 font-semibold h-full flex flex-col justify-center text-center"
                onClick={() => {
                  const updatedData = data.map((row) => [...row, ""]);
                  setData(updatedData);
                }}
              >
                <FaPlus size={20} />
              </div>
              <div
                className="cursor-pointer bg-black text-white p-1 font-semibold h-full flex flex-col justify-center text-center"
                onClick={() => {
                  setData(transposeRemoveData());
                }}
              >
                <FaMinus size={20} />
              </div>
            </div>
          )}
          {transposeAddData.map((column, columnIndex) => (
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
            <div className="flex flex-col absolute -left-[2.2rem] h-full gap-y-2">
              <div
                className="cursor-pointer bg-black text-white p-1 font-semibold h-full flex flex-col justify-center text-center"
                onClick={() => {
                  const updatedData = data.map((row) => ["", ...row]);
                  setData(updatedData);
                }}
              >
                <FaPlus size={20} />
              </div>
              <div
                className="cursor-pointer bg-black text-white p-1 font-semibold h-full flex flex-col justify-center text-center"
                onClick={() => {
                  setData(data.map((row) => row.slice(1)));
                }}
              >
                <FaMinus size={20} />
              </div>
            </div>
          )}
        </div>
        {lowerRow && (
          <div className="flex w-full gap-x-2">
            <div
              className="cursor-pointer bg-black text-white p-1 font-semibold flex justify-center w-full"
              onClick={() => {
                setData([...data, []]);
              }}
            >
              <FaPlus size={20} />
            </div>
            <div
              className="cursor-pointer bg-black text-white p-1 font-semibold flex justify-center w-full"
              onClick={() => {
                setData(data.slice(0, -1));
              }}
            >
              <FaMinus size={20} />
            </div>
          </div>
        )}
        <div
          onClick={() => setData([["hello world"]])}
          className="cursor-pointer mt-4"
        >
          <FaTrash size={20} />
        </div>
      </div>
    </main>
  );
}
