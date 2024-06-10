import React, { useState } from 'react';
import { useSelectedOptions } from './SelectedOptionsContext';

const ImageOption = ({ src, alt, onDelete,inputValue, onInputChange }) => {
  
  return (
    <div style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'center', marginBottom: '5px' }}>
      <img src={src} alt={alt} style={{ width: '2.5%' }} />
      <input
        type="text"
        className='FormInput'
        style={{ padding: '0.4%', margin: '0.5%' }}
        value={inputValue}
        onChange={onInputChange}
      />
      <button style={{ width: '5%', cursor: 'pointer' }} onClick={onDelete}>消す</button>
    </div>
  );
};

const imageOptionsData = [
  { value: 'フェイスブック', src: 'https://cdn-icons-png.flaticon.com/128/1384/1384085.png', alt: 'フェイスブック' },
  { value: 'ユーチューブ', src: 'https://cdn-icons-png.flaticon.com/128/1077/1077046.png', alt: 'ユーチューブ' },
  { value: 'インスタグラム', src: 'https://cdn-icons-png.flaticon.com/128/1077/1077042.png', alt: 'インスタグラム' },
];

const ImageSelectionSection = () => {
  const { selectedOptions, setSelectedOptions, inputValue, setInputValue } = useSelectedOptions();
  const [imageOptions, setImageOptions] = useState(selectedOptions);

  const addOption = (src, selectedValue) => {
    const newImageOptions = [...imageOptions, { src, inputValue: selectedValue }];
    setImageOptions(newImageOptions);
    setSelectedOptions(newImageOptions);
  };

  const deleteOption = (index) => {
    const updatedOptions = imageOptions.filter((_, i) => i !== index);
    setImageOptions(updatedOptions);
    setSelectedOptions(updatedOptions);
  };

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    console.log('Đã chọn tùy chọn:', selectedValue);

    const selectedOption = imageOptionsData.find(option => option.value === selectedValue);
    if (selectedOption) {
      addOption(selectedOption.src, selectedValue);
    }
    setInputValue(selectedValue); // Cập nhật giá trị inputValue
  };

  const handleInputChange = (event, index) => {
    const newImageOptions = [...imageOptions];
    newImageOptions[index].inputValue = event.target.value;
    setImageOptions(newImageOptions);
    setInputValue(event.target.value);
  };
  

  return (
    <section className="image-selection-section">
      <div className="image-options">
        {imageOptions.map((option, index) => (
          <ImageOption
            key={index}
            src={option.src}
            alt={`Tùy chọn ${index + 1}`}
            inputValue={option.inputValue}
            onInputChange={(event) => handleInputChange(event, index)}
            onDelete={() => deleteOption(index)}
          />
        ))}
      </div>
      <div>
        <select style={{ width: '100%', padding: '10px', fontSize: '15px' }} className="content" onChange={handleOptionChange}>
          <option value="" disabled selected>
            iconを選んでください
          </option>
          {imageOptionsData.map(option => (
            <option key={option.value} value={option.value}>
              {option.alt}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default ImageSelectionSection;
