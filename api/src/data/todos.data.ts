import { TodoStatus } from '../common/enums/todo-status';

export class TodosData {
    async todos() {
        return [
            {
                id: 1,
                addedOn: '2020-07-22 21:22:42.030000',
                title: 'Shantaram',
                description:
                    'Shantaram is a 2003 novel by Gregory David Roberts.',
                imageUrl:
                    'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/todos/1333482282l/33600.jpg',
                // status: TodoStatus.Free,
                isDone: false,
                isDeleted: false,
            },
            {
                id: 2,
                addedOn: '2020-07-22 21:24:48.104000',
                title: 'Learn React',
                description:
                    'The Goldfinch is a novel by the American author Donna Tartt.',
                imageUrl:
                    'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/todos/1378710146l/17333223.jpg',
                // status: TodoStatus.Free,
                isDone: true,
                isDeleted: false,
            },
            {
                id: 3,
                addedOn: '2020-07-22 21:28:18.221000',
                title: 'Sense and Sensibility',
                description: 'Marianne Dashwood wears her heart on her sleeve.',
                imageUrl:
                    'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/todos/1397245675l/14935._SY475_.jpg',
                // status: TodoStatus.Borrowed,
                isDone: false,
                isDeleted: false,
            },
            {
                id: 4,
                addedOn: '2020-07-24 10:20:40.787637',
                title: 'Clean',
                description: "Acclaimed by many as the world's greatest novel",
                imageUrl:
                    'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/todos/1546091617l/15823480._SX318_.jpg',
                // status: TodoStatus.Unlisted,
                isDone: true,
                isDeleted: false,
            },
        ];
    }
}
