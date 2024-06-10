import React ,{ useState } from 'react';
import ImageSelectionSection from './ImageSelectionSection';
import { useSelectedOptions } from './SelectedOptionsContext';

const WorkInforUpdate = ({
    workNameFurri,
    setWorkNameFurri,
    workName,
    setWorkName,
    workPhoneInputs,
    setWorkPhoneInputs,
    workEmailInputs,
    setWorkEmailInputs,
    workFaxInputs,
    setWorkFaxInputs,
    workAddressFuri,
    setWorkAddressFuri,
    workAddressName,
    setWorkAddressName,
    workPostCode,
    setWorkPostCode,
    positions,
    setPotions,
    abouMe,
    setAboutMe,
  }) => {
    const {inputValue} = useSelectedOptions();

  const addPhoneInput = () => { 
    setWorkPhoneInputs([...workPhoneInputs, { value: '' }]);
  };

  const addEmailInput = () => {
    setWorkEmailInputs([...workEmailInputs, { value: '' }]);
  };

  const addFaxInput = () => {
    setWorkFaxInputs([...workFaxInputs, { value: '' }]);
  };

  const removePhoneInput = (index) => {
    const newPhoneInputs = [...workPhoneInputs];
    newPhoneInputs.splice(index, 1);
    setWorkPhoneInputs(newPhoneInputs);
  };

  const removeEmailInput = (index) => {
    const newEmailInputs = [...workEmailInputs];
    newEmailInputs.splice(index, 1);
    setWorkEmailInputs(newEmailInputs);
  };

  const removeFaxInput = (index) => {
    const newFaxInputs = [...workFaxInputs];
    newFaxInputs.splice(index, 1);
    setWorkFaxInputs(newFaxInputs);
  };

    return (
        <div className='info-container'>
            <h1>勤務情報</h1>
            <div style={{width:'100%',height:'100%',border:'1px solid gray',borderRadius:'5px',marginBottom:'15px'}}>
                <div className='group-furi'>
                <input
                    className='Form-input-furi'
                    style={{border:'none'}}
                    type='text'
                    placeholder='フリガナ'
                    value={workNameFurri}
                    onChange={(e) =>setWorkNameFurri(e.target.value)}
                />
                </div>
                <div style={{borderTop:'1px solid gray'}}>
                <input
                    className='FormInput'
                    style={{border:'none',backgroundColor:'transparent'}}
                    type='text'
                    placeholder='会社名'
                    value={workName}
                    onChange={(e) =>setWorkName(e.target.value)}
                />
                </div>
            </div>
          

            <div className='contact-container'>
                {workPhoneInputs.map((input, index) => (
                <div className='form-group' key={index}>
                    <input
                    type='text'
                    className='FormInput'
                    style={{backgroundColor:'transparent',border:'1px solid gray'}}
                    placeholder='電話番号'
                    value={input.value}
                    onChange={(e) => {
                        const newInputs = [...workPhoneInputs];
                        newInputs[index].value = e.target.value;
                        setWorkPhoneInputs(newInputs);
                    }}
                    />
                    {index === workPhoneInputs.length - 1 ? (
                    <span onClick={addPhoneInput}>+</span>
                    ) : (
                    <span onClick={() => removePhoneInput(index)}>-</span>
                    )}
                </div>
                ))}
                
                {workEmailInputs.map((input, index) => (
                <div className='form-group' key={index}>
                    <input
                    type='email'
                    className='FormInput'
                    style={{backgroundColor:'transparent',border:'1px solid gray'}}
                    placeholder='E-MAIL'
                    value={input.value}
                    onChange={(e) => {
                        const newInputs = [...workEmailInputs];
                        newInputs[index].value = e.target.value;
                        setWorkEmailInputs(newInputs);
                    }}
                    />
                    {index === workEmailInputs.length - 1 ? (
                    <span onClick={addEmailInput}>+</span>
                    ) : (
                    <span onClick={() => removeEmailInput(index)}>-</span>
                    )}
                </div>
                ))}
                    
                {workFaxInputs.map((input, index) => (
                    <div className='form-group' key={index}>
                    <input
                        type='text'
                        className='FormInput'
                        style={{backgroundColor:'transparent',border:'1px solid gray'}}
                        placeholder='FAX'
                        value={input.value}
                        onChange={(e) => {
                        const newInputs = [...workFaxInputs];
                        newInputs[index].value = e.target.value;
                        setWorkFaxInputs(newInputs);
                        }}
                    />
                    {index === workFaxInputs.length - 1 ? (
                        <span onClick={addFaxInput}>+</span>
                    ) : (
                        <span onClick={() => removeFaxInput(index)}>-</span>
                    )}
                    </div>
                ))}
            </div>        
            <div className='address-container'>
                <div className='group-furi'>
                <input
                    className='Form-input-furi'
                    style={{border:'none'}}
                    type='text'
                    placeholder='フリガナ'
                    value={workAddressFuri}
                    onChange={(e) =>setWorkAddressFuri(e.target.value)}
                />
                </div>
                
                <div className='address-group'>
                    <span>現住所</span>
                    <label>T</label>
                    
                    {Array.from({ length: 7}, (_, index) => (
                        <input
                        key={index}
                        type='text'
                        value={workPostCode[index] || ''}
                        onChange={(e) => {
                            const newPostCode = [...workPostCode];
                            newPostCode[index] = e.target.value;
                            setWorkPostCode(newPostCode.join(''));
                        }}
                        />
                    ))}
                    
                </div>
                <div>
                    <input
                        className='FormInput'
                        style={{border:'none',backgroundColor:'transparent'}}
                        type='text'
                        value={workAddressName}
                        onChange={(e) =>setWorkAddressName(e.target.value)}
                    />
                </div>
            </div>

            <div style={{border:'1px solid gray',borderRadius:'5px',margin:'15px 0px 15px 0px'}}>
                <input
                    className='FormInput'
                    style={{border:'none',backgroundColor:'transparent'}}
                    placeholder='役職'
                    type='text'
                    value={positions}
                    onChange={(e) =>setPotions(e.target.value)}
                />
            </div>
            <h3>インターネット</h3>
                <div style={{display:'flex',flexDirection:'column',border:'1px solid gray',borderRadius:'5px',margin:'15px 0px 15px 0px',padding:'10px'}}>
                    <ImageSelectionSection inputValue={inputValue}/>
                </div>
                <h3>私について</h3>
                <div style={{border:'1px solid gray',borderRadius:'5px',margin:'15px 0px 15px 0px'}}>
                    <div>
                        <textarea 
                            className='FormInput'
                            style={{border:'none',backgroundColor:'transparent'}}
                            value={abouMe}
                            onChange={(e) =>setAboutMe(e.target.value)}
                        />
                    </div>
                </div>
        </div>

    );
  };

export default WorkInforUpdate;