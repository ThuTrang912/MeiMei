import React, { useState } from 'react';
import './GenderTheme.css'; // Đảm bảo đã import file CSS cho GenderTheme

const GenderTheme = ({selectedOption,setSelectedOption}) => {

  const [male, setMale] = useState('male'); 
  const [female, setFemale] = useState('female'); 
  const [other, setOther] = useState('other');
  
  return (
    <div className="GenderContainer">
      <label className='FormLabel'>性別</label>
      <div className='Row'>      
        <div className='GenderOption'>
          <label>男性</label>
          <input
            className='GenderInput'
            type="radio"
            value={male}
            checked={selectedOption === male}
            onChange={() => setSelectedOption(male)} // Sửa giá trị ở đây
          />
        </div>
        <div className='GenderOption'>
          <label>女性</label>
          <input
            className='GenderInput'
            type="radio"
            value={female}
            checked={selectedOption === female}
            onChange={() => setSelectedOption(female)} // Sửa giá trị ở đây
          />
        </div>
        <div className='GenderOption'>
          <label>その他</label>
          <input
            className='GenderInput'
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
