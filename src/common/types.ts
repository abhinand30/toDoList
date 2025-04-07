interface todoItem{
    id: number;
    title:string;
    item: {taskId:number;task:string;completed: boolean;}[],
}

interface todoProps{
    todoArray:todoItem[]
}


interface taskItem{
    taskId:number;
    title:string;
    completed:boolean
}
interface searchProps{
    setSearchText:(value:string)=>void;
    searchText:string;
}
export type {todoItem,todoProps,taskItem,searchProps};