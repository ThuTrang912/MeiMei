import React, { useState } from 'react';
import './Search.css';

const Search = () => {

    // Dữ liệu ví dụ
    const initialData = [
        {id : 1, name : 'huyen trang'},
        {id : 2, name : 'trang kieu'},
        {id : 3, name : 'nhi'},
        {id : 4, name : 'yen nhi'},
        {id : 5, name : 'trang nhi'},
    ];

    const [data, setData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        const filteredData = initialData.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setData(filteredData);
        console.log(filteredData);
    };

    const handleInputChange = event => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="search-container">
            <input
                className='FormInput'
                type="text"
                placeholder="検索"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button className='FormButton' onClick={handleSearch}><span className="SearchIcon"><img src='https://cdn-icons-png.flaticon.com/128/151/151773.png' alt='' /></span></button>
            {/* <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul> */}
        </div>
    );
}

export default Search;
