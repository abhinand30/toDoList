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
interface taskState{
    item:taskItem[]
}
interface searchProps{
    setSearchText:(value: string) => void;
    searchText:string;
}

interface modalProps{
    modal:boolean;
    setModal:(modal: boolean) => void;
    todo:todoItem|null;
    handleTask:(taskId: number) => void;
    onDeleteTask:(taskId: number) => void;
}

interface todoState{
    id:string;
    date:{nanoseconds:number;seconds: number};
    title:string;
    description:string;
    status:string
}
export type {todoItem,todoProps,taskItem,searchProps,taskState,modalProps,todoState};