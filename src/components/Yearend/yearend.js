export const inputFormElements = [
        {
            name: "CompanyId",
            label: "Company Id",
            variant: "outlined",
            fullWidth: true,
            required: true,
            xs: 12,
            sm: 6,
            select:true,
            options: [
                {value:"1", label:"company 1"}, 
                {value:"2", label:"company 2"}, 
            ]

        },
    {
        name: "BranchId",
        label: "Branch Id", 
        variant: "outlined", 
        fullWidth: true,
        required: true,
        xs:12, 
        sm:6,
        select:true,
        options: [
            {value:"1", label:"Branch 1"}, 
            {value:"2", label:"Branch 2"}, 
        ]
    },
    
    {
        name: "StartDate",
        variant: "outlined", 
        fullWidth: true, 
        required: true, 
        label:"Start Date",
        xs:12, 
        sm:12,
        type:"date",
        InputProps: {
            shrink: true

        },
        
        
    },
    {
        name: "EndDate",
        variant: "outlined", 
        fullWidth: true, 
        required: true, 
        label: "Enddate",
        xs:12, 
        sm:12,

        type:"date",
        inputprops: {
            shrink: true
        }
    },
    {
        name: "process",
        variant: "outlined", 
        fullWidth: true, 
        label: "processDate",
        required: true, 
        xs:12, 
        sm:12,
        type:"date",
        inputprops: {
            shrink: true
        }
    }


]


