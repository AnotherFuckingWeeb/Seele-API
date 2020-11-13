export interface ITask {
    id: number;
    taskboard_id: number;
    title: string;
    description: string;
    status: string;
    done: boolean;
}