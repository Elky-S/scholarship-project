import { useDispatch, useSelector } from "react-redux"

import { selectAlleUsers } from "./redux/Users"

export const Users=()=>{
const list=useSelector(selectAlleUsers)
return<>
    <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <h3>Users List:</h3>
      <ul>
        {list.map(u => (
          <li key={u}>
            {u.password}<br></br> {u.userPhone} 
          </li>
        ))}
      </ul>
    </div>
    
</>
}
