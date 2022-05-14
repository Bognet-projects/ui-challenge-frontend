import {users} from "@/store/modules/users";
import {UsersState} from "@/types/Vuex/States";
import {UserType} from "@/types/userType";

const {getAllUsersExceptMe} = users.getters

describe("getters", () => {
    const dummyUsers: UserType[] = [
        {
            id: 0,
            username: 'usernameString0',
            email: 'test0@email.com',
            image: 'imgString0',
            bio: 'bioString0'
        },
        {
            id: 1,
            username: 'usernameString1',
            email: 'test1@email.com',
            image: 'imgString1',
            bio: 'bioString1'
        }
    ]

    it('getAllUsersExceptMe', () => {
        const usersState: UsersState = {users: dummyUsers}
        const getId = jest.fn(() => 0)

        const result = getAllUsersExceptMe(usersState, {getUserId: getId()})

        expect(getId).toBeCalledTimes(1)
        expect(result).toHaveLength(1)
        expect(result).toMatchObject([dummyUsers[1]])

        getId.mockClear()
    })
})
