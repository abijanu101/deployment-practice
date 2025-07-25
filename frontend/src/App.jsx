import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [list, setList] = useState([]);
  const inputRef = useRef(null);
  const [fetchFlag, setFetchFlag] = useState(0);

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL)
      .then(res => res.json())
      .then(res => setList(res.list));
  }, [fetchFlag]);

  function handleSubmission() {
    const value = inputRef.current.value;
    if (!value)
      return;

    fetch(import.meta.env.VITE_BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: value
      })
    })
      .then((res) => {
        console.log(res);
        setFetchFlag(!fetchFlag)
      });
  }

  return (
    <>
      <div className="flex justify-center w-full font-mono">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl">Add to the List</h1>

          <div className="flex gap-5">
            <input ref={inputRef} placeholder="New List Item" className="border-b-2 border-dotted text-center w-50 border-green-600"
              onKeyDown={(e) => { if (e.code === 'Enter') handleSubmission() }}
            />
            <button className="p-3 rounded-lg hover:px-4 transition-all duration-200 bg-green-500 text-white hover:brightness-105 cursor-pointer active:scale-95"
              onClick={handleSubmission}
            >
              Insert
            </button>
          </div>
        </div>
      </div>

      <div className="border-1 border-dotted mt-5 font-mono">
        {list.length ?
          <ul>
            {list.map((i, key) =>
              <li key={key} className="w-full border-1 border-dotted hover:text-lg transition-all duration-100 select-none">{i.text}</li>
            )}
          </ul>
          :
          <p className="my-5 text-2xl text-gray-400 text-center">
            List is Empty!
          </p>
        }
      </div>
    </>
  )
}

export default App
