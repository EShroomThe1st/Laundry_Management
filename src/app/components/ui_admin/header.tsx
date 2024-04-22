import Icon from '../../../assets/Icon.png'
import { PrimaryButton } from '../button/buttons'

export default function AdminHeader(){
  return(
    <div className='flex justify-between p-5 border-b-slate-400 border-[1px] items-center'>
      <img src={Icon} className='w-10 object-contain'/>
      <PrimaryButton>
        Log Out
      </PrimaryButton>
    </div>
  )
}