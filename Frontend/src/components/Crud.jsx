// frontend/src/components/Crud.jsx;
import React, { useState } from "react";
import '../styles/Crud.css';

import { IoPersonCircle } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { FaChevronDown } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

import { PostHook } from "../hooks/PostHook";
import { GetHook } from "../hooks/GetHook";
import { DeleteHook } from "../hooks/DeleteHook";
import { PatchHook } from "../hooks/PatchHook";
import { Collapse } from 'react-collapse';

export const Crud = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [gender, setGender] = useState("");
    const [userType, setUserType] = useState("");
    const [isOpen, setIsOpen] = useState({});

    const { data, loading, error, refetch } = GetHook();

    const HandleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => { setImagePreview(reader.result); };
            reader.readAsDataURL(file);
        }
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);

        if (selectedUserId) {
            await PatchHook(selectedUserId, formData);
            setSelectedUserId(null); setEditingUser(null);
        } else {
            await PostHook(formData);
        }

        refetch(); form.reset(); setImagePreview(null); setGender(""); setUserType("");
    };

    const HandleDelete = async (id) => {
        await DeleteHook(id); refetch();
    }

    const HandleEdit = (user) => {
        setSelectedUserId(user._id); setEditingUser(user); setGender(user.usergender); setUserType(user.usertype); setImagePreview(user.userimage ? `data:image/jpeg;base64,${user.userimage}` : null);
    }

    const toggleCollapse = (userId) => {
        setIsOpen(prevState => ({ ...prevState, [userId]: !prevState[userId] }));
    }

    return (
        <>
            <div className="H1_DIV_HD"><h1 className="H1_DIV_HD_H1">Full Stack CRUD</h1></div>
            <div className="CRUD_FRM_DIV">
                <form onSubmit={HandleSubmit} className="CRUD_FRM_DIV_FORM">
                    <div className="FRM_DIV_FORM_IMG">
                        {
                            imagePreview ? (
                                <img src={imagePreview} alt="Preview" style={{ width: 50, height: 50, borderRadius: "50%" }} />
                            ) : (
                                <IoPersonCircle size={55} color="white" />
                            )
                        }
                        <label className="FRM_IMG_LBL" htmlFor="userimage"><GrGallery size={20} color="rgb(170,170,170)" /></label>
                    </div>
                    <input type="file" id="userimage" name="userimage" onChange={HandleImageChange} accept="image/*" style={{display:"none"}} />

                    <label className="FRM_LBL" htmlFor="username">User Name</label>
                    <input className="FRM_IP" required type="text" placeholder="UserName" id="username" name="username" defaultValue={editingUser ? editingUser.username : ""} />

                    <label className="FRM_LBL" htmlFor="usermail">User Email</label>
                    <input className="FRM_IP" required type="email" placeholder="username@mail.com" id="usermail" name="usermail" defaultValue={editingUser ? editingUser.usermail : ""} />

                    <label className="FRM_LBL" htmlFor="userphone">User Phone</label>
                    <input className="FRM_IP" required type="text" placeholder="0000-000-00" id="userphone" name="userphone" defaultValue={editingUser ? editingUser.userphone : ""} />

                    <label className="FRM_LBL" htmlFor="userdate">User Birth Date</label>
                    <input className="FRM_IP FRM_DATE" required type="date" id="userdate" name="userdate" defaultValue={editingUser ? editingUser.userdate : ""} />

                    <label className="FRM_LBL" htmlFor="usergender">Gender</label>
                    <div>
                        <label><input type="radio" id="usergender_male" name="usergender" value="Male" checked={gender === "Male"} onChange={() => setGender("Male")} />Male</label>
                        <label><input type="radio" id="usergender_female" name="usergender" value="Female" checked={gender === "Female"} onChange={() => setGender("Female")} />Female</label>
                    </div>

                    <label className="FRM_LBL" htmlFor="usertype">User Type</label>
                    <div>
                        <label><input type="radio" id="usertype_admin" name="usertype" value="Admin" checked={userType === "Admin"} onChange={() => setUserType("Admin")} />Admin</label>
                        <label><input type="radio" id="usertype_user" name="usertype" value="User" checked={userType === "User"} onChange={() => setUserType("User")} />User</label>
                        <label><input type="radio" id="usertype_both" name="usertype" value="Both" checked={userType === "Both"} onChange={() => setUserType("Both")} />Both</label>
                    </div>

                    <label className="FRM_LBL" htmlFor="userdetail">User Details</label>
                    <textarea className="FRM_TXT_IP" required placeholder="User Details..." rows={10} cols={50} draggable="false" id="userdetail" name="userdetail" defaultValue={editingUser ? editingUser.userdetail : ""} />

                    <input className="FRM_BTN" type="submit" value={selectedUserId ? "Update" : "Submit"} />
                </form>
            </div>
            <div className="DIV_LIST_DATA_D">
                {
                    loading ? <p>Data Loading...</p> : error ? <p>Fetch Data Error: {error}</p> : (
                        data.map(user => (
                            <div key={user._id} className="DIV_LIST_DATA_D_LST">
                                <div className="DIV_LIST_DATA_D_LST_NMB">
                                    <p className="DIV_LIST_DATA_D_LST_N">{user.username}</p>
                                    <button className="DIV_LIST_DATA_D_LST_BTN" onClick={() => toggleCollapse(user._id)}><FaChevronDown size={30} color="rgb(6, 6, 58)" /></button>
                                </div>
                                
                                <Collapse isOpened={isOpen[user._id]}>
                                    <div className="USER_INFO">
                                        <div className="USER_INFO1">
                                            <p className="USER_INFO1_P"><strong>Name:</strong> {user.username}</p>
                                            <p className="USER_INFO1_P"><strong>Email:</strong> {user.usermail}</p>
                                            <p className="USER_INFO1_P"><strong>Phone:</strong> {user.userphone}</p>
                                            <p className="USER_INFO1_P"><strong>Birth Date:</strong> {user.userdate}</p>
                                            <p className="USER_INFO1_P"><strong>Gender:</strong> {user.usergender}</p>
                                            <p className="USER_INFO1_P"><strong>User Type:</strong> {user.usertype}</p>
                                            <p className="USER_INFO1_P"><strong>Details:</strong> {user.userdetail}</p>
                                        </div>
                                        <div className="USER_INFO2">
                                            <img src={user.userimage ? `data:image/jpeg;base64,${user.userimage}` : 'fallback_image_url'} alt={user.username} width="200px" height="200px" />
                                        </div>
                                        <div className="USER_INFO3">
                                            <button className="USER_BTN" onClick={() => HandleDelete(user._id)}><MdDelete size={20} color="white" /></button>
                                            <button className="USER_BTN" onClick={() => HandleEdit(user)}><MdEdit size={20} color="white" /></button>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        ))
                    )
                }
            </div>
        </>
    );
}
