import { Link, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../../apiConfig';
import axios from "axios";



const Following = ({ searchTerm, onSearchChange }) => {
  const http = axios.create({
    baseURL: `http://${API_BASE_URL}`,
    headers: {
      "X-Requested-with": "XMLHttpRequest",
    },
    withCredentials: true,
  });
  // Truy cập dữ liệu người dùng đã lưu trữ sau khi đăng nhập
  const userData = JSON.parse(localStorage.getItem('currentUser'));
  const id_card = userData.data.id_card;

  const [data, setData] = useState([]);
  const [group, setGroup] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSaved, setIsSaved] = useState();

  // hien thi them xoa nhom
  const [menuVisibleList, setMenuVisibleList] = useState(Array(data.length).fill(false));
  const [isNewGroupVisible, setNewGroupVisible] = useState(Array(data.length).fill(false));
  const [showInput, setShowInput] = useState(Array(data.length).fill(false));
  const [showButtom, setShowButtom] = useState(Array(data.length).fill(false));
  const [openedMenuIndex, setOpenedMenuIndex] = useState(null);
  const [group_name, setGroupName] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);



  const handlePlusGroup = (e, index) => {
    const showInputList = [...showInput];
    showInputList[index] = !showInputList[index];
    setShowInput(showInputList);

    const showButtomtList = [...showButtom];
    showButtomtList[index] = !showButtomtList[index];
    setShowButtom(showButtomtList);
  };

  const handleMenuClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();

    // Đóng menu trước đó nếu có
    if (openedMenuIndex !== null) {
      setMenuVisibleList((prevMenuList) => {
        const updatedMenuList = [...prevMenuList];
        updatedMenuList[openedMenuIndex] = false;
        return updatedMenuList;
      });
      setNewGroupVisible((prevMenuGroupList) => {
        const updatedMenuGroupList = [...prevMenuGroupList];
        updatedMenuGroupList[openedMenuIndex] = false;
        return updatedMenuGroupList;
      });
    }

    // Mở menu mới
    setMenuVisibleList((prevMenuList) => {
      const updatedMenuList = [...prevMenuList];
      updatedMenuList[index] = !updatedMenuList[index];
      return updatedMenuList;
    })
    // Cập nhật index của menu đang mở
    setOpenedMenuIndex(index);
  };



  const handleCloseMenuClick = (e, index, selectedItems) => {
    const updatedMenuVisibleList = [...menuVisibleList];
    updatedMenuVisibleList[index] = false;
    setMenuVisibleList(updatedMenuVisibleList);

    const updatedisNewGroupVisible = [...isNewGroupVisible];
    updatedisNewGroupVisible[index] = false;
    setNewGroupVisible(updatedisNewGroupVisible);

    // Đặt menu đang mở về null khi đóng
    setOpenedMenuIndex(null);
    setSelectedItems(selectedItems);
  }


  const handleAddToGroupClick = async (e, index, id) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedisNewGroupVisible = [...isNewGroupVisible];
    updatedisNewGroupVisible[index] = !updatedisNewGroupVisible[index];
    setNewGroupVisible(updatedisNewGroupVisible);

    // Lấy danh sách nhóm mới đã thêm
    const response = await fetch(`http://${API_BASE_URL}:8000/api/manage/group/${id}`);
    const responseData = await response.json();
    setSelectedItems(responseData.data);

  };

  // Thêm một sự kiện lắng nghe click ở ngoài menu để đóng menu
  const handleOutsideClick = (e) => {
    // Kiểm tra xem click có xảy ra bên trong element menu hay không
    if (!e.target.closest(".show-menu")) {
      // Đóng tất cả các menu và nhóm mới
      setMenuVisibleList(Array(data.length).fill(false));
      setNewGroupVisible(Array(data.length).fill(false));
      setShowInput(Array(data.length).fill(false));
      setShowButtom(Array(data.length).fill(false));
      setSelectedItems([]);
    }
  };

  const handleDeleteFollowerClick = async (e, index, id_card, contact_id) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetch(`http://${API_BASE_URL}:8000/api/contact/${id_card}/${contact_id}`, {
        method: 'DELETE',
      });
      const responseData = await response.json();
      console.log('delete', responseData);

      const res = await fetch(`http://${API_BASE_URL}:8000/api/manage/${contact_id}`, {
        method: 'DELETE',
      });
      const resData = await res.json();
      console.log('delete', responseData);

      setIsSaved(prevIsSaved => {
        // Sử dụng hàm callback để đảm bảo cập nhật đồng bộ và kích hoạt useEffect
        return !prevIsSaved;
      });
      handleCloseMenuClick(e, index)
    } catch (error) {
      console.error('delete', error);
    }
  };


  // Thêm sự kiện lắng nghe click ở cấp cao nhất, chẳng hạn như trên body hoặc một container lớn
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    // Cleanup sự kiện khi component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    // setSearch(localStorage.getItem('searchTerm'));
    let apiUrl = `http://${API_BASE_URL}:8000/api/contact/following/${id_card}/${currentPage}`;
    // Kiểm tra xem có từ khóa tìm kiếm không
    if (searchTerm) {
      apiUrl = `http://${API_BASE_URL}:8000/api/contact/${id_card}/${currentPage}/${searchTerm}`;

    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData.data);
        setTotalPages(apiData.totalPages);
        console.log('follower: ', apiData);
        // localStorage.setItem('searchTerm', "")
        // setSearch(localStorage.setItem('searchTerm', ""));
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu:", error);
      });
  }, [currentPage, id_card, isSaved, searchTerm]);


  useEffect(() => {
    fetch(`http://${API_BASE_URL}:8000/api/groups/${id_card}`)
      .then((response) => response.json())
      .then((apiData) => {
        setGroup(apiData.data);
        // setTotalPages(apiData.totalPages);
        console.log('groups: ', apiData.data);
        // localStorage.setItem('searchTerm', "")
        // setSearch(localStorage.setItem('searchTerm', ""));
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu:", error);
      });
  }, []);

  // const [isSaved, setIsSaved] = useState(false);
  // const toggleSaved = () => {
  //   setIsSaved(!isSaved);
  // };

  //cách viết phần này của Recent và Following là khác nhau 
  const handleStarClick = (event, id_card, contact_id) => {
    event.preventDefault();
    //event.stopPropagation();

    console.log('click', contact_id);
    fetch(`http://${API_BASE_URL}:8000/api/contact/like/${id_card}/${contact_id}`, {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('like', responseData.data);
        setIsSaved(responseData.data.like);
      })
      .catch((error) => {
        console.error('like', error);
      });
  };

  //
  const handleCreateGroup = async (e, index) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("group_name", group_name);
      formData.append("id_card", id_card);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      // Gửi dữ liệu bằng updatedDatas
      const csrf = await http.get("/sanctum/csrf-cookie");

      const addGroup = await http.post(
        `http://${API_BASE_URL}:8000/api/group`,
        formData
      );

      // Lấy danh sách nhóm mới đã thêm
      const response = await fetch(`http://${API_BASE_URL}:8000/api/groups/${id_card}`);
      const responseData = await response.json();
      setGroup(responseData.data);

      const user = await http.get(
        `http://${API_BASE_URL}:8000/api/user/${id_card}`
      );
      const current = localStorage.setItem("currentUser", JSON.stringify(user)); // update localstorage
      console.log("Added Group Successful");
      setGroupName('');
      setIsSaved(prevIsSaved => {
        // Sử dụng hàm callback để đảm bảo cập nhật đồng bộ và kích hoạt useEffect
        return !prevIsSaved;
      })
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  // Cập nhật các mục đã chọn
  // Cập nhật các mục đã chọn
  const handleCheckboxChange = async (event, group_id, id_card) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      try {
        // Kiểm tra xem id_card đã tồn tại trong group_id hay chưa
        const checkExistenceResponse = await http.get(`http://${API_BASE_URL}:8000/api/manage/${group_id}/${id_card}`);
        if (checkExistenceResponse.data.length !== 0) {
          console.log("User already exists in the group. No action needed.");
        } else {
          const formData = new FormData();
          formData.append("group_id", group_id);
          formData.append("id_card", id_card);

          for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          }

          // Gửi dữ liệu bằng updatedDatas
          const csrf = await http.get("/sanctum/csrf-cookie");

          const addGroup = await http.post(
            `http://${API_BASE_URL}:8000/api/manage`,
            formData
          );

          console.log("Added User to Group Successful");
        }
      } catch (error) {
        console.error("Lỗi:", error);
      }
    } else {
      // if (group_id) {
      const response = await fetch(`http://${API_BASE_URL}:8000/api/manage/${group_id}/${id_card}`, {
        method: 'DELETE',
      });
      const responseData = await response.json();

      console.log('delete', responseData);
      setIsSaved(prevIsSaved => {
        // Sử dụng hàm callback để đảm bảo cập nhật đồng bộ và kích hoạt useEffect
        return !prevIsSaved;
      });
      // }
    }

    // Lấy danh sách nhóm mới đã thêm
    const response = await fetch(`http://${API_BASE_URL}:8000/api/manage/group/${id_card}`);
    const responseData = await response.json();
    setSelectedItems(responseData.data);
    console.log("new member of: ", responseData.data);
    // setGroupId(group_id);
  };

  const setImg = (e) => {
    // console.log(data.img_url)
    let placeHolderImg = "";
    let imgPath = `http://${API_BASE_URL}:8000${e.img_url}`;
    // console.log(imgPath)
    if (e.user_name) {
      const nameSplit = e.user_name.split(" ");
      placeHolderImg = `https://ui-avatars.com/api/?name=${nameSplit[0]}+${nameSplit[1]}`;
    }
    return imgPath === `http://${API_BASE_URL}:8000null` ? placeHolderImg : imgPath;

  }

  const goToPage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    // Thông báo cho component rằng đã có sự thay đổi trong searchTerm
    onSearchChange(searchTerm);
  }, [searchTerm, onSearchChange, selectedItems]);

  return (
    <div>
      <div className='border-box relative w-full h-screen p-2.5 flex flex-col'>

        {data.map((e, index) => (
          <div className='show-menu relative flex items-center w-full h-16 pl-1.5 bg-gray-100 my-1 border rounded-lg border-gray-300 transition duration-200 cursor-pointer hover:bg-gray-200 hover:border-gray-200 hover:border hover:rounded-lg'>
            {/* {setIsSaved(e.like)} */}
            {/* item-container */}
            <Link key={e.contact_id} to={`/InformationPage/${id_card}/${e.contact_id}`} className='relative flex items-center w-3/5 p-1 bg-gray-300 border border-gray-300 rounded-lg h-4/5'>
              {/* item-border */}
              {/* image-container */}
              <div className='flex items-center justify-center mr-1 rounded-full w-7 h-7'>
                <img
                  className='object-cover w-full h-full border border-gray-400 border-solid rounded-full'
                  src={setImg(e)}
                  alt=''
                />
              </div>
              <div className='w-9/12 max-w-full overflow-hidden'>
                <div className='text-xs'><b>{e.user_name}</b></div>
                <div className='text-xs text-gray-500'>{e.email}</div>
              </div>

              {/* chinh sua nhom va so thich */}
              <div className='absolute right-1'>
                {/* <div onClick={(event) =>handleMenuClick(event, id_card, e.id_card)} className='text-left'> */}
                <img
                  onClick={(event) => handleMenuClick(event, index)}
                  className='w-3 pb-2'
                  src='https://cdn-icons-png.flaticon.com/128/2311/2311524.png'
                  alt=''
                />

                {/* set ảnh được đánh dấu sao va không được đánh dấu sao */}
                <div className={index} onClick={(event) => handleStarClick(event, id_card, e.contact_id)}>
                  {e.like ? (
                    <img
                      className='w-3'
                      src='https://cdn-icons-png.flaticon.com/128/2377/2377810.png'
                      alt='save'
                    />
                  ) : (
                    <img
                      className='w-3'
                      src='https://cdn-icons-png.flaticon.com/128/2377/2377878.png'
                      alt='nosave'
                    />
                  )}
                </div>
              </div>
            </Link>

            <div className='absolute right-1/2 sm:right-[41%] sm:top-[40%]'>
              {menuVisibleList[index] && (
                <div className='absolute z-10 inline-flex flex-col w-40 h-auto px-1 text-xs bg-gray-100 border border-gray-300 rounded-md left-5 justify-evenly top-1 drop-shadow-md'>
                  <div className='absolute flex items-center justify-center w-3 h-3 text-xs rounded-full hover:border-gray-300 hover:border right-1 top-1' onClick={(event) => handleCloseMenuClick(event, index, selectedItems)}>x</div>
                  <br />

                  <div className='inline-flex items-center justify-between px-1 py-2 mt-1 text-left transition duration-200 ease-in-out hover:bg-gray-200 hover:border hover:border-gray-300 hover:rounded-md' onClick={(event) => handleAddToGroupClick(event, index, e.contact_id)}>
                    <p>グループに追加する</p>
                    <img src='https://cdn-icons-png.flaticon.com/64/446/446136.png' className='w-3' />
                  </div>
                  <div className='inline-flex items-center justify-between px-1 py-2 text-left transition duration-200 ease-in-out hover:bg-gray-200 hover:border hover:border-gray-300 hover:rounded-md' onClick={(event) => handleDeleteFollowerClick(event, index, e.id_card, e.contact_id)}>
                    <p>削除</p>
                    <img src='https://cdn-icons-png.flaticon.com/64/484/484662.png' className='w-3' />
                  </div>
                </div>
              )}

              {isNewGroupVisible[index] && (

                <ul className='absolute z-10 inline-flex flex-col w-40 h-auto px-2 py-1 text-xs bg-gray-100 border border-gray-300 rounded-md left-5 justify-evenly top-16 drop-shadow-md'>
                  <br />
                  {group.map((event, i) => (
                    <li className='inline-flex items-center justify-between px-1 py-2 text-left transition duration-200 ease-in-out hover:bg-gray-200 hover:border hover:border-gray-300 hover:rounded-md'
                      // onChange={(evt) => checkIdCard(evt, index, event.group_id, e.contact_id)}
                      key={i}
                    >
                      <input type='checkbox' className='w-3 mr-3'
                        // checked={selectedItems[index].group_id == event.group_id && selectedItems[index].id_card == e.contact_id}
                        // checked={event.group_id === selectedItems[i]}
                        // {for(let n = 0; selectedItems.length; n++) {
                        //   if(event.group_id == selectedItems[n]) {
                        //     checked=true
                        //   } else if(n = selectedItems.length - 1 ) {
                        //     checked=false
                        //   }
                        // }}
                        checked={selectedItems.includes(event.group_id)}
                        onChange={(ev) => handleCheckboxChange(ev, event.group_id, e.contact_id)} />
                      <h4 className='max-w-full overflow-hidden'>{event.group_name}</h4>
                    </li>
                  ))}
                  <li className='inline-flex items-center justify-between px-1 py-2 text-left transition duration-200 ease-in-out hover:bg-gray-200 hover:border hover:border-gray-300 hover:rounded-md' onClick={(event) => handlePlusGroup(event, index)}>
                    <img src='https://cdn-icons-png.flaticon.com/64/446/446136.png' className='w-3' />
                    <h4>新規グループを作成</h4>
                  </li>
                  <form onSubmit={(e) => handleCreateGroup(e, index)}>
                    {showInput[index] && (
                      <li className='inline-flex items-center justify-between px-1 py-2 text-left transition duration-200 ease-in-out border-b border-solid hover:bg-gray-200 hover:border hover:border-gray-300 hover:rounded-md border-b-gray-300'>
                        <input className='w-full h-full bg-transparent outline-none'
                          placeholder='グループの名前'
                          type='text'
                          id='group_name'
                          value={group_name}
                          onChange={(e) => setGroupName(e.target.value)}
                          required />
                      </li>
                    )}
                    <br />
                    {showButtom[index] && (
                      <button className='w-full mb-1 text-right cursor-pointer hover:text-[#36735B] hover:font-bold' id='btt' type='submit'>編集</button>
                    )}
                  </form>
                </ul>

              )}
            </div>

            {/* set thoi gian */}
            <div className='absolute bottom-0 text-xs text-gray-400 right-1'>{e.contact_created_at}</div>
          </div>
        ))}
      </div>

      <div className='fixed bottom-0 flex items-center justify-center left-0 w-full h-auto p-0.5 bg-gray-300 rounded-md'>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className='hover:text-[#36735B] hover:cursor-pointer'>
          前のページ
        </button>
        <span className='mx-4'>{currentPage}/{totalPages}</span>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className='hover:text-[#36735B] hover:cursor-pointer'>
          次のページ
        </button>
      </div>


    </div>


  );
};

export default Following;