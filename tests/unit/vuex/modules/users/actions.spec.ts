import {UserType} from "@/types/userType";
import {users} from "@/store/modules/users";
import {testActionWithMutations} from "../../../../Helpers";
import clearAllMocks = jest.clearAllMocks;
import {rootGetters} from "@/types/Vuex/Getters";

const {loadUsers, deleteUser} = users.actions

describe('actions', () => {
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
    let getTokenMock: () => string
    let rootGetters: rootGetters

    beforeEach(() => {
        getTokenMock = jest.fn(() => "token")
        rootGetters = {getToken: getTokenMock()}
    })

    afterEach(() => {
        clearAllMocks()
    })

    it("loadUsers successful call", (done) => {
        global.fetch = jest.fn().mockImplementationOnce(() => {
            return Promise.resolve({
                status: 200,
                json: () => dummyUsers
            })
        })

        testActionWithMutations(loadUsers, null, rootGetters, [{type: "setUsers", payload: dummyUsers}], done)

        expect(getTokenMock).toBeCalledTimes(1)
    })

    it("loadUsers unauthorized call", (done) => {
        global.fetch = jest.fn().mockImplementationOnce(() => {
            return Promise.resolve({
                status: 401,
                json: () => ({
                    statusCode: 401,
                    message: "Not authorized."
                })
            })
        })

        testActionWithMutations(loadUsers, null, rootGetters, [], done)

        expect(getTokenMock).toBeCalledTimes(1)
    })

    it("deleteUser successful call", (done) => {
        global.fetch = jest.fn().mockImplementationOnce(() => {
            return Promise.resolve({
                status: 200,
                json: () => ({
                    raw: []
                })
            })
        })

        const response = testActionWithMutations<string, Promise<string>>(deleteUser, 'test0@email.com', rootGetters, [{
            type: "removeUser",
            payload: 'test0@email.com'
        }], done)

            expect(getTokenMock).toBeCalledTimes(1)
        response.then(text => {
            expect(text).toBe("The user has been successfully deleted.")
        })
    })

    it("deleteUser self delete call", (done) => {
        global.fetch = jest.fn().mockImplementationOnce(() => {
            return Promise.resolve({
                status: 400,
                json: () => ({
                    statusCode: 400,
                    message: "The user can't delete itself"
                })
            })
        })

        const response = testActionWithMutations<string, Promise<string>>(deleteUser, 'test0@email.com', rootGetters, [], done)

        expect(getTokenMock).toBeCalledTimes(1)
        response.then(text => {
            expect(text).toBe("The user can't delete itself")
        })
    })

    it("deleteUser unauthorized call", (done) => {
        global.fetch = jest.fn().mockImplementationOnce(() => {
            return Promise.resolve({
                status: 401,
                json: () => ({
                    statusCode: 401,
                    message: "Not authorized."
                })
            })
        })

        const response = testActionWithMutations<string, Promise<string>>(deleteUser, 'test1@email.com', rootGetters, [], done)

        expect(getTokenMock).toBeCalledTimes(1)
        response.then(text => {
            expect(text).toBe("Not authorized.")
        })
    })
})
