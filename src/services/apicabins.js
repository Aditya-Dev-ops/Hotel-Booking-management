 import supabase, {supabaseUrl} from "./supabase";
 export async function getCabins() {
 let { data , error } = await supabase
    .from('cabins')
    .select('*')
    
 if(error) {
    console.error(error);
    throw new Error("cabins Could not be loaded");
 }
  return data;
 } 
 export async function DeleteCabin(id){
 const { data , error} = await supabase
 .from('cabins')
 .delete()
 .eq('id', id)
    
 if(error) {
    console.error(error);
    throw new Error("cabins Could not be Deleted");
 }
 return data;
 } 

export async function AddEditCabins(newCabin , id){
console.log(newCabin , id); 
console.log(typeof newCabin.image);
const hasImagePath = typeof newCabin.image === 'string' ? true : false;
console.log(hasImagePath);
const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/" ,"");
const imagepath =  hasImagePath?newCabin.image:`${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;
console.log(imageName , imagepath);
console.log(newCabin , id); 
//1. Create/Edit  Cabin  
  let query = supabase.from('cabins');
  if(!id) query = query.insert([{...newCabin,image:imagepath}])
  if (id) query = query.update({...newCabin , image:imagepath}).eq('id',id);
  
  const {data , error} = await query.select().single();
      if(error) {
        console.error(error);
        throw new Error("cabins Could not be Created");
        } 
// 2. Upload Image
 const {error:storageError} = await supabase
  .storage
  .from('cabins-images')
  .upload(imageName, newCabin.image,);
 
//3. Delete the cabin if there was an error uploding images  
  if(storageError){
 await supabase.from("cabins").delete().eq("id",data.id);
 console.error(storageError);
 throw new Error("cabins Could not be Created because of file not uploaded");
  }
return data;
}
 