import React from 'react'
import SearchButton from './SearchButton'

const SearchBar = () => {
  return (
    //the dic width should be auto but now for testing reasons until we fill it with all inputs it will be 3/6
    <div className=' flex bg-zinc-50 rounded-full w-fit h-10 items-center p-2 px-1 mx-50 mt-10 text-neutral-900 justify-between justify-self-center'>
        
        
        <input
        type="text"
        placeholder="Service"
        className="bg-transparent outline-none w-30 flex-1 px-2 m-1"
        />
        

        
        <input
        type="text"
        placeholder="Destination"
        className="bg-transparent outline-none w-30 flex-1 px-2 m-1"
        />
        
        
        <input
        type="text"
        placeholder="Date"
        className="bg-transparent outline-none w-30 flex-1 px-2 m-1"
        />
        
        
        <input
        type="text"
        placeholder="Prix"
        className="bg-transparent outline-none w-30 flex-1 px-2 m-1"
        />
        
        <SearchButton/>
    </div>
  )
}

export default SearchBar