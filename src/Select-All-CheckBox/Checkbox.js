import React from 'react'
import { data } from './data.js'
import { useState } from 'react'
//<input type='checkbox' checked='false'/>  ---checkbox checked
//<input type='checkbox' checked={false} /> ---checkbox uncheched
export default function Checkbox() {
    let ans = [];
    for (let i = 0; i < data.length; i++) {
        ans.push({ ...data[i] });
    }

    const [checkboxData, setCheckBoxData] = useState([...ans])

    const handleClick = (id, checkedValue) => {
        console.log('checkedValue', checkedValue)
        let data = [];
        for (let i = 0; i < checkboxData.length; i++) {
            data[i] = checkboxData[i]
            if (id == i) {
                data[i] = {
                    ...checkboxData[i],
                    checked: checkedValue
                }
            }
        }
        setCheckBoxData(data)
    }

    const handleCheckAll = (checkedValue) => {
        let updateData = checkboxData.map((data) => {
            console.log(checkedValue)
            return { ...data, checked: checkedValue }
        })
        setCheckBoxData(updateData)

    }

    return (
        <div>
            <input type='checkbox' id='09' checked={checkboxData.filter((item) => { return (item.checked !== true) }).length < 1 ? true : false}
                onClick={(e) => handleCheckAll(e.target.checked)} />
            <label for='09'>Select All Checkbox</label>
            {checkboxData.map((item) => {
                return <>
                    <div key={item.id}>
                        <input type='checkbox' id={item.id}
                            checked={item.checked} value={item.name} onClick={(e, checked) => { handleClick(e.target.id, e.target.checked) }} />
                        <label for={item.id}>{item.name}</label>
                    </div>
                </>
            })}
        </div>
    )
}
