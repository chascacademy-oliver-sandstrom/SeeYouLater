import react, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            onSearch(searchTerm);
        }
    };

    return (
        <div className="flex justify-center w-full">
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border border-gray-300 rounded-1 focus:outline-none"
            />
            <button 
                onClick={(handleSearch)}
                className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 focus:outline-none"
            >
                Search
            </button>
        </div>
    )
}

export default SearchBar;