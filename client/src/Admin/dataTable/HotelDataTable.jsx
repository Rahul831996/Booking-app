import React, { Fragment,useState, useEffect } from 'react';
import "./HotelDataTable.css";
import { DataGrid } from '@mui/x-data-grid';
import { hotelColumns } from "../../datatablesource" 
import { Link } from "react-router-dom";
import useFetch from '../../Hooks/useFetch';
import axios from 'axios';


const HotelDataTable = () => {


    const [list, setList] = useState()

    const { data } = useFetch(`/api/v1/all/hotels`)
    console.log(data)

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/v1/admin/${id}`);

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
                    Add New  Hotels
                    <Link to="/admin/newHotel" className="link">
                        Add New
                    </Link>
                </div>
                <DataGrid
                    className="datagrid"
                    rows={data}
                    columns={hotelColumns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                    getRowId={rows => rows._id}
                />
            </div>
    </Fragment>
  )
}

export default HotelDataTable;