
    /**
     * Used to get Distict User List
     * @returns 
     */
    export const getUniqueRecord=(attadanceList)=>{
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