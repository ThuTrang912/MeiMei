import React from 'react';
import './NotifiCation.css';

const NotifiCation = ({onClose}) => {

    return (
        <div className='notifiCation-container'>
            <div className='grid'>
                <h2 style={{borderBottom:'none',fontSize:'2vw',margin:'0',whiteSpace:'nowrap'}}>通知</h2>
                <button style={{position:'absolute', width:'20px',height:'20px',lineHeight:'1',cursor:'pointer',fontSize:'12px',top:'7px',right:'7px'}} onClick={onClose}>x</button>
            </div>
           {/* vi du list danh sach thong bao */}
            <li>
                <div className='grid'>
                    <div className='image-container' style={{border:'1px solid #ccc',width:'5vh',height:'5vh'}}>
                        <img 
                            className='image'
                            src='https://cdn.dribbble.com/users/2645/screenshots/197202/media/44b8a3db56f1f459e694118e36857c7e.png?resize=400x300&vertical=center' 
                            alt=''
                        />
                    </div>
                    <div>
                        <div><b>aaa</b>があなたをフォロー中です。</div>
                        <div className='formattedDate'>time</div>
                    </div>
                </div>
            </li>
            <li>
                <div className='grid'>
                    <div className='image-container' style={{border:'1px solid #ccc',width:'5vh',height:'5vh'}}>
                        <img 
                            className='image'
                            src='https://cdn.dribbble.com/users/2645/screenshots/197202/media/44b8a3db56f1f459e694118e36857c7e.png?resize=400x300&vertical=center' 
                            alt=''
                        />
                    </div>
                    <div>
                        <div><b>bbb</b>があなたをフォロー中です。</div>
                        <div className='formattedDate'>time</div>
                    </div>
                </div>
            </li>
            
        </div>
    );
};

export default NotifiCation;