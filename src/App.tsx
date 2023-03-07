import { useEffect, useState } from "react";
import CustomPaginationActionsTable from "./CustomPaginationActionsTable";
import {fetchPosts,deletePostById} from "./services/placeHolderService";


function App() {
 const [rows, setrows] = useState([])
  useEffect(() => {
    
    fetchPosts()
    .then((data)=>setrows(data))

  }, [])
  
  const deleteById = (id:number)=>{
    deletePostById(id)
    .then(()=>{
      const filtered = rows.filter((el:any)=>el.id !=id)
      setrows(filtered)
    })
  }

  return (
    <div className="App">
      <CustomPaginationActionsTable rows={rows} deleteById={deleteById}/>
    </div>
  );
}

export default App;
