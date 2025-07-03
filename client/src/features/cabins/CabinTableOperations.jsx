import TableOprations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
function CabinTableOperations() {
   
    return ( 
        <TableOprations>
         <Filter 
         FilterField={'discount'} 
         options={[
            {value: "all" , label:"All"},
            {value: "no-discount" ,label:"No Discount"},
            {value: "with-discount" ,label:"With Discount"}
         ]}/>
        <SortBy options={[
         {value:"name-asc", label:'Sort by name (A-z)'},
         {value:"name-desc", label:'Sort by name (Z-A)'},
         {value:"regularPrice-asc", label:'Sort by Price(low first)'},
         {value:"regularPrice-desc", label:'Sort by Price(high first)'},
         {value:"maxCapacity-asc" , label:"Sort by  Capacity (low first)"},
         {value:"maxCapacity-desc" , label:"Sort by  Capacity (high first)"},
         {value:"discount-asc" , label:"Sort by  Discount (low first)"},
         {value:"discount-desc" , label:"Sort by  Discount (high first)"},
        ]}/>
        </TableOprations>
     );
}

export default CabinTableOperations;