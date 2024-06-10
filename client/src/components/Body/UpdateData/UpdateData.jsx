import React, { useState } from 'react';
import './UpdateData.css';
import WorkInforUpdate from './WorkInforUpdate';
import { SelectedOptionsProvider,useSelectedOptions} from './SelectedOptionsContext';
import { Link } from 'react-router-dom';

const UpdateData = () => {
  // name-furigana *name
  const [nameFurri,setNameFuri] =useState('');
  const [personName,setPersonName] =useState('');

  // birth date/gender
  const [year,setYear] =useState('');
  const [month,setMonth] =useState('');
  const [day,setDay] =useState('');
  const [age,setAge] =useState('');
  const [male,setMale] =useState('male');
  const [female,setFemale] =useState('female');
  const [other,setOther] =useState('other');
  const [selectedOption,setSelectedOption] =useState('selectedOption');

  // tell*mail*fax
  const [phoneInputs, setPhoneInputs] = useState([{ value: '' }]);
  const [emailInputs, setEmailInputs] = useState([{ value: '' }]);
  const [faxInputs, setFaxInputs] = useState([{ value: '' }]);

  const addPhoneInput = () => {
    setPhoneInputs([...phoneInputs, { value: '' }]);
  };

  const addEmailInput = () => {
    setEmailInputs([...emailInputs, { value: '' }]);
  };

  const addFaxInput = () => {
    setFaxInputs([...faxInputs, { value: '' }]);
  };

  const removePhoneInput = (index) => {
    const newPhoneInputs = [...phoneInputs];
    newPhoneInputs.splice(index, 1);
    setPhoneInputs(newPhoneInputs);
  };

  const removeEmailInput = (index) => {
    const newEmailInputs = [...emailInputs];
    newEmailInputs.splice(index, 1);
    setEmailInputs(newEmailInputs);
  };

  const removeFaxInput = (index) => {
    const newFaxInputs = [...faxInputs];
    newFaxInputs.splice(index, 1);
    setFaxInputs(newFaxInputs);
  };

  // address
  const [addressFuri,setAddressFuri] =useState('');
  const [addressName,setAddressName] =useState('');
  const [postCode,setPostCode] =useState('');

  const handleUpdateData = () =>{
    console.log(nameFurri,personName,);
    console.log(year,month,day,age,selectedOption);
    console.log(phoneInputs,emailInputs,faxInputs);
    console.log(addressFuri,postCode,addressName);

    console.log(workNameFurri,workName);
    console.log(workPhoneInputs,workEmailInputs,workFaxInputs);
    console.log(workAddressFuri,workPostCode,workAddressName);
    console.log(position ,abouMe);
    console.log(inputValue);
  }


  // workinformation
  
  const [workNameFurri, setWorkNameFurri] = useState('');
  const [workName, setWorkName] = useState('');
  const [workPhoneInputs, setWorkPhoneInputs] = useState([{ value: '' }]);
  const [workEmailInputs, setWorkEmailInputs] = useState([{ value: '' }]);
  const [workFaxInputs, setWorkFaxInputs] = useState([{ value: '' }]);
  const [workAddressFuri, setWorkAddressFuri] = useState('');
  const [workAddressName, setWorkAddressName] = useState('');
  const [workPostCode, setWorkPostCode] = useState('');
  const [position, setPosition] = useState('');
  const [abouMe,setAboutMe] = useState('');

  const {inputValue} = useSelectedOptions();

  return (  
    <div className='container'>
      <div className='info-container'>
        <h1>個人情報</h1>
        <div style={{width:'100%',height:'100%',border:'1px solid gray',borderRadius:'5px',marginBottom:'15px'}}>
          <div className='group-furi'>
            <input
                className='Form-input-furi'
                style={{border:'none'}}
                type='text'
                placeholder='フリガナ'
                value={nameFurri}
                onChange={(e) =>setNameFuri(e.target.value)}
            />
          </div>
          <div style={{borderTop:'1px solid gray'}}>
            <input
                className='FormInput'
                style={{border:'none',backgroundColor:'transparent'}}
                type='text'
                placeholder='氏名'
                value={personName}
                onChange={(e) =>setPersonName(e.target.value)}
            />
          </div>
        </div>
        <div className='FormGroup'>
          <div className='BirthdayGroup' style={{ flex:70}}>
              <label style={{textAlign:'center'}}>生年月日</label>
              
              <label style={{textAlign:'center'}}>年</label>
              <input 
                className='CommonInput' 
                type='text'  
                value={year}
                onChange={(e) =>setYear(e.target.value)}
              />
              
              <label style={{textAlign:'center'}}>月</label>
              <input 
                className='CommonInput' 
                type='text' 
                value={month}
                onChange={(e) =>setMonth(e.target.value)}
              />
              
              <label style={{textAlign:'center'}}>日</label>
              <input 
                className='CommonInput' 
                type='text' 
                value={day}
                onChange={(e) =>setDay(e.target.value)}
              />
              
              <label style={{textAlign:'center'}}>性</label>
              <label style={{textAlign:'center'}}>(満 </label>
              <input 
                className='CommonInput' 
                type='text'
                value={age}
                onChange={(e) =>setAge(e.target.value)}
              />
              <label style={{textAlign:'center'}}>才)</label>
          </div>
          <div className='GenderGroup'style={{ flex:30 ,border:'none'}}>
              <label className='FormLabel'>性別</label>
              
              <label className='FormLabel'>男性</label>
              <input 
                className='GenderInput' 
                type='radio' 
                value={male}
                checked={selectedOption === male}
                onChange={() => setSelectedOption(male)}
              />
              
              <label className='FormLabel'>女性</label>
              <input 
                className='GenderInput' 
                type='radio' 
                checked={selectedOption === female}
                onChange={() => setSelectedOption(female)}
              />

              <label className='FormLabel'>その他</label>
              <input 
                className='GenderInput' 
                type='radio'
                checked={selectedOption === other}
                onChange={() => setSelectedOption(other)}
              />
          </div>
        </div>
        <div className='contact-container'>
          {phoneInputs.map((input, index) => (
            <div className='form-group' key={index}>
              <input
                type='text'
                className='FormInput'
                style={{backgroundColor:'transparent',border:'1px solid gray'}}
                placeholder='電話番号'
                value={input.value}
                onChange={(e) => {
                  const newInputs = [...phoneInputs];
                  newInputs[index].value = e.target.value;
                  setPhoneInputs(newInputs);
                }}
              />
              {index === phoneInputs.length - 1 ? (
                <span onClick={addPhoneInput}>+</span>
              ) : (
                <span onClick={() => removePhoneInput(index)}>-</span>
              )}
            </div>
          ))}
            
          {emailInputs.map((input, index) => (
            <div className='form-group' key={index}>
              <input
                type='email'
                className='FormInput'
                style={{backgroundColor:'transparent',border:'1px solid gray'}}
                placeholder='E-MAIL'
                value={input.value}
                onChange={(e) => {
                  const newInputs = [...emailInputs];
                  newInputs[index].value = e.target.value;
                  setEmailInputs(newInputs);
                }}
              />
              {index === emailInputs.length - 1 ? (
                <span onClick={addEmailInput}>+</span>
              ) : (
                <span onClick={() => removeEmailInput(index)}>-</span>
              )}
            </div>
          ))}
                
          {faxInputs.map((input, index) => (
              <div className='form-group' key={index}>
              <input
                  type='text'
                  className='FormInput'
                  style={{backgroundColor:'transparent',border:'1px solid gray'}}
                  placeholder='FAX'
                  value={input.value}
                  onChange={(e) => {
                  const newInputs = [...faxInputs];
                  newInputs[index].value = e.target.value;
                  setFaxInputs(newInputs);
                  }}
              />
              {index === faxInputs.length - 1 ? (
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
                value={addressFuri}
                onChange={(e) =>setAddressFuri(e.target.value)}
            />
          </div>
          
            <div className='address-group'>
                <span>現住所</span>
                <label>T</label>
                
                {Array.from({ length: 7}, (_, index) => (
                  <input
                    key={index}
                    type='text'
                    value={postCode[index] || ''}
                    onChange={(e) => {
                      const newPostCode = [...postCode];
                      newPostCode[index] = e.target.value;
                      setPostCode(newPostCode.join(''));
                    }}
                  />
                ))}
                
            </div>
            <div>
              <input
                  className='FormInput'
                  style={{border:'none',backgroundColor:'transparent'}}
                  type='text'
                  value={addressName}
                  onChange={(e) =>setAddressName(e.target.value)}
              />
            </div>
        </div>
        <WorkInforUpdate
          workNameFurri={workNameFurri}
          setWorkNameFurri={setWorkNameFurri}
          workName={workName}
          setWorkName={setWorkName}
          workPhoneInputs={workPhoneInputs}
          setWorkPhoneInputs={setWorkPhoneInputs}
          workEmailInputs={workEmailInputs}
          setWorkEmailInputs={setWorkEmailInputs}
          workFaxInputs={workFaxInputs}
          setWorkFaxInputs={setWorkFaxInputs}
          workAddressFuri={workAddressFuri}
          setWorkAddressFuri={setWorkAddressFuri}
          workAddressName={workAddressName}
          setWorkAddressName={setWorkAddressName}
          workPostCode={workPostCode}
          setWorkPostCode={setWorkPostCode}
          positions={position}
          setPotions={setPosition}
          abouMe={abouMe}
          setAboutMe={setAboutMe}
          inputValue={inputValue}
        />
        <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'4%'}}>
          <button className='FormButton' style={{width:'50%'}} onClick={handleUpdateData}>編集</button>
        </div>
        <div style={{display:'flex',justifyContent:'end'}}><Link to={'/Main'} style={{color:'black'}}>戻る</Link></div>
      </div>
    </div>
  );
};

export default UpdateData;
