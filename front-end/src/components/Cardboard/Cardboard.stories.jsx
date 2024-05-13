import { Cardboard } from '.'
 
export default {
    title:'Cardboard',
    component: Cardboard,
    args:{
        children:'Cardboard'
    },
    argsTypes:{
        children:{type:'string'}
    }

}

export const Template = (args)=>{
    return (<div>
                <Cardboard {...args}/>
            </div>)
}