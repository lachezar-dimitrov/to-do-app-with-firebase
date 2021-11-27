import { UserRole } from '../common/enums/user-role';
import * as bcrypt from 'bcrypt';

export class UsersData {
    async users() {
        return [
            {
                id: 1,
                username: 'AdminAdmin',
                firstName: 'Admin',
                lastName: 'Admin',
                email: 'admin.admin@nest.ts',
                password: await bcrypt.hash('Admin', 10),
                role: UserRole.Admin,
                isDeleted: false,
                banEndDate: new Date(),
                points: 0,
            },
            {
                id: 2,
                username: 'JohnDoe',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@nest.js',
                password: await bcrypt.hash('root', 10),
                role: UserRole.Basic,
                isDeleted: false,
                points: 0,
            },
            {
                id: 3,
                username: 'PetraPetrog',
                firstName: 'Petra',
                lastName: 'Petrog',
                email: 'petar.petrov@nest.ts',
                password: await bcrypt.hash('root', 10),
                role: UserRole.Basic,
                isDeleted: false,
                points: 0,
            },
            {
                id: 4,
                username: 'GeorgiaGeorgian',
                firstName: 'Georgia',
                lastName: 'Georgian',
                email: 'georgi.georgiev@nest.js',
                password: await bcrypt.hash('root', 10),
                role: UserRole.Basic,
                isDeleted: false,
                points: 0,
            },
        ];
    }
}
