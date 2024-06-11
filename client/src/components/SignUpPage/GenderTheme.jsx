import React, { useState } from 'react';
import './GenderTheme.css'; // Đảm bảo đã import file CSS cho GenderTheme

const GenderTheme = ({selectedOption,setSelectedOption}) => {

  const [male, setMale] = useState('male'); 
  const [female, setFemale] = useState('female'); 
  const [other, setOther] = useState('other');
  
  return (
    <div className="flex flex-col w-full h-full">
      <label className='font-bold text-green-500 text-sm p-1.5'>性別</label>
      <div className='grid w-full h-full grid-cols-3 gap-2'>      
        <div className='flex items-center justify-around w-full h-10 col-span-1 border border-gray-300 border-solid rounded-lg'>
          <label>男性</label>
          <input
            className='w-4 h-4 GenderInput'
            type="radio"
            value={male}
            checked={selectedOption === male}
            onChange={() => setSelectedOption(male)} // Sửa giá trị ở đây
          />
        </div>
        <div className='flex items-center justify-around w-full h-10 col-span-1 border border-gray-300 border-solid rounded-lg'>
          <label>女性</label>
          <input
            className='w-4 h-4 GenderInput'
            type="radio"
            value={female}
            checked={selectedOption === female}
            onChange={() => setSelectedOption(female)} // Sửa giá trị ở đây
          />
        </div>
        <div className='flex items-center justify-around w-full h-10 col-span-1 border border-gray-300 border-solid rounded-lg'>
          <label>その他</label>
          <input
            className='w-4 h-4 GenderInput'
            type="radio"
            value={other}
            checked={selectedOption === other}
            onChange={() => setSelectedOption(other)} // Sửa giá trị ở đây
          />
        </div>
      </div>
    </div>
  );
};

export default GenderTheme;
