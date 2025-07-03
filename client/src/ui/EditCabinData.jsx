
export function EditCabin() {
    const {mutate:EditCabin} = useMutation({
        mutationFn: ({newData, id})=>AddEditCabins(newData,id),
        onSuccess: ()=>{   
        toast.success("cabin successfully Edited"); 
        setShowform(false);
        queryclient.invalidateQueries({queryKey:["cabins"]});
        },    
        onError:(error)=> toast.error(error.message),
        });   
        
}
