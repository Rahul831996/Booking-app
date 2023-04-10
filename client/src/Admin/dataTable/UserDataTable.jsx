import React, { Fragment, useState, useEffect } from 'react';
import "./UserDataTable.css";
import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from "../../datatablesource" 
import { Link } from "react-router-dom";
import useFetch from '../../Hooks/useFetch';
import axios from 'axios';


const UserDataTable = () => {

    const [list, setList] = useState()

    const { data } = useFetch(`/api/v1/admin/users`)

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/v1/admin/user/${id}`);

            setList(list.filter((item) => item._id !== id));
            

        } catch (err) {}
        
    };


    useEffect(() => {
        setList(data);
    }, [data]);


    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/users/test" style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row._id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];





    return (
        <Fragment>
            <div className="datatable">
                <div className="datatableTitle">
                     All Usres
                     
                </div>
                <DataGrid
                    className="datagrid"
                    rows={data.users ?? []}
                    columns={userColumns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                    getRowId={rows => rows._id}
                />
            </div>
        </Fragment>
    )
}

export default UserDataTable;