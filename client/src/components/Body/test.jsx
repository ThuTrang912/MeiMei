
// export default Test;
import React, { useState, useEffect } from 'react';
const Test = () => {
  //仮のuser_id
  const user_id=309423;
  const [data, setData] = useState([]); // Sử dụng useState để lưu trữ dữ liệu từ API

  useEffect(() => { //su dung useEffect de use fetch va lưu dữ liệu lấy đc từ API vào setData rồi update biến data 
    // Sử dụng fetch để lấy dữ liệu từ API
    fetch(`http://127.0.0.1:8000/api/user/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data); // Cập nhật trạng thái với dữ liệu từ API
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu:", error);
      });
  }, []);
  return (
    <div>
      <p>this is test</p>
      {/* sử dụng map để lấy dữ liệu của data */}

      
      {data.map((element) => {
        if (element.id_card===user_id) {
          return (
            <div key={element.id_card}>
              {element.id_card}
            </div>
          );
        }
        return null; // Nếu không thỏa điều kiện, return null để không hiển thị gì cả
      })}
    

    </div>
  );
};

export default Test;


