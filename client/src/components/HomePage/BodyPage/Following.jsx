import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../../apiConfig';
import axios from "axios";

const Following = ({ searchTerm, onSearchChange }) => {
  const http = axios.create({
    baseURL: `${API_BASE_URL}`,
    headers: {
      "X-Requested-with": "XMLHttpRequest",
    },
    withCredentials: true,
  });

  const userData = JSON.parse(localStorage.getItem('currentUser'));
  const id_card = userData.data.id_card;

  const [data, setData] = useState([]);
  const [group, setGroup] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [menuVisibleList, setMenuVisibleList] = useState(Array(data.length).fill(false));
  const [isNewGroupVisible, setNewGroupVisible] = useState(Array(data.length).fill(false));
  const [showInput, setShowInput] = useState(Array(data.length).fill(false));
  const [showButton, setShowButton] = useState(Array(data.length).fill(false));
  const [openedMenuIndex, setOpenedMenuIndex] = useState(null);
  const [group_name, setGroupName] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const handlePlusGroup = (e, index) => {
    const showInputList = [...showInput];
    showInputList[index] = !showInputList[index];
    setShowInput(showInputList);

    const showButtonList = [...showButton];
    showButtonList[index] = !showButtonList[index];
    setShowButton(showButtonList);
  };

  const handleMenuClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();

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

    setMenuVisibleList((prevMenuList) => {
      const updatedMenuList = [...prevMenuList];
      updatedMenuList[index] = !updatedMenuList[index];
      return updatedMenuList;
    });
    setOpenedMenuIndex(index);
  };

  const handleCloseMenuClick = (e, index, selectedItems) => {
    const updatedMenuVisibleList = [...menuVisibleList];
    updatedMenuVisibleList[index] = false;
    setMenuVisibleList(updatedMenuVisibleList);

    const updatedisNewGroupVisible = [...isNewGroupVisible];
    updatedisNewGroupVisible[index] = false;
    setNewGroupVisible(updatedisNewGroupVisible);

    setOpenedMenuIndex(null);
    setSelectedItems(selectedItems);
  };

  const handleAddToGroupClick = async (e, index, id) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedisNewGroupVisible = [...isNewGroupVisible];
    updatedisNewGroupVisible[index] = !updatedisNewGroupVisible[index];
    setNewGroupVisible(updatedisNewGroupVisible);

    const response = await fetch(`${API_BASE_URL}/api/manage/group/${id}`);
    const responseData = await response.json();
    setSelectedItems(responseData.data);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".show-menu")) {
      setMenuVisibleList(Array(data.length).fill(false));
      setNewGroupVisible(Array(data.length).fill(false));
      setShowInput(Array(data.length).fill(false));
      setShowButton(Array(data.length).fill(false));
      setSelectedItems([]);
    }
  };

  const handleDeleteFollowerClick = async (e, index, id_card, contact_id) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/${id_card}/${contact_id}`, {
        method: 'DELETE',
      });
      const responseData = await response.json();
      console.log('delete', responseData);

      setIsSaved(prevIsSaved => !prevIsSaved);
      handleCloseMenuClick(e, index);
    } catch (error) {
      console.error('delete', error);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    let apiUrl = `${API_BASE_URL}/api/contact/following/${id_card}/${currentPage}`;
    if (searchTerm) {
      apiUrl = `${API_BASE_URL}/api/contact/${id_card}/${currentPage}/${searchTerm}`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData.data);
        setTotalPages(apiData.totalPages);
        console.log('follower: ', apiData);
      })
      .catch((error) => {
        console.error("Error fetching followers:", error);
      });
  }, [currentPage, id_card, isSaved, searchTerm]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/groups/${id_card}`)
      .then((response) => response.json())
      .then((apiData) => {
        setGroup(apiData.data);
        console.log('groups: ', apiData.data);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
  }, []);

  const handleStarClick = (event, id_card, contact_id) => {
    event.preventDefault();

    fetch(`${API_BASE_URL}/api/contact/like/${id_card}/${contact_id}`, {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('like', responseData.data);
        setIsSaved(responseData.data.like);
      })
      .catch((error) => {
        console.error('Error liking contact:', error);
      });
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("group_name", group_name);
      formData.append("id_card", id_card);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      await http.post(`${API_BASE_URL}/api/group`, formData);

      const response = await fetch(`${API_BASE_URL}/api/groups/${id_card}`);
      const responseData = await response.json();
      setGroup(responseData.data);

      console.log("Added Group Successfully");
      setGroupName('');
      setIsSaved(prevIsSaved => !prevIsSaved);
    } catch (error) {
      console.error("Error adding group:", error);
    }
  };

  const handleCheckboxChange = async (event, group_id, id_card) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      try {
        const checkExistenceResponse = await http.get(`${API_BASE_URL}/api/manage/${group_id}/${id_card}`);
        if (checkExistenceResponse.data.length !== 0) {
          console.log("User already exists in the group. No action needed.");
        } else {
          const formData = new FormData();
          formData.append("group_id", group_id);
          formData.append("id_card", id_card);

          await http.post(`${API_BASE_URL}/api/manage`, formData);
          console.log("Added User to Group Successfully");
        }
      } catch (error) {
        console.error("Error adding user to group:", error);
      }
    } else {
      const response = await fetch(`${API_BASE_URL}/api/manage/${group_id}/${id_card}`, {
        method: 'DELETE',
      });
      const responseData = await response.json();
      console.log('delete', responseData);
      setIsSaved(prevIsSaved => !prevIsSaved);
    }

    const response = await fetch(`${API_BASE_URL}/api/manage/group/${id_card}`);
    const responseData = await response.json();
    setSelectedItems(responseData.data);
    console.log("new member of: ", responseData.data);
  };

  const setImg = (e) => {
    let placeHolderImg = "";
    let imgPath = `${API_BASE_URL}${e.img_url}`;
    if (e.user_name) {
      const nameSplit = e.user_name.split(" ");
      placeHolderImg = nameSplit[0].charAt(0).toUpperCase() + nameSplit[1].charAt(0).toUpperCase();
    } else {
      const nameSplit = e.name.split(" ");
      placeHolderImg = nameSplit[0].charAt(0).toUpperCase() + nameSplit[1].charAt(0).toUpperCase();
    }

    return e.img_url ? (
      <img className="rounded-circle avatar-xs" src={imgPath} alt="user-pic" />
    ) : (
      <div className="avatar-xs">
        <span className="avatar-title rounded-circle">{placeHolderImg}</span>
      </div>
    );
  };

  const renderFollowers = (follower) => {
    const followPage = data.map((e, index) => {
      const followButton = (
        <div className="flex-shrink-0">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <Link to="#" className="text-body d-block">
                {setImg(e)}
              </Link>
            </div>
            <div className="flex-grow-1 ms-2 overflow-hidden">
              <h5 className="fs-13 mb-1">
                <Link to="#" className="text-body d-block">{e.user_name}</Link>
              </h5>
              <p className="text-muted text-truncate mb-0">{e.contact_id}</p>
            </div>
          </div>
        </div>
      );

      return (
        <div className="col" key={e.contact_id}>
          <div className="card team-box">
            <div className="team-cover">
              <img src={`${API_BASE_URL}${e.cover_img_url}`} alt="" className="img-fluid" />
            </div>
            <div className="card-body p-4">
              <div className="row align-items-center team-row">
                <div className="col-6">
                  {followButton}
                </div>
                <div className="col-6">
                  <ul className="list-inline list-group-flush ms-auto mb-0">
                    <li className="list-inline-item">
                      <button
                        type="button"
                        className={`btn avatar-xs p-0 favourite-btn ${e.like ? "active" : ""}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Favourite"
                        onClick={(event) => handleStarClick(event, id_card, e.contact_id)}
                      >
                        <span className="avatar-title bg-transparent fs-15">
                          <i className="ri-star-fill"></i>
                        </span>
                      </button>
                    </li>
                    <li className="list-inline-item">
                      <div className="dropdown">
                        <button
                          className="btn btn-soft-danger btn-sm dropdown"
                          data-bs-toggle="dropdown"
                          aria-expanded={menuVisibleList[index]}
                          onClick={(e) => handleMenuClick(e, index)}
                        >
                          <i className="ri-more-fill align-bottom"></i>
                        </button>
                        <ul
                          className={`dropdown-menu dropdown-menu-end ${menuVisibleList[index] ? "show" : ""}`}
                        >
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item"
                              onClick={(e) => handleDeleteFollowerClick(e, index, id_card, e.contact_id)}
                            >
                              <i className="ri-delete-bin-6-line me-2 align-middle"></i>Delete
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item"
                              onClick={(e) => handleAddToGroupClick(e, index, id_card)}
                            >
                              <i className="ri-user-add-line me-2 align-middle"></i>Add to Groups
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item"
                              onClick={(e) => handlePlusGroup(e, index)}
                            >
                              <i className="ri-group-line me-2 align-middle"></i>New Group
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={`row ${isNewGroupVisible[index] ? "show-menu" : ""}`}>
              <div className="mb-3">
                {selectedItems && (
                  <div className={`row show-menu mb-3 ${isNewGroupVisible[index] ? "show-menu" : ""}`}>
                    <label className="form-label">Group</label>
                    {selectedItems.map((g, groupIndex) => (
                      <div className="form-check form-check-primary mb-3" key={groupIndex}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={g.id}
                          checked={selectedItems.some((item) => item.group_id === g.id)}
                          onChange={(e) => handleCheckboxChange(e, g.id, e.contact_id)}
                        />
                        <label className="form-check-label" htmlFor={g.id}>
                          {g.group_name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
                <div className={`col-lg-12 show-menu ${showInput[index] ? "show-menu" : ""}`}>
                  <label htmlFor="group_name" className="form-label">New Group</label>
                  <input
                    type="text"
                    className="form-control"
                    id="group_name"
                    placeholder="Enter new group"
                    value={group_name}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                  <button
                    type="submit"
                    className={`btn btn-success w-100 show-menu ${showButton[index] ? "show-menu" : ""}`}
                    onClick={handleCreateGroup}
                  >
                    <i className="las la-plus-circle"></i> Add to Group
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return followPage;
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="row g-2">
            <div className="col-lg-3">
              <div className="search-box">
                <input
                  type="text"
                  className="form-control search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={onSearchChange}
                />
                <i className="ri-search-line search-icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div id="table-followers-list-all" className="table-card gridjs-border-none">
            <div className="row">{renderFollowers(data)}</div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-secondary me-2"
              onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              className="btn btn-secondary ms-2"
              onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Following;
