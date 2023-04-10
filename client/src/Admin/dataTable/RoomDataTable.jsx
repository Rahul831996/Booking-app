import React, { Fragment,useState, useEffect } from 'react';
import "./RoomDataTable.css"
import { DataGrid } from '@mui/x-data-grid';
import { roomColumns } from "../../datatablesource" 
import { Link } from "react-router-dom";
import useFetch from '../../Hooks/useFetch';
import axios from 'axios';


const RoomDataTable = () => {


    const [list, setList] = useState()

    const { data } = useFetch(`/api/v1/all/rooms`)

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/v1/${id}/${id}`);

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
                        <Link to="/admin/newRoom" style={{ textDecoration: "none" }}>
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
                    Add New  Room
                    <Link to="/admin/newRoom" className="link">
                        Add New
                    </Link>
                </div>
                <DataGrid
                    className="datagrid"
                    rows={data.rooms ?? []}
                    columns={roomColumns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                    getRowId={rows => rows._id}
                />
            </div>
    </Fragment>
  )
}

export default RoomDataTable