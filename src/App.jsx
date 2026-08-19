import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {

  const [data, setData] = useState([])
  const [count, setCount] = useState(1)

  useEffect(() =>{
    const getData = async()=>{
    const response = await axios.get(`https://picsum.photos/v2/list?page=${count}&limit=40`)
    // console.log(response.data)
    setData(response.data)
  }
  getData()
  }, [count])




  return (
    <div className="min-h-screen bg-gray-950 text-white">

  {/* Loading State */}
  {data.length === 0 ? (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      <h2 className="text-2xl font-semibold tracking-wide">
        Loading Images...
      </h2>
    </div>
  ) : (
    <>
      {/* Header */}
      <div className="text-center pt-10">
        <h1 className="text-5xl font-bold">
          Image Gallery
        </h1>
        <p className="text-gray-400 mt-3">
          Page {count}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-10">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-red-500/20 hover:-translate-y-2 transition-all duration-300"
          >
            <img
              src={item.download_url}
              alt={item.author}
              loading='lazy'
              className="w-full h-52 object-cover"
            />

            <div className="p-4">
              <p className="font-semibold truncate text-center">
                {item.author}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 pb-10">
        <button
          onClick={() => count > 1 && setCount(count - 1)}
          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-bold transition-all duration-300"
        >
          Prev
        </button>

        <div className="bg-gray-900 px-6 py-3 rounded-xl font-bold text-xl">
          {count}
        </div>

        <button
          onClick={() => setCount(count + 1)}
          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-bold transition-all duration-300"
        >
          Next
        </button>
      </div>
    </>
  )}
</div>

    
  )
}

export default App
