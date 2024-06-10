import React from 'react';

const RecentAccounts = () => {
    return (
        <div className='children-container'>
            
            <li>
                <div className='item-container'>
                    <div className='item-border'>                 
                        <div className='image-container' style={{border:'1px solid #ccc',width:'2.5vw',height:'2.5vw',marginRight:'10px'}}>
                            <img 
                                className='image'
                                src='https://cdn.dribbble.com/users/2645/screenshots/197202/media/44b8a3db56f1f459e694118e36857c7e.png?resize=400x300&vertical=center' 
                                alt=''
                            />
                        </div>
                        <div>
                            <div style={{fontSize:'14px'}}><b>UCHIHA ITACHI</b></div>
                            <div style={{fontSize:'13px'}}>email</div>
                        </div>
                        <div style={{position:'absolute',top:'3px',right:'5px'}}>
                            <img className='image-icon' 
                                style={{width:'10px'}}
                                src='https://th.bing.com/th/id/OIP.HzOg6SObSe_LTAYbD0WHHgHaHa?w=186&h=186&c=7&r=0&o=5&pid=1.7' 
                                alt=''
                                />
                        </div>                   
                    </div>
                    <div style={{position:'relative',top:'30%',color:'gray'}}>time</div>
                </div>
            </li>
            <li>
                <div className='item-container'>
                    <div className='item-border'>                 
                        <div className='image-container' style={{border:'1px solid #ccc',width:'2.5vw',height:'2.5vw',marginRight:'10px'}}>
                            <img 
                                className='image'
                                src='https://cdn.dribbble.com/users/2645/screenshots/197202/media/44b8a3db56f1f459e694118e36857c7e.png?resize=400x300&vertical=center' 
                                alt=''
                            />
                        </div>
                        <div>
                            <div style={{fontSize:'14px'}}><b>UCHIHA ITACHI</b></div>
                            <div style={{fontSize:'13px'}}>email</div>
                        </div>
                        <div style={{position:'absolute',top:'3px',right:'5px'}}>
                            <img className='image-icon' 
                                style={{width:'10px'}}
                                src='https://th.bing.com/th/id/OIP.HzOg6SObSe_LTAYbD0WHHgHaHa?w=186&h=186&c=7&r=0&o=5&pid=1.7' 
                                alt=''
                                />
                        </div>                   
                    </div>
                    <div style={{position:'relative',top:'30%',color:'gray'}}>time</div>
                </div>
            </li>
        </div>
    );
};

export default RecentAccounts;