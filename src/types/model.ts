//******************App.tsx Types************************************/
export interface Row {
  userId:number;
  id: number;
  title: string;
  body: string;
  date?: string
  
}

export interface UpdatedObject {
  title:string
  body:string
  userId?:number
  id?: number
}


//******************Add_New_Post.tsx Types************************************/
export interface AddNewPostProps {
  addnewpost: (newPostData: UpdatedObject) => Promise<void>;
}






//******************Custom_Pagination.tsx Types************************************/
export interface Column {
  id: "name" | "code" | "actions"| "update";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}








//******************Table_Pagination.tsx Types************************************/
export interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}









