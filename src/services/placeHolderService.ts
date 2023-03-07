import axios from "axios"
const URL:string =process.env.REACT_APP_BASE_URL as string
export const fetchPosts = async ()=>{
    let res = await axios.get(URL)
    return res.data
}

export const deletePostById = async(id:number)=>{
    let res = await axios.delete(`${URL}/${id}`)
    console.log(res)
}






