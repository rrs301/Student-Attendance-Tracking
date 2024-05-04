import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import moment from 'moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

function AttendanceGrid({attadanceList,selectedMonth}) {

    const [rowData,setRowData]=useState();
    const [colDefs,setColDefs]=useState()

    const daysInMonth=(year,month)=>new Date(year,month+1,0).getDate();
    const numberOfDays=daysInMonth(moment(selectedMonth).format('yyyy'),moment(selectedMonth).format('MM'))
    let daysArrays=Array.from({length:numberOfDays},(_,i)=>i+1)
    
    useEffect(()=>{
        
        setColDefs([
            { field:'studentId',filter:true},
            {field:'name',filter:true},
        ]);
        if(attadanceList)
        {
            
            const userList=getUniqueRecord();
            setRowData(userList);

            daysArrays.forEach((date)=>{
                setColDefs(prevData=>[...prevData,{
                    field:date.toString(),width:50,editable:true
                }])

                userList.forEach(obj=>{
                    obj[date]=isPresent(obj.studentId,date)
                })
            })
    }
    },[attadanceList])

    /**
     * used to check if user present or not
     * @param {*} studentId 
     * @param {*} day 
     * @returns 
     */
    const isPresent=(studentId,day)=>{
        const result=attadanceList.find(item=>item.day==day&&item.studentId==studentId)
        return result?true:false
    }

    /**
     * Used to get Distict User List
     * @returns 
     */
    const getUniqueRecord=()=>{
        const uniqueRecord=[];
        const existingUser=new Set();

        attadanceList?.forEach(record => {
                if(!existingUser.has(record.studentId)){
                    existingUser.add(record.studentId);
                    uniqueRecord.push(record);
                }
        });

        return uniqueRecord;
    }


    /**
     * Used to marke student attendace
     * @param {*} day 
     * @param {*} studentId 
     * @param {*} presentStatus 
     */
    const onMarkAttendace=(day,studentId,presentStatus)=>{

        const date=moment(selectedMonth).format('MM/yyyy')
        if(presentStatus)
        {
            const data={
                day:day,
                studentId:studentId,
                present:presentStatus,
                date:date
            }
          
            GlobalApi.MarkAttendance(data).then(resp=>{
                console.log(resp);
                toast("Student Id:" +studentId +" Marked as present")
            })
        }
        else{
            GlobalApi.MarkAbsent(studentId,day,date)
            .then(resp=>{
                toast("Student Id:" +studentId +" Marked as absent")
            })
        }

    }

    
    return (
    <div>
         <div
            className="ag-theme-quartz" // applying the grid theme
            style={{ height: 500 }} // the grid will fill the size of the parent container
            >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                onCellValueChanged={(e)=>onMarkAttendace(e.colDef.field,e.data.studentId,e.newValue)}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
           />
            </div>
    </div>
  )
}

export default AttendanceGrid