interface todoItem{
    id: number;
    title:string;
    item: {taskId:number;task:string;completed: boolean;}[],
}

interface todoProps{
    toDo:todoItem[]
}
export type {todoItem,todoProps};