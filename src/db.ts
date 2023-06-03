import { join } from 'path'
import Lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync'
import { Patient } from './schemas/Patient';
import { Manager } from './schemas/Manager';

type DB = {
    managers: Manager[];
    patients: Patient[];
}

const defaultData: DB = { managers: [
    {
        name: "Hashemi Rafsan",
        email: "rafsan@gmail.com",
        password: "$2a$10$fOnZj6vFuW0LTKDGQiOcmeAWJIU5BzAjZOg8BRXwVpsg44LKFmfai"
    }
], patients: [] };
const file = join(__dirname + './../storage', 'data.json');
const adapter = new FileSync<DB>(file);
const db = Lowdb(adapter);

db.defaults(defaultData).write();

export default db;
