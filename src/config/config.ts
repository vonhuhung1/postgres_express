import "reflect-metadata"
import { DataSource } from "typeorm"
import { organization } from "../models/organization.model"
import { department } from "../models/department.model"
import { warehouse } from "../models/warehouse.model"
import { shelf } from "../models/shelf.model"
import { drawer } from "../models/drawer.model"
import { staff } from "../models/staff.model"
import { profile } from "../models/profile.model"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "hungpro10a3",
    database: "training",
    synchronize: true,
    logging: true,
    entities: [organization,department,warehouse,shelf,drawer,staff,profile],
    subscribers: [],
    migrations: [],
})


export default AppDataSource