import { useState } from 'react';

const TestingComponent = () => {
  const [tableData, setTableData] = useState([
    // Initial data for the table
    { state: '', transitions: '', isStartState: false, isFinalState: false },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    setTableData((prevData) => {
      const newData = [...prevData];
      if (type === 'checkbox') {
        newData[index][name] = checked;
      } else {
        newData[index][name] = value;
      }
      return newData;
    });
  };

  const addRow = () => {
    setTableData((prevData) => [
      ...prevData,
      { state: '', transitions: '', isStartState: false, isFinalState: false },
    ]);
  };

  const removeRow = (index) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  const convertToDFA = () => {
    // Logic to convert NFA to DFA
    // You can use the tableData state to perform the conversion
    // and update the state with the DFA representation
    console.log('Convert to DFA:', tableData);
  };

  return (
    <div className="my-4">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">State</th>
            <th className="px-4 py-2">Transitions</th>
            <th className="px-4 py-2">Start State</th>
            <th className="px-4 py-2">Final State</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  name="state"
                  value={row.state}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  name="transitions"
                  value={row.transitions}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="checkbox"
                  name="isStartState"
                  checked={row.isStartState}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="checkbox"
                  name="isFinalState"
                  checked={row.isFinalState}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => removeRow(index)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addRow}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mt-4 rounded"
      >
        Add Row
      </button>
      <button
        onClick={convertToDFA}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 ml-4 mt-4 rounded"
      >
        Convert to DFA
      </button>
    </div>
  );
};

export default TestingComponent;
