import {UserType} from "@/types/userType";
import {UsersState} from "@/types/Vuex/States";
import {users} from "@/store/modules/users";

const {setUsers, removeUser} = users.mutations

describe("mutations", () => {
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

    it("setUsers", () => {
        const state: UsersState = {users: []}

        setUsers(state, dummyUsers)

        expect(state.users).toHaveLength(2)
        expect(state.users).toMatchObject(dummyUsers)
    })

    it("removeUser", ()=> {
        const state: UsersState = {users: dummyUsers}

        removeUser(state, dummyUsers[1].email)

        expect(state.users).toHaveLength(1)
        expect(state.users).not.toContain(dummyUsers[1])
        expect(state.users).toMatchObject([dummyUsers[0]])

    })
})
