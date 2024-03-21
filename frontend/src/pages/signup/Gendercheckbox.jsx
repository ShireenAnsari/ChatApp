import React from 'react'

const Gendercheckbox = ({ onCheckBoxchange,selectGender}) => {
  return (
    <div className='flex gap-5 text-white justify-center'>
      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer ${selectGender==='male'?'selected' :''}`}>
          <span>Male</span>
          <input type='checkbox'
           checked={selectGender==="male"}
           onChange={()=>onCheckBoxchange('male')} 
          className='checkbox border-slate-900 '/>
        </label>

      </div>
      <div className='form-control'>
      <label className={`label gap-2 cursor-pointer ${selectGender==='female'?'selected' :''}`}>
          <span>Female</span>
          <input type='checkbox'
          checked={selectGender==="female"}
          onChange={()=>onCheckBoxchange('female')}
           className='checkbox border-slate-900 '/>
          </label>
      </div>
    </div>
  )
}

export default Gendercheckbox