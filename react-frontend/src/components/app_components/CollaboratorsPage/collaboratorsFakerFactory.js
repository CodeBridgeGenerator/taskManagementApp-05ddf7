
import { faker } from "@faker-js/faker";
export default (user,count,taskIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
user: faker.lorem.sentence(""),
task: taskIds[i % taskIds.length],
status: faker.datatype.boolean(),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
